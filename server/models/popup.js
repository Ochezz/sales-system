import { safeParm, excute } from "~mariadb";

export class Popup {
  
  async getList(title = "") {
    const query = 
    `SELECT ROWNUM() as no, id, created_date, start_date, end_date, title, CASE WHEN type = 'I' THEN '이미지팝업' ELSE '유튜브팝업' END as 'type', CASE WHEN is_active = 1 THEN 'Y' ELSE 'N' END as 'isActive'
      FROM sales_popup
      WHERE service = 1 and title LIKE ${safeParm(`%${title}%`)}`

    return await excute(query);
  }

  async getItem(id) {
    const query = 
    `SELECT id, title, type, content, disp_size as 'dispSize', href_url as 'hrefURL', is_newpage as 'isNewpage',  position, priority,  start_date as 'startDate', end_date as 'endDate', is_active as 'isActive'
      FROM sales_popup
      WHERE service = 1 AND id = ${safeParm(id)}`

    return await excute(query);
  }

  async insertItem(caller, item) {
    const query = 
    `INSERT INTO sales_popup (title, type, content, disp_size, href_url, position, priority, start_date, end_date, is_newpage, is_active, created_by, updated_by)
      VALUES (${safeParm(item.title)}, ${safeParm(item.type)}, ${safeParm(item.content)}, ${safeParm(item.dispSize)}, ${safeParm(item.hrefUrl)}, ${safeParm(item.position)}, ${safeParm(item.priority)}, ${safeParm(item.startDate)}, ${safeParm(item.endDate)}, ${safeParm(item.isNewpage)}, ${safeParm(item.isActive)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`
    return await excute(query);
  }

  async updateItem(caller, item) {
    const query = 
    `UPDATE sales_popup hp
      SET hp.title = ${safeParm(item.title)},
          hp.type = ${safeParm(item.type)},
          hp.content = ${safeParm(item.content)},
          hp.disp_size = ${safeParm(item.dispSize)},
          hp.href_url = ${safeParm(item.hrefUrl)},
          hp.position = ${safeParm(item.position)},
          hp.priority = ${safeParm(item.priority)},
          hp.start_date = ${safeParm(item.startDate)},
          hp.end_date = ${safeParm(item.endDate)},
          hp.is_newpage = ${safeParm(item.isNewpage)},
          hp.is_active = ${safeParm(item.isActive)},
          hp.updated_by = ${safeParm(caller._id)},
          hp.updated_date = CURRENT_TIMESTAMP()
      WHERE hp.id = ${safeParm(item.id)}
    `
    return await excute(query);
  }

  async deleteItem(caller, item) {
    const query = 
    `UPDATE sales_popup hp
      SET hp.service = 0,
          hp.updated_by  = ${safeParm(caller._id)},
          hp.updated_date = CURRENT_TIMESTAMP()
      WHERE hp.id = ${safeParm(item.id)}
    `
    return await excute(query);
  }
}