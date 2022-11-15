import { Popup } from "~models/popup.js";

export class PopupSrvice {
  constructor(){
    this.popup = new Popup();
  }

  async list(title) {
    return await this.popup.getList(title);
  }

  async detail(id) {
    return await this.popup.getItem(id);
  }

  async regist(caller, item) {
    return await this.popup.insertItem(caller, item);
  }

  async update(caller, item) {
    return await this.popup.updateItem(caller, item);
  }

  async delete(caller, item) {
    return await this.popup.deleteItem(caller, item);
  }
}
