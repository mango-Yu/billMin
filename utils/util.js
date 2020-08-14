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

module.exports = {
  formatTime: formatTime,
  funcDealNull: funcDealNull,
  isNull: isNull
}
