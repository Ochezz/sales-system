import { safeParm, excute } from "~mariadb";

export class Member {

  async updateItem(caller, item) {
    const query = 
    `UPDATE sales_interested_customers hic
      SET hic.user_name = ${safeParm(item.userName)},
      	  hic.user_phone = ${safeParm(item.userPhone)},
      	  hic.age_group = ${safeParm(item.ageGroup)},
      	  hic.zip_code = ${safeParm(item.zipCd)},
      	  hic.address1 = ${safeParm(item.address1)},
      	  hic.address2 = ${safeParm(item.address2)},
      	  hic.mail = ${safeParm(item.email)},
      	  hic.use_marketting = ${safeParm(item.useMarketting)},
          hic.updated_by  = ${safeParm(caller._id)},
          hic.updated_date = CURRENT_TIMESTAMP()
      WHERE hic.id = ${safeParm(item.id)}
    `
    return await excute(query);
  }

  async deleteItem(caller, item) {
    const query = 
    `UPDATE sales_interested_customers hic
      SET hic.service = 0,
          hic.updated_by  = ${safeParm(caller._id)},
          hic.updated_date = CURRENT_TIMESTAMP()
      WHERE hic.id = ${safeParm(item.id)}
    `
    return await excute(query);
  }

  async getTodaysRegistCnt() {
    const query =
      `SELECT 
        count(*) as 'total',
        SUM( CASE WHEN TIMESTAMPDIFF(DAY,hic.created_day,CURDATE()) = 0 THEN 1 ELSE 0 end) as 'today'
      FROM sales_interested_customers hic
      WHERE
        hic.service = 1`

    return await excute(query);
  }

  async getCityOfMember() {
    const query =
      `SELECT
        count(*) as 'count', 
        hic.address1   
      FROM sales_interested_customers hic 
      WHERE hic.service = 1 
      GROUP BY hic.address1 `

    return await excute(query);
  }

  async getAgeOfMember() {
    const query =
      `SELECT 
        count(*) as 'count', 
        hic.age_group 
      FROM sales_interested_customers hic
      WHERE hic.service = 1 
      GROUP BY
        hic.age_group`

    return await excute(query);
  }

  async getActiveMember(fields = {}, searchName = "", searchPhone = "") {
    let customers = { infos: {search_name: fields.useName == 1, search_phone: fields.usePhone == 1}, data:[]}
    let filter = "service = 1"

    if (fields.useName == 1) {
      filter += ` AND user_name like ${safeParm(`%${searchName}%`)}`;
    }
    if (fields.usePhone == 1) {
      filter += ` AND user_phone like ${safeParm(`%${searchPhone}%`)}`;
    }

    const query =
      `SELECT 
        ROWNUM() as no, id,
        CASE WHEN registration_device = 'm' THEN 'Moblie' WHEN registration_device = 'p' THEN 'PC' ELSE 'Tablet' END as 'device',
        created_day as 'registedDate',
        user_name as 'name',
        user_phone as 'phone',
        mail as 'email',
        age_group as 'ageGroup',
        zip_code as 'zipCode',
        address1 as 'address1',
        address2 as 'address2',
        CASE WHEN use_marketting = 1 THEN 'Y' ELSE 'N' END as 'useMarketting'
      FROM sales_interested_customers
      WHERE ${filter}`

    customers.data = await excute(query);
    return customers
  }
}