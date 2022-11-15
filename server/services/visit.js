import { Visit } from "~models/visit.js";
import { VisitSetting } from "~models/visitSetting.js";
import logger from "~logger";

export class VisitService {
  constructor(){
    this.visit = new Visit();
    this.setting = new VisitSetting();
  }

  async resvList(condition) {
    return await this.visit.getList(condition);
  }

  async resvCsvDownload(condition) {
    let data = {};
    let csvValueList = await this.visit.getList(condition);
    
    // data.header = ["NO", "방문예정날짜", "방문예정시간", "성명", "전화번호", "방문인원", "등록일"];
    data.header = [
      { header: "No", key: "no", width: 5 },
      { header: "방문예정날짜", key: "visitDay", width: 15 },
      { header: "방문예정시간", key: "visitTime", width: 15 },
      { header: "성명", key: "name", width: 15 },
      { header: "전화번호", key: "phone", width: 15 },
      { header: "방문인원", key: "visitNum", width: 10 },
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
    return await this.visit.getItem(id);
  }

  async resvRegist(caller, item) {
    try {
      let settingID = await this.setting.getId(item.visitDay, item.visitTime)
      if(settingID) {
        return "error:  예약 불가 일정입니다"
      }
      return await this.visit.insertItem(caller, settingID, item);
    }catch(e) {

    }
  }

  async resvUpdate(caller, item) {
    return await this.visit.updateItem(caller, item);
  }

  async resvDelete(caller, item) {
    return await this.visit.deleteItem(caller, item);
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