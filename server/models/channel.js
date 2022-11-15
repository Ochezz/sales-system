import { safeParm, excute } from "~mariadb";

export class Channel {

  async getAllChannel() {
    const query =
      `SELECT 
        id,
        channel_name_url as channel,
        channel_name as dpName,
        description
      FROM sales_channel hc
      WHERE
        hc.service = 1`
    return await excute(query);
  }

  async checkDuplicate(channelNameUrl) {
    const query = 
    `SELECT 
      count(*) 
    FROM sales_channel hc 
    WHERE channel_name_url  = ${safeParm(channelNameUrl)}`
    return await excute(query);
  }

  async insertItem(caller, item) {
    
    if (await this.checkDuplicate(item.channelNameUrl) > 0){
      return '중복 발생'
    }
  
    const query = 
    `INSERT INTO sales_channel (channel_name, channel_name_url, description, created_by, updated_by)
      VALUES (${safeParm(item.channelName)}, ${safeParm(item.channelNameUrl)}, ${safeParm(item.description)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})
    `
    return await excute(query);
  }

  async updateItem(caller, item) {
    const query = 
    `UPDATE sales_channel hc
      SET hc.channel_name = ${safeParm(item.channelName)},
          hc.channel_name_url = ${safeParm(item.channelNameUrl)},
          hc.description = ${safeParm(item.description)},
          hc.updated_by  = ${safeParm(caller._id)},
          hc.updated_date = CURRENT_TIMESTAMP()
      WHERE hc.id = ${safeParm(item.id)}
    `
    return await excute(query);
  }

  async deleteItem(caller, item) {
    const query = 
    `UPDATE sales_channel hc
      SET hc.service = 0,
          hc.updated_by  = ${safeParm(caller._id)},
          hc.updated_date = CURRENT_TIMESTAMP()
      WHERE hc.id = ${safeParm(item.id)}
    `
    return await excute(query);
  }
}