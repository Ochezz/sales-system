import { User } from "~models/user.js";
import { Ip } from "~models/ip.js";
import { CustomError } from "~utils/CustomError.js";
import logger from "~logger";

export class UserService {
  constructor(){
    this.user = new User();
    this.ip = new Ip();
  }

  async list(caller, condition) {
    return await this.user.getList(caller, condition.name, condition.phone);
  }

  async detail(id) {
    const userInfo = await this.user.getItem(id);
    const ipInfo = await this.ip.getItems(id);
    userInfo[0].ips = ipInfo;
    return userInfo;
  }

  async regist(caller, newUserInfo) {
    // 중복 아이디 확인
    const checkInfo = await this.user.checkId(newUserInfo.id);

    if(checkInfo.duplicated) {
        throw new CustomError('SignUP Duplicated', 406, 'You are already registered');
    }

    // 유저 등록
    await this.user.insertItem(caller, newUserInfo);
    await this.ip.insertItems(caller, newUserInfo.id, newUserInfo.ips);

    // 유저 등록 확인
    const authorizedUser = await this.user.findById(newUserInfo.id);

    // Access Token, Refresh Token 발급
    const id = authorizedUser.id;
    const nickName = authorizedUser.name;
    const accessToken = await authorizedUser.generateAccessToken();
    const refreshToken = await authorizedUser.generateRefreshToken();
    return { id, nickName, accessToken, refreshToken };
}

  async update(caller, item) {
    return await Promise.all([
      this.user.updateItem(caller, item),
      this.ip.updateItems(caller, item.id, item.ips)
    ]);
  }

  async delete(caller, item) {
    return await this.user.deleteItem(caller, item);
  }

  async csvDownload(caller, condition) {
    let data = {};
    let valueList = await this.user.getList(caller, condition.name, condition.phone);
    
    data.header = [
      { header: "No", key: "no", width: 5 },
      { header: "구분", key: "profile", width: 20 },
      { header: "성명", key: "name", width: 20 },
      { header: "직급", key: "rank", width: 10 },
      { header: "로그인아이디", key: "id", width: 20 },
      { header: "휴대번호", key: "phone", width: 30 },
      { header: "사무실전화번호", key: "office_phone", width: 30 },
      { header: "메일주소", key: "email", width: 30 },
      { header: "등록일", key: "created_date", width: 30 }
    ];
    
    valueList = valueList.filter(item => {
      item.created_date = item.created_date.toJPLocaleString('withTime').hiveDateStyle();
      item.profile = item.profile == 0 ? '최고 관리자' : '사이트 관리자';
      return item
    })

    data.value = valueList;
    return data;
  }
}