import { Contractor } from "~models/contractor.js";
import { PaymentVisit } from "~models/paymentVisit.js";
import { PaymentSetting } from "~models/paymentSetting.js";
import logger from "~logger";

export class PaymentService {
  constructor(){
    this.contractor = new Contractor();
    this.paymentVisit = new PaymentVisit();
    this.setting = new PaymentSetting();
  }

  async list(condition) {
    return await this.contractor.getList(condition.name, condition.phone);
  }

  async detail(id) {
    return await this.contractor.getItem(id);
  }

  async regist(caller, items) {
    return await this.contractor.insertItem(caller, items);
  }

  async update(caller, item) {
    return await this.contractor.updateItem(caller, item);
  }

  async delete(caller, item) {
    return await this.contractor.deleteItem(caller, item);
  }

  async resvList(condition) {
    return await this.paymentVisit.getList(condition);
  }

  async resvCsvDownload(condition) {
    let data = {};
    let csvValueList = await this.paymentVisit.getList(condition);
    
    data.header = [
      { header: "No", key: "no", width: 5 },
      { header: "방문예정날짜", key: "visitDay", width: 15 },
      { header: "방문예정시간", key: "visitTime", width: 15 },
      { header: "성명", key: "name", width: 15 },
      { header: "전화번호", key: "phone", width: 15 },
      { header: "호실", key: "room", width: 10 },
      { header: "등록기기", key: "device", width: 10 },
      { header: "등록일", key: "createdDate", width: 15 }
    ];
    
    csvValueList = csvValueList.filter(item => {
      item.visitDay = item.visitDay.toJPLocaleString().hiveDateStyle();
      item.createdDate = item.createdDate.toJPLocaleString('withTime').hiveDateStyle();
      return item
    })

    data.value = csvValueList;
    return data;
  }

  async resvDetail(id) {
    return await this.paymentVisit.getItem(id);
  }

  async resvRegist(caller, item) {
    try {
      let settingID = await this.setting.getId(item.visitDay, item.visitTime)
      if(settingID) {
        return "error:  예약 불가 일정입니다"
      }
      return await this.paymentVisit.insertItem(caller, settingID, item);
    }catch(e) {

    }
  }

  async resvUpdate(caller, item) {
    return await this.paymentVisit.updateItem(caller, item);
  }

  async resvDelete(caller, item) {
    return await this.paymentVisit.deleteItem(caller, item);
  }

  async settingList(condition) {
    let settings = await this.setting.getList(condition);
    return this.#formatSettingList(settings);
  }

  async settingDetail(date) {
    return await this.setting.getItem(date);
  }

  async settingRegist(caller, items) {
    return await this.setting.insertItem(caller, items);
  }

  async settingUpdate(caller, items) {
    return await this.setting.updateItem(caller, items);
  }

  async settingDelete(caller, items) {
    return await this.setting.deleteItem(caller, items);
  }

  #formatSettingList(settingList) {
    let result = [];  
    try {
      let dateList = [...new Set(settingList.map(element => element.visitDay.toYMDStr()))];

      dateList.forEach((date, index) => {
        let item = {};
        item.no = index + 1;
        item.visitDate = date;
        item.schedule = [];
        settingList.forEach(element => {
          if (element.visitDay.toYMDStr() == date) {
            item.schedule.push(`${element.visitTime.toHMStr()}-${element.maximunNum}-(${element.visitCnt})`);
          }
        });
        result.push(item);
      });
    } catch (e) {
      logger.error(a)
      return e
    }

    return result;
  }
}