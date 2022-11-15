import { Channel } from "~models/channel.js";

export class ChannelService {
  constructor(){
    this.channel = new Channel();
  }

  async allList() {
    return await this.channel.getAllChannel();
  }

  async regist(caller, item) {
    return await this.channel.insertItem(caller, item);
  }

  async update(caller, item) {
    return await this.channel.updateItem(caller, item);
  }

  async delete(caller, item) {
    return await this.channel.deleteItem(caller, item);
  }

}
