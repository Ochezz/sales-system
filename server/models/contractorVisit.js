import { safeParm, excute } from "~mariadb";
import logger from "~logger";

export class ContractorVisit {
  
  async getList(condition = {}) {
    let filter = "hvc.service = 1 AND hvcs.service = 1"

    if (condition.userName) {
      filter += ` AND user_name like ${safeParm(`%${condition.userName}%`)}`;
    }
    if (condition.userPhone) {
      filter += ` AND user_phone like ${safeParm(`%${condition.userPhone}%`)}`;
    }
    if (condition.startDate) {
      filter += ` AND visit_day >= ${safeParm(`%${condition.startDate}%`)}`;
    }
    if (condition.endDate) {
      filter += ` AND visit_day <= ${safeParm(condition.endDate)}`;
    }
    if (condition.visitTime) {
      filter += ` AND visit_time = ${safeParm(condition.visitTime)}`;
    }
    
    const query = 
    `SELECT ROWNUM() as no, hvc.id, hvcs.visit_day as 'visitDay', hvcs.visit_time as 'visitTime', hvc.user_name as 'name', hvc.user_phone as 'phone', hvc.visit_num as 'visitNum', hvc.created_date as 'createdDate' 
      FROM sales_visit_contracts hvc JOIN sales_visit_contracts_setting hvcs 
      ON  hvc.visit_date_key = hvcs.id 
      WHERE ${filter}`

    logger.debug(query)
    
    return await excute(query);
  }

  async getItem(id) {
    const query = 
    `SELECT ROWNUM() as no, hvc.id, hvcs.visit_day as 'visitDay', hvcs.visit_time as 'visitTime', hvc.user_name as 'name', hvc.user_phone as 'phone', hvc.visit_num as 'visitNum', hvc.memo, hvc.created_date as 'createdDate' 
      FROM sales_visit_contracts hvc JOIN sales_visit_contracts_setting hvcs 
      ON  hvc.visit_date_key = hvcs.id
      WHERE hvc.service = 1 AND hvcs.service = 1 AND hvc.id = ${safeParm(id)}`

    return await excute(query);
  }

  async insertItem(caller, settingID, item) {
    const query = 
    `INSERT INTO sales_visit_contracts (user_name, user_phone, memo, visit_date_key, created_by, updated_by)
      VALUES (${safeParm(item.userName)}, ${safeParm(item.userPhone)}, ${safeParm(item.memo)}, ${safeParm(settingID)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`

    return await excute(query);
  }

  async updateItem(caller, item) {
    const query = 
    `UPDATE sales_visit_contracts
      SET user_name  = ${safeParm(item.userName)},
          user_phone = ${safeParm(item.userPhone)},
          visit_num = ${safeParm(item.visitNum)},
          memo = ${safeParm(item.memo)},
          updated_by  = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`

    return await excute(query);
  }

  async deleteItem(caller, item) {
    const query = 
    `UPDATE sales_visit_contracts
      SET service = 0,
          updated_by  = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`
      
    return await excute(query);
  }
}