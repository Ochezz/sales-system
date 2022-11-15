import { safeParm, excute } from "~mariadb";
import logger from "~logger";

export class PaymentVisit {
  
  async getList(condition = {}) {
    let filter = "hvp.service = 1 AND hvps.service = 1"

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
    `SELECT 
        ROWNUM() as no, 
        hvp.id, 
        hvps.visit_day as 'visitDay', 
        hvps.visit_time as 'visitTime', 
        hvp.user_name as 'name', 
        hvp.user_phone as 'phone', 
        hvp.room_num as 'room', 
        CASE WHEN hvp.registration_device = 'm' THEN 'Moblie' WHEN registration_device = 'p' THEN 'PC' ELSE 'Tablet' END as 'device',
        hvp.created_date as 'createdDate' 
      FROM sales_visit_payments hvp JOIN sales_visit_payments_setting hvps 
      ON  hvp.visit_date_key = hvps.id 
      WHERE ${filter}`
    
    return await excute(query);
  }

  async getItem(id) {
    const query = 
    `SELECT 
        ROWNUM() as no, 
        hvp.id, 
        hvps.visit_day as 'visitDay', 
        hvps.visit_time as 'visitTime', 
        hvp.user_name as 'name', 
        hvp.user_phone as 'phone', 
        hvp.room_num as 'room', 
        CASE WHEN hvp.registration_device = 'm' THEN 'Moblie' WHEN registration_device = 'p' THEN 'PC' ELSE 'Tablet' END as 'device',
        hvp.memo,
        hvp.created_date as 'createdDate' 
      FROM sales_visit_payments hvp JOIN sales_visit_payments_setting hvps 
      ON  hvp.visit_date_key = hvps.id
      WHERE hvp.service = 1 AND hvps.service = 1 AND hvp.id = ${safeParm(id)}`

    return await excute(query);
  }

  async insertItem(caller, settingID, item) {
    const query = 
    `INSERT INTO sales_visit_payments (user_name, user_phone, memo, visit_date_key, created_by, updated_by)
      VALUES (${safeParm(item.userName)}, ${safeParm(item.userPhone)}, ${safeParm(item.memo)}, ${safeParm(settingID)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`

    return await excute(query);
  }

  async updateItem(caller, item) {
    const query = 
    `UPDATE sales_visit_payments
      SET user_name  = ${safeParm(item.userName)},
          user_phone = ${safeParm(item.userPhone)},
          memo = ${safeParm(item.memo)},
          updated_by  = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`

    return await excute(query);
  }

  async deleteItem(caller, item) {
    const query = 
    `UPDATE sales_visit_payments
      SET service = 0,
          updated_by  = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`
      
    return await excute(query);
  }
}