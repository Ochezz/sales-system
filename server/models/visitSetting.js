import { safeParm, excute } from "~mariadb";
import logger from "~logger";

export class VisitSetting {
  
  async getId(visitDay, visitTime) {
    const query = 
    `SELECT id 
      FROM sales_visit_reservations_setting 
      WHERE visit_day = ${safeParm(visitDay)} AND visit_time = ${safeParm(visitTime)}`

    return await excute(query);
  }

  async getList(condition = {}) {
    let filter = ""
    
    if (condition.startDate) {
      filter += ` AND visit_day >= ${safeParm(condition.startDate)}`;
    }
    if (condition.endDate) {
      filter += ` AND visit_day <= ${safeParm(condition.endDate)}`;
    }

    const query = 
    `SELECT hvrs.visit_day as 'visitDay', hvrs.visit_time as 'visitTime', hvrs.maximum_num as 'maximunNum', COALESCE(COUNT(hvr.visit_num),0) as 'visitCnt'
      FROM sales_visit_reservations_setting hvrs LEFT OUTER JOIN ( SELECT * FROM sales_visit_reservations WHERE service = 1) hvr
        ON hvr.visit_date_key = hvrs.id 
      WHERE hvrs.service = 1 ${filter}
      GROUP BY hvrs.visit_day, hvrs.visit_time`

    return await excute(query);
  }

  async getItem(date) {
    const query = 
    `SELECT hvrs.visit_day as 'visitDay', hvrs.visit_time as 'visitTime', hvrs.maximum_num as 'maximunNum', COALESCE(COUNT(hvr.visit_num),0) as 'visitCnt'
      FROM sales_visit_reservations_setting hvrs LEFT OUTER JOIN ( SELECT * FROM sales_visit_reservations WHERE service = 1) hvr
        ON hvr.visit_date_key = hvrs.id 
      WHERE hvrs.service = 1 AND hvrs.visit_day = ${safeParm(date)}
      GROUP BY hvrs.visit_day, hvrs.visit_time`

    return await excute(query);
  }
  
  async insertItem(caller, items) {
    let values = ""
    items.filter((element, index) => {
      if(index){
        values += ', '
      }
      values += `(${safeParm(element.visitDay)}, ${safeParm(element.visitTime)}, ${safeParm(element.maximumNum)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`;
    });
    
    const query = 
    `INSERT INTO sales_visit_reservations_setting (visit_day, visit_time, maximum_num, created_by, updated_by)
      VALUES ${values}`

    return await excute(query);
  }

  async updateItem(caller, datas) {
    let ids = ""
    let values = "CASE visit_time"
    datas.items.filter((element, index) => {
      if(index){
        ids += ', ';
      }
      ids += `${safeParm(element.id)}`;
      values += ` WHEN ${safeParm(element.id)} THEN ${safeParm(element.maximumNum)} `;
    });
    values += " END, "


    const query = 
    ` UPDATE sales_visit_reservations_setting
      SET maximum_num = ${values}
        updated_by = ${safeParm(caller._id)},
        updated_date = CURRENT_TIMESTAMP()
      WHERE visit_day = ${safeParm(datas.visitDay)} AND visit_time IN (${ids})`

    return await excute(query);
  }

  async deleteItem(caller, datas) {
    let ids = ""
    datas.items.filter((element, index) => {
      if(index){
        ids += ', ';
      }
      ids += `${safeParm(element.id)}`;
    });
    
    const query = 
    `UPDATE sales_visit_reservations_setting
      SET service = 0,
          updated_by  = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE visit_day = ${safeParm(datas.visitDay)} AND visit_time IN (${ids})`
      
    return await excute(query);
  }
}