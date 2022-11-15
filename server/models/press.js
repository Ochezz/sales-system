import { safeParm, excute } from "~mariadb";
import logger from '~logger';
export class Press {
  
  async getList(title = "") {
    const query = 
    `SELECT ROWNUM() as no, id, title, thumnail_url as 'thumnail', media_name as 'media', start_day as 'release_date', source_url, detail, CASE WHEN is_active = 1 THEN 'Y' ELSE 'N' END as 'is_active', created_date, created_by, updated_date
      FROM sales_press_releae
      WHERE service = 1 and title LIKE ${safeParm(`%${title}%`)}`

    return await excute(query);
  }

  async insertItem(caller, item) {
    const query = 
    `INSERT INTO sales_press_releae (title, thumnail_url, media_name, start_day, source_url, detail, is_active, created_by, updated_by)
      VALUES (${safeParm(item.title)}, ${safeParm(item.thumnailUrl)}, ${safeParm(item.media)}, ${safeParm(item.releaseDate)}, ${safeParm(item.sourceUrl)}, ${safeParm(item.detail)}, ${safeParm(item.isActive)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`

    return await excute(query);
  }

  async updateItem(caller, item) {
    const query = 
    `UPDATE sales_press_releae hpr
      SET hpr.title = ${safeParm(item.title)},
      	  hpr.thumnail_url = ${safeParm(item.thumnailUrl)},
      	  hpr.media_name = ${safeParm(item.media)},
      	  hpr.start_day = ${safeParm(item.releaseDate)},
      	  hpr.source_url = ${safeParm(item.sourceUrl)},
      	  hpr.detail = ${safeParm(item.detail)},
      	  hpr.is_active = ${safeParm(item.isActive)},
          hpr.updated_by = ${safeParm(caller._id)},
          hpr.updated_date = CURRENT_TIMESTAMP()
      WHERE hpr.id = ${safeParm(item.id)}`

    return await excute(query);
  }

  async deleteItem(caller, item) {
    const query = 
    `UPDATE sales_press_releae hpr
      SET hpr.service = 0,
          hpr.updated_by  = ${safeParm(caller._id)},
          hpr.updated_date = CURRENT_TIMESTAMP()
      WHERE hpr.id = ${safeParm(item.id)}`
      
    return await excute(query);
  }
}