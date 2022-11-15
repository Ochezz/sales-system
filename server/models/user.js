import { safeParm, excute } from "~mariadb";
import { getAccessToken, getRefreshToken } from "~utils/jwt.js";
import { PROFILE_ADMIN, PROFILE_SITE } from "~const";
import logger from '~logger';

export class User {

  constructor(id = "", name = "") {
    this.id = id;
    this.name = name;
    this.salt = ""
    this.profile = PROFILE_SITE
  }
  
  async generateAccessToken() {
    if(!this.id || !this.name) {return;}

    return await getAccessToken(this.id, this.name);
  };
  
  async generateRefreshToken() {
    if(!this.id || !this.name) {return;}

    return await getRefreshToken(this.id);
  };

  async signIn (id="", password="") {
    const query = 
    `SELECT *
      FROM sales_user
      WHERE service = 1 AND id = ${safeParm(id)} AND password = ${safeParm(password)}`
    
    const userQuery = await excute(query);

    this.id = userQuery[0]?.id;
    this.name = userQuery[0]?.name;
    this.profile = userQuery[0]?.profile == 0 ? PROFILE_ADMIN : PROFILE_SITE;
    
    return this;
  };

  async checkId (id="") {
    const query = 
    `SELECT *
      FROM sales_user
      WHERE service = 1 AND id = ${safeParm(id)}`
    
    const userQuery = await excute(query);

    return {
      duplicated : userQuery.length != 0,
      salt: userQuery[0]?.salt
    }
  };

  async findById (id="") {
    const query = 
    `SELECT *
      FROM sales_user
      WHERE service = 1 AND id = ${safeParm(id)}`
    
    const userQuery = await excute(query);

    this.id = userQuery[0].id;
    this.name = userQuery[0].name;
    this.salt = userQuery[0].salt;

    this.profile = userQuery[0].profile == 0 ? PROFILE_ADMIN : PROFILE_SITE;
    
    return this;
  };

  async getList(caller, name = "", phone = "") {
    let option = "";
    if(!caller.profile.isAdmin()){
      option = `AND id = ${safeParm(caller._id)}`;
    }
    
    const query = 
    `SELECT ROWNUM() as no, profile, name, rank, id, phone, office_phone, email, created_date
      FROM sales_user
      WHERE service = 1 AND name LIKE ${safeParm(`%${name}%`)} AND phone LIKE ${safeParm(`%${phone}%`)} ${option}`

    return await excute(query);
  }

  async getItem(id) {
    const query = 
    `SELECT profile, name, id, phone, office_phone, rank, email, memo, created_date
      FROM sales_user
      WHERE service = 1 AND id = ${safeParm(id)}`

    return await excute(query);
  }

  async insertItem(caller, item) {
    const query = 
    `INSERT INTO sales_user (id, password, profile, name, phone, office_phone, rank, email, memo, salt, created_by, updated_by)
      VALUES (${safeParm(item.id)}, ${safeParm(item.password)}, ${safeParm(item.profile)}, ${safeParm(item.name)}, ${safeParm(item.phone)}, ${safeParm(item.officePhone)}, ${safeParm(item.rank)}, ${safeParm(item.email)}, ${safeParm(item.memo)}, ${safeParm(item.salt)}, ${safeParm(caller._id)}, ${safeParm(caller._id)})`

    return await excute(query);
  }

  async updateItem(caller, item) {
    const isPwUpdate = item.password != "";
    const query = 
    `UPDATE sales_user
      SET ${isPwUpdate ? "password = " + safeParm(item.password) + "," : ""}
          profile = ${safeParm(item.profile)},
          name = ${safeParm(item.name)},
          phone = ${safeParm(item.phone)},
          office_phone = ${safeParm(item.officePhone)},
          rank = ${safeParm(item.rank)},
          email = ${safeParm(item.email)},
          memo = ${safeParm(item.memo)},
          ${isPwUpdate ? "salt = " + safeParm(item.salt) + "," : ""}
          updated_by = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`

    return await excute(query);
  }

  async deleteItem(caller, item) {
    const query = 
    `UPDATE sales_user
      SET service = 0,
          updated_by  = ${safeParm(caller._id)},
          updated_date = CURRENT_TIMESTAMP()
      WHERE id = ${safeParm(item.id)}`
      
    return await excute(query);
  }
}