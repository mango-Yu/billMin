// pages/day/day.js
const utils = require('../../utils/util.js')
const config = require('../../utils/config.default.js')
const computedBehavior = require('miniprogram-computed')
Component({
  behaviors: [computedBehavior],
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
    work: true,
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
  computed: {
    eat(data){
      let eatSum = (utils.funcDealNull(data) + utils.funcDealNull(data) + utils.funcDealNull(data));
      let eatTotal = isNaN(eatSum) ? 0 : eatSum.toFixed(2);
        return '吃饭费用（总计：' + eatTotal + '）'
    },
    all(data) {
      let allSpend = (utils.funcDealNull(data.breakfast) + utils.funcDealNull(data.lunch) + utils.funcDealNull(data.dinner)
                     + utils.funcDealNull(data.traffic) + utils.funcDealNull(data.sock) + utils.funcDealNull(data.clothes) + utils.funcDealNull(data.play)
                     + utils.funcDealNull(data.others) + utils.funcDealNull(data.gifts) + utils.funcDealNull(data.buy) + utils.funcDealNull(data.foods)
                     + utils.funcDealNull(data.visa) + utils.funcDealNull(data.loans) + utils.funcDealNull(data.skin) + utils.funcDealNull(data.health) + utils.funcDealNull(data.insure));
       return isNaN(allSpend) ? 0 : allSpend.toFixed(2);
     }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      this.setData({
        date: utils.formatTime(new Date())
      });
      // this.funcGetDay(utils.formatTime(new Date()))
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
    },
    
  }
})
