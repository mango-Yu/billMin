// pages/day/day.js
const utils = require('../../utils/util.js')
const config = require('../../utils/config.default.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false, 
    date: '',
    breakfast: '',
    lunch: '',
    dinner: '',
    traffic: '',
    sock: '',
    house: '',
    work: 1,
    clothes: '',
    clothesRemind: "",
    play: '',
    playRemind: "",
    others: '',
    othersRemind: "",
    gifts: '',
    giftsRemind: "",
    buy: '',
    buysRemind: "",
    loans: '',
    loansRemind: "",
    visa: '',
    visaRemind: "",
    foods: '',
    foodsRemind: "",
    skin: '',
    skinRemind: "",
    health: '',
    healthRemind: "",
    insure: '',
    insureRemind: "",
    user: "" ,
    now: "",
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      this.setData({
        date: utils.formatTime(new Date())
      });
      this.funcGetDay(utils.formatTime(new Date()))
    },
    showDate(){
      this.setData({
        show: true
      });
    },
    onInput(event) {
      this.setData({
        currentDate: event.detail,
      });
    },
    selectDate(event){
      let dateTime = new Date(event.detail); 
      this.setData({
        date: utils.formatTime(dateTime),
        show: false
      });
      this.funcGetDay(utils.formatTime(dateTime))
    },
    cancelDate(){
      this.setData({
        show: false
      });
    },
    funcGetDay(d){
      let obj = {date:d}
      wx.request({
        url:  `${config.api + '/getSpending'}`,
        data: obj,
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': wx.getStorageSync("sessionid")
          //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
        },
        method: 'POST',
        dataType: "json",
        success: function (res) {
          console.log(res)
        }
      })
    }
  }
})
