const formatTime = (date, type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  if (type && type === "month") {
    return [year, month].map(formatNumber).join('-')
  }else{
    return [year, month, day].map(formatNumber).join('-')
  }
}
const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

const padLeftZero = str => {
   return ('00' + str).substr(str.length);
 }
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const funcDealNull = attr =>{
  let that = this;
  if (isNull(attr)){
    return 0;
  }else {
    return parseFloat(attr);
  }
}
const isNull = str => {
  if (str === '') {
    return true;
  }
}
const CheckPassWord = (password, type) => {//必须为字母加数字且长度不小于6位
  var str = password;
  if (str != null) {
    if (str.length > 6 && type === 0) {
      return false;
    } else if (str.length < 6 && type === 1) {
      return false;
    }
  } else {
    return false;
  }
  var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
  if (!reg1.test(str)) {
    return false;
  }
  var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
module.exports = {
  formatTime: formatTime,
  funcDealNull: funcDealNull,
  isNull: isNull,
  formatDate: formatDate,
  padLeftZero: padLeftZero,
  CheckPassWord: CheckPassWord
}
