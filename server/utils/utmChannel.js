import logger from "~logger";
import { Channel } from "~models/channel.js";


const utmChannelMap = async (rows, format = (findIdx, item, value) => {return {};}) => {
  let channel = new Channel();
  let items = await channel.getAllChannel()
 
  try {
    rows.forEach((row, i) => {
      let channel = row.dimensions[0];
      let findIdx = items.findIndex((utmChannel) =>
        new RegExp(utmChannel.channel).test(channel)
      );
      if (findIdx != -1) {
        items[findIdx] = format(findIdx, items[findIdx], row);
      }
    });
  } catch (e) {
    logger.error(e);
  }

  return items;
};

export { utmChannelMap };
