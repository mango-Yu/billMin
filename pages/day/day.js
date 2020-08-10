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
      let eatSum = (utils.funcDealNull(data.breakfast) + utils.funcDealNull(data.lunch) + utils.funcDealNull(data.dinner));
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
        date: utils.formatTime(new Date()),
        now: utils.formatTime(new Date())
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
      let selcetTime = utils.formatTime(dateTime);
      let that = this;
      this.setData({
        date: utils.formatTime(dateTime),
        show: false
      });
      if (selcetTime < '2020-01-01') {
        this.setData({
          date: '2020-01-01'
        });
        wx.showToast({
          title: '2020-01-01是最早时间',
          icon: 'none',
          duration: 2000
        })
      }
      if (selcetTime > that.data.now) {
        this.setData({
          date: that.data.now
        });
        wx.showToast({
          title: that.data.now + '是最晚时间',
          icon: 'none',
          duration: 2000
        })

      }
      this.funcGetDay(utils.formatTime(dateTime))
    },
    cancelDate(){
      this.setData({
        show: false
      });
    },
    funcSetData(type, formData){
      if (type === 2) {
        this.setData({
          breakfast: 0,
          lunch: 0,
          dinner: 0,
          traffic: 0,
          sock: 0,
          house: 0,
          work: true,
          clothes: 0,
          clothesRemind: '',
          play: 0,
          playRemind: '',
          others: 0,
          othersRemind: '',
          gifts: 0,
          giftsRemind: '',
          buy: 0,
          buysRemind: '',
          loans: 0,
          loansRemind: '',
          visa: 0,
          visaRemind: '',
          foods: 0,
          foodsRemind: '',
          skin: 0,
          skinRemind: '',
          health: 0,
          healthRemind: '',
          insure: 0,
          insureRemind: ''
        })
      }else if (type === 1){
        this.setData({
          breakfast: formData.breakfast,
          lunch: formData.lunch,
          dinner: formData.dinner,
          traffic: formData.traffic,
          sock: formData.sock,
          house: formData.house,
          work: formData.work ? true : false,
          clothes: formData.clothes,
          clothesRemind: formData.clothesRemind,
          play: formData.play,
          playRemind: formData.playRemind,
          others: formData.others,
          othersRemind: formData.othersRemind,
          gifts: formData.gifts,
          giftsRemind: formData.giftsRemind,
          buy: formData.buy,
          buysRemind: formData.buysRemind,
          loans: formData.loans,
          loansRemind: formData.loansRemind,
          visa: formData.visa,
          visaRemind: formData.visaRemind,
          foods: formData.foods,
          foodsRemind: formData.foodsRemind,
          skin: formData.skin,
          skinRemind: formData.skinRemind,
          health: formData.health,
          healthRemind: formData.healthRemind,
          insure: formData.insure,
          insureRemind: formData.insureRemind
        })
      }
    },
    funcGetDay(d){
      let obj = {date:d}
      var that = this;
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
          let data = res.data;
          if (data.code == 1) {
            if (data.data.length > 0) {
              data.data[0].date = utils.formatTime(new Date(data.data[0].date), "yyyy-MM-dd")
              that.funcSetData(1, data.data[0]);
            } else {
              for (let i in that.data) {
                if (!(i == "playRemind" || i == "clothesRemind" || i == "giftsRemind" || i == "othersRemind" ||
                      i == "buysRemind" || i == "loansRemind" || i == "visaRemind" || i == "foodsRemind" || i == "skinRemind" || i == "healthRemind"|| i == "insureRemind"
                      || i == "date" || i == 'user') && i !== "work") {
                        that.funcSetData(2);
                }else if (i == "work") {
                  that.setData({
                    work: true
                  });
                }else {
                  if (i != "date" && i != "user" && i !== "work") {
                    that.funcSetData(2);
                  }
                }
              }
              console.log(that.data)
            }
          } else {
            wx.showToast({
              title: '系统异常',
              image: '../../images/fail.png',
              duration: 2000
            })
          }
        }
      })
    },
    
  }
})
