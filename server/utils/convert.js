import logger from "~logger";
import { checkDir } from "./check.js";
import config from '~config';

export const round = (value, pos = 0) => {
  value = Number(value);
  let position = Math.pow(10, pos);
  return String(Math.round((value + Number.EPSILON) * position) / position);
};

export const toMinsecString = (value) => {
  value = Number(value);
  let minutes = Math.floor(value / 60);
  let seconds = Math.round(value - minutes * 60);
  return `${minutes}분 ${seconds}초`;
};

export const tohmsString = (value) => {
  value = Number(value);
  let hour = Math.floor(value / 360);
  let minutes = Math.floor((value - hour * 360) / 60);
  let seconds = Math.round(value - hour * 360 - minutes * 60);
  return `${("0" + hour).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
};

export const getImgFileName = (originalname) => {
  let date = new Date();
  let dir = `${date.getFullYear()}${date.getMonth()}`;
  checkDir(`${config.public}/${dir}`)

  return`${dir}/${Date.now()}.${originalname.split('.').pop()}` 
}
