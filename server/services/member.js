import { Member } from "~models/member.js";
import { InterestedSetting } from "~models/interestedSetting.js";
import { regionMap } from "~utils/region.js";

export class MemberService {
  constructor(){
    this.member = new Member();
    this.interestedSetting = new InterestedSetting()
  }

  async update(caller, item) {
    return await this.member.updateItem(caller, item);
  }

  async delete(caller, item) {
    return await this.member.deleteItem(caller, item);
  }

  async todaysRegist() {
    return await this.member.getTodaysRegistCnt();
  }

  async cityInfo() {
    return regionMap(await this.member.getCityOfMember());
  }

  async ageInfo() {
    return await this.member.getAgeOfMember();
  }

  async list(searchName, searchPhone) {
    const fields = await this.interestedSetting.getItem()
    return await this.member.getActiveMember(fields[0], searchName, searchPhone);
  }
}
