import { Press } from "~models/press.js";

export class PressService {
  constructor(){
    this.press = new Press();
  }

  async list(title) {
    return await this.press.getList(title);
  }

  async regist(caller, item) {
    return await this.press.insertItem(caller, item);
  }

  async update(caller, item) {
    return await this.press.updateItem(caller, item);
  }

  async delete(caller, item) {
    return await this.press.deleteItem(caller, item);
  }
}
