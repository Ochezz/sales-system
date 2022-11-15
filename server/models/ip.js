import { safeParm, excute } from "~mariadb";
import logger from "~logger";
import { PROFILE_ADMIN, PROFILE_SITE } from "~const";

export class Ip {
  async getItems(id) {   
    const query = `SELECT ip FROM sales_accessed_ips WHERE service = 1 AND user_id = ${safeParm(id)}`;
    let result = await excute(query);
    result = result.map(item => item.ip);
    
    return result;
  }

  async insertItem(caller, id, address) {
    const query = `INSERT INTO sales_accessed_ips (user_id, ip, created_by, updated_by)
        VALUES (${safeParm(id)}, ${safeParm(address)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`;

    return await excute(query);
  }

  async insertItems(caller, id, addressList=[]) {
    let values = ""
    addressList.filter((address, index) => {
      if(index){
        values += ', '
      }
      values += `(${safeParm(id)}, ${safeParm(address)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`;
    });
    
    if(values == "") return;

    const query = `INSERT INTO sales_accessed_ips (user_id, ip, created_by, updated_by)
        VALUES ${values}`;

    return await excute(query);
  }

  async updateItems(caller, id, addressList=[]) {
    const query = `DELETE FROM sales_accessed_ips WHERE user_id = ${safeParm(id)}`;
    await excute(query);

    return await this.insertItems(caller, id, addressList);
  }

  async checkBlocking(id, address) {
    const query = `
    SELECT hai.id, hai.block_count, 
      CASE WHEN hu.profile = 0 THEN '${PROFILE_ADMIN}' ELSE '${PROFILE_SITE}' END as profile,
      CASE WHEN hai.block_date >= DATE_ADD(NOW(), INTERVAL -30 MINUTE) THEN True ELSE False END as timeLock
    FROM sales_accessed_ips hai RIGHT JOIN sales_user hu  ON hu.id = hai.user_id 
    WHERE CASE 
            WHEN hu.profile = 0 
              THEN hu.service = 1 AND hu.id = ${safeParm(id)}
              ELSE hu.service = 1 AND hu.id = ${safeParm(id)} AND hai.ip = ${safeParm(address)}
            END`;
    
    const result = await excute(query)
    
    if(result[0]?.profile == PROFILE_ADMIN) return false;
    else return result.length == 0 || result[0]?.block_count>=3 && result[0]?.timeLock;
  }

  async count(id, address) {
    const query = `UPDATE sales_accessed_ips hai
        SET hai.block_count = hai.block_count + 1,
            hai.block_date = CURRENT_TIMESTAMP(),
            hai.updated_by  = 'system',
            hai.updated_date = CURRENT_TIMESTAMP()
        WHERE hai.user_id = ${safeParm(id)} AND hai.ip = ${safeParm(address)}`;

    return await excute(query);
  }

  async reset(id, address) {
    const query = `UPDATE sales_accessed_ips hai
        SET hai.block_count = 0,
            hai.updated_by  = 'system',
            hai.updated_date = CURRENT_TIMESTAMP()
        WHERE hai.user_id = ${safeParm(id)} AND hai.ip = ${safeParm(address)}`;

    return await excute(query);
  }
}
