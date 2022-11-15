import { safeParm, excute } from "~mariadb";
import logger from "~logger";

export class Contractor {
  
  async getList(name = "", phone = "") {
    const query = 
    `SELECT ROWNUM() as no, id, user_name as 'name', user_phone as 'phone', birthday, contracts_type as 'type', room_num as 'room', memo, reservation_datetime as 'resvDate'
      FROM sales_contracts
      WHERE service = 1 AND user_name LIKE ${safeParm(`%${name}%`)} AND user_phone LIKE ${safeParm(`%${phone}%`)}`

    return await excute(query);
  }

  async getItem(id) {
    const query = 
    `SELECT id, user_name as 'name', user_phone as 'phone', birthday, memo
      FROM sales_contracts
      WHERE service = 1 AND id = ${safeParm(id)}`

    return await excute(query);
  }

  async insertItem(caller, items=[]) {
    let values = ""
    for(const element of items){
      if(!(await this.isRegistedItem(element))){
        if(values.length){
          values += ', '
        }
        values += `(${safeParm(element.name)}, ${safeParm(element.phone)}, ${safeParm(element.birthday)}, ${safeParm(element.type)}, ${safeParm(element.room)}, ${safeParm(element.resvDate)}, ${safeParm(element.memo)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`;
      }
    }
    
    if(!values.length){
      return;
    }
    
    const query = 
    `INSERT INTO sales_contracts (user_name, user_phone, birthday, contracts_type, room_num, reservation_datetime, memo, created_by, updated_by)
      VALUES ${values}`

    return await excute(query);
  }

  async updateItem(caller, item) {
    const query = 
    `UPDATE sales_contracts
      SET user_name  = ${safeParm(item.userName)},
          user_phone = ${safeParm(item.userPhone)},
          birthday = ${safeParm(item.birthday)},
          memo = ${safeParm(item.memo)},
          updated_by  = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`

    return await excute(query);
  }

  async deleteItem(caller, item) {
    const query = 
    `UPDATE sales_contracts
      SET service = 0,
          updated_by  = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`
      
    return await excute(query);
  }

  async isRegistedItem(item) {
    // 수정 : 중복체크 이름 + 전화번호 -> 전화번호
    // const query = 
    // `SELECT COUNT(*) as count FROM sales_contracts WHERE service = 1 AND user_name = '${item.name}' AND user_phone = '${item.phone}'`
    const query = 
    `SELECT COUNT(*) as count FROM sales_contracts WHERE service = 1 AND user_phone = ${safeParm(item.phone)}`

    return (await excute(query))[0].count == 1;
  }
}