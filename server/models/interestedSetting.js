import { safeParm, excute } from "~mariadb";

export class InterestedSetting {

  async getItem() {
    const query =
      `SELECT 
          personal_information_text as infomationText,
          use_name as useName,
          use_phone as usePhone,
          use_age_group as useAgeGroup,
          use_email as useEmail,
          use_address as useAddress,
          CASE
            WHEN use_marketting = 1 THEN 'Y' ELSE 'N'
          END as useMarketting
      FROM sales_interested_customers_setting
      ORDER BY id DESC LIMIT 1`
    return await excute(query);
  }

  async insertItem(caller, item) {
    const query = 
    `INSERT INTO sales_interested_customers_setting (personal_information_text, use_name, use_phone, use_age_group, use_email, use_address, use_marketting, created_by, updated_by)
      VALUES (${safeParm(item.infomation)}, ${safeParm(item.name)}, ${safeParm(item.phone)}, ${safeParm(item.ageGroup)}, ${safeParm(item.email)}, ${safeParm(item.address)}, ${safeParm(item.marketting)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`
    return await excute(query);
  }
}