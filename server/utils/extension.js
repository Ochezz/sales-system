import logger from '~logger';
import moment from "moment";
import { PROFILE_ADMIN } from '~const';

const extRegist = () => {
  
  Date.prototype.toGAFormat = (index = 0) => {
    return moment().subtract(index, "days").toISOString().split("T")[0];
  };

  Date.prototype.toYMDStr = function(){
    return moment(this).format('YYYY-MM-DD');
  };

  Date.prototype.toJPLocaleString = function(option=''){
    switch (option) {
      case 'withTime':
        return this.toLocaleString('ja-JP');    
      default:
        return this.toLocaleString('ja-JP').split(" ")[0];
    }
  };  
  String.prototype.hiveDateStyle = function(){
    return this.replace(/\//g,'-');
  };

  String.prototype.toHMStr = function(){
    let timeSplitedList = this.split(':')
    return `${timeSplitedList[0]}:${timeSplitedList[1]}`;
  };

  String.prototype.getDatesBetween = function(end) {
    let dateArray = new Array();
    let currentDate = new Date(this);
    let endDate = new Date(end);
    while (currentDate <= endDate) {
       dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
       currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  String.prototype.isAdmin = function() {
    return this == PROFILE_ADMIN;
  };
  
  Array.prototype.setMap = function() {
    let map = new Map();
    this.forEach(element => {
      map.set(element.visitDay.toYMDStr() + element.visitTime.toHMStr(), element.visitNum);
    });
    return map;
  };
};
export { extRegist };