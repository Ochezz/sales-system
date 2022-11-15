import { InterestedSetting } from "~models/interestedSetting.js";
import { Member } from "~models/member.js";
import logger from '~logger';

export class InterestedService {
  constructor(){
    this.setting = new InterestedSetting();
    this.member = new Member();
  }

  async csvDownload(searchName, searchPhone) {
    let data = {};
    
    // let csvHeader = ["NO", "성명", "휴대폰", "연령대", "email", "주소", "등록기기", "마케팅활용수신동의", "등록일"];

    let checkHeader = await this.setting.getItem();
    let csvValueList = await this.member.getActiveMember(checkHeader[0], searchName, searchPhone);
    
    data.header = this.#formatHeader(checkHeader[0]);
    data.value = [];
    csvValueList.data.forEach(element => {
      data.value.push(this.#formatValue(element, checkHeader[0]));
    });
    return data;
  }

  async getSetting() {
    return await this.setting.getItem();
  }

  async registNewSetting(caller, item) {
    return await this.setting.insertItem(caller, item);
  }

  #formatHeader(checkHeader) {
    let result = [{ header: "NO", key: "NO", width: 5 }];
    if (checkHeader.useName == 1) {
      result.push({ header: "성명", key: "성명", width: 15 });
    }
    if (checkHeader.usePhone == 1) {
      result.push({ header: "휴대폰", key: "휴대폰", width: 15 });
    }
    if (checkHeader.useAgeGroup == 1) {
      result.push({ header: "연령대", key: "연령대", width: 10 });
    }
    if (checkHeader.userEmail == 1) {
      result.push({ header: "email", key: "email", width: 10 });
    }
    if (checkHeader.useAddress == 1) {
      result.push({ header: "주소", key: "주소", width: 30 });
    }
    result.push({ header: "등록기기", key: "등록기기", width: 10 });
    if (checkHeader.useMarketting == "Y") {
      result.push({ header: "마케팅활용수신동의", key: "마케팅활용수신동의", width: 10 });
    }
    result.push({ header: "등록일", key: "등록일", width: 10 });
    return result;
  }

  #formatValue(csvValue, checkHeader) {
    let result = {};
    result["NO"] = csvValue.no;
    if (checkHeader.useName == 1) {
      result["성명"] = csvValue.name;
    }
    if (checkHeader.usePhone == 1) {
      result["휴대폰"] = csvValue.phone;
    }
    if (checkHeader.useAgeGroup == 1) {
      result["연령대"] = csvValue.ageGroup;
    }
    if (checkHeader.userEmail == 1) {
      result["email"] = csvValue.email;
    }
    if (checkHeader.useAddress == 1) {
      result["주소"] = csvValue.address1 + " " + csvValue.address2;
    }
    result["등록기기"] = csvValue.device;
    if (checkHeader.useMarketting == "Y") {
      result["마케팅활용수신동의"] = csvValue.useMarketting;
    }
    result["등록일"] = csvValue.registedDate;
    return result;
  }
}
