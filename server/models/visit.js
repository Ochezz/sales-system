import { safeParm, excute } from "~mariadb";
import logger from "~logger";

export class Visit {
  
  async getList(condition = {}) {
    let filter = "hvr.service = 1 AND hvrs.service = 1"

    if (condition.userName) {
      filter += ` AND user_name like ${safeParm(`%${condition.userName}%`)}`;
    }
    if (condition.userPhone) {
      filter += ` AND user_phone like ${safeParm(`%${condition.userPhone}%`)}`;
    }
    if (condition.startDate) {
      filter += ` AND visit_day >= ${safeParm(condition.startDate)}`;
    }
    if (condition.endDate) {
      filter += ` AND visit_day <= ${safeParm(condition.endDate)}`;
    }
    if (condition.visitTime) {
      filter += ` AND visit_time = ${safeParm(condition.visitTime)}`;
    }
    
    const query = 
    `SELECT ROWNUM() as no, hvr.id, hvrs.visit_day as 'visitDay', hvrs.visit_time as 'visitTime', hvr.user_name as 'name', hvr.user_phone as 'phone', hvr.visit_num as 'visitNum', hvr.created_date as 'createdDate' 
      FROM sales_visit_reservations hvr JOIN sales_visit_reservations_setting hvrs 
      ON  hvr.visit_date_key = hvrs.id 
      WHERE ${filter}`

    logger.debug(query)
    
    return await excute(query);
  }

  async getItem(id) {
    const query = 
    `SELECT ROWNUM() as no, hvr.id, hvrs.visit_day as 'visitDay', hvrs.visit_time as 'visitTime', hvr.user_name as 'name', hvr.user_phone as 'phone', hvr.visit_num as 'visitNum', hvr.memo, hvr.created_date as 'createdDate' 
      FROM sales_visit_reservations hvr JOIN sales_visit_reservations_setting hvrs 
      ON  hvr.visit_date_key = hvrs.id
      WHERE hvr.service = 1 AND hvrs.service = 1 AND hvr.id = ${safeParm(id)}`
      
    return await excute(query);
  }

  async insertItem(caller, settingID, item) {
    const query = 
    `INSERT INTO sales_visit_reservations (user_name, user_phone, memo, visit_date_key, created_by, updated_by)
      VALUES (${safeParm(item.userName)}, ${safeParm(item.userPhone)}, ${safeParm(item.memo)}, ${safeParm(settingID)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`

    return await excute(query);
  }

  async updateItem(caller, item) {
    const query = 
    `UPDATE sales_visit_reservations
      SET user_name = ${safeParm(item.userName)},
          user_phone = ${safeParm(item.userPhone)},
          memo = ${safeParm(item.memo)},
          updated_by = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`

    return await excute(query);
  }

  async deleteItem(caller, item) {
    const query = 
    `UPDATE sales_visit_reservations
      SET service = 0,
          updated_by  = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`
      
    return await excute(query);
  }
}