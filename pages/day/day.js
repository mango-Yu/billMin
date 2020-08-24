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
    form: {
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
      user: "",
    },
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
    eat(data) {
      let eatSum = (utils.funcDealNull(data.form.breakfast) + utils.funcDealNull(data.form.lunch) + utils.funcDealNull(data.form.dinner));
      let eatTotal = isNaN(eatSum) ? 0 : eatSum.toFixed(2);
      return '吃饭费用（总计：' + eatTotal + '）'
    },
    all(data) {
      let allSpend = (utils.funcDealNull(data.form.breakfast) + utils.funcDealNull(data.form.lunch) + utils.funcDealNull(data.form.dinner) +
        utils.funcDealNull(data.form.traffic) + utils.funcDealNull(data.form.sock) + utils.funcDealNull(data.form.clothes) + utils.funcDealNull(data.form.play) +
        utils.funcDealNull(data.form.others) + utils.funcDealNull(data.form.gifts) + utils.funcDealNull(data.form.buy) + utils.funcDealNull(data.form.foods) +
        utils.funcDealNull(data.form.visa) + utils.funcDealNull(data.form.loans) + utils.funcDealNull(data.form.skin) + utils.funcDealNull(data.form.health) + utils.funcDealNull(data.form.insure));
      return isNaN(allSpend) ? 0 : allSpend.toFixed(2);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      this.setData({
        form: {
          date: utils.formatTime(new Date()),
          user: wx.getStorageSync('name')
        },
        now: utils.formatTime(new Date())
      });
      this.funcGetDay(utils.formatTime(new Date()))
    },
    showDate() {
      this.setData({
        show: true
      });
    },
    onInput(event) {
      this.setData({
        currentDate: event.detail,
      });
    },
    selectDate(event) {
      let dateTime = new Date(event.detail);
      let selcetTime = utils.formatTime(dateTime);
      let that = this;
      this.setData({
        form: {
          date: utils.formatTime(dateTime),
        },
        show: false
      });
      if (selcetTime < '2020-01-01') {
        this.setData({
          form: {
            date: '2020-01-01'
          }
        });
        wx.showToast({
          title: '2020-01-01是最早时间',
          icon: 'none',
          duration: 2000
        })
      }
      if (selcetTime > that.data.now) {
        this.setData({
          form: {
            date: that.data.now
          }
        });
        wx.showToast({
          title: that.data.now + '是最晚时间',
          icon: 'none',
          duration: 2000
        })

      }
      this.funcGetDay(utils.formatTime(dateTime))
    },
    cancelDate() {
      this.setData({
        show: false
      });
    },
    funcSetData(type, formData) {
      let that = this;
      if (type === 2) {
        this.setData({
          form: {
            date: utils.formatTime(new Date()),
            user: wx.getStorageSync('name'),
            breakfast: '',
            lunch: '',
            dinner: '',
            traffic: '',
            sock: '',
            house: '',
            work: true,
            clothes: '',
            clothesRemind: '',
            play: '',
            playRemind: '',
            others: '',
            othersRemind: '',
            gifts: '',
            giftsRemind: '',
            buy: '',
            buysRemind: '',
            loans: '',
            loansRemind: '',
            visa: '',
            visaRemind: '',
            foods: '',
            foodsRemind: '',
            skin: '',
            skinRemind: '',
            health: '',
            healthRemind: '',
            insure: '',
            insureRemind: ''
          }
        })
      } else if (type === 1) {
        this.setData({
          form: {
            date: utils.formatTime(new Date(formData.date)),
            user: wx.getStorageSync('name'),
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
          }
        })
      }
    },
    changeInput(e) {
      let key = e.currentTarget.dataset.key;
      if (key === "work") {
        let work = e.detail;
        this.data.form[key] = work;
      } else {
        let num = e.detail + "";
        num = num.replace(/[^\-?\d.]/g, '');
        if (num == "" || num < 0) {
          return;
        }
        this.data.form[key] = num;
      }
      this.setData({
        form: this.data.form
      });
    },
    blurInput(e) {
      let key = e.currentTarget.dataset.key;
      let inputVal = e.detail.value + "";
      console.log(key)
      if (key.indexOf('Remind') > 0) {
        inputVal = inputVal.replace(/(^\s*)|(\s*$)/g, "");
      } else {
        inputVal = inputVal.replace(/[^\-?\d.]/g, '');
        if (inputVal == "" || inputVal < 0) {
          inputVal = 0
        }
      }
      this.data.form[key] = inputVal;
      this.setData({
        form: this.data.form
      });
      console.log(this.data.form)
    },
    funcGetDay(d) {
      let obj = {
        date: d
      }
      var that = this;
      wx.request({
        url: `${config.api + '/getSpending'}`,
        data: obj,
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': wx.getStorageSync("sessionid")
          //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
        },
        method: 'POST',
        dataType: "json",
        success: function (res) {
          let data = res.data;
          if (data.code == 1) {
            if (data.data.length > 0) {
              data.data[0].date = utils.formatTime(new Date(data.data[0].date), "yyyy-MM-dd")
              that.funcSetData(1, data.data[0]);
            } else {
              that.funcSetData(2);
              console.log(that.data.form)
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
    onSubmitDay() {
      var obj = this.data.form;
      for (let i in obj) {
        if (!(i == "playRemind" || i == "clothesRemind" || i == "othersRemind" || i == "giftsRemind" ||
            i == "buysRemind" || i == "loansRemind" || i == "visaRemind" || i == "foodsRemind" || i == "skinRemind" || i == "healthRemind" || i == "insureRemind" ||
            i == "date" || i == 'user')) {
          if (i === "work") {
            obj[i] = obj[i] ? 1 : 0;
          } else {
            if ((obj[i] + "") == "") {
              obj[i] = isNaN(parseFloat(obj[i])) ? 0 : parseFloat(obj[i])
            }
          }
        }
      }
      var that = this;
      wx.request({
        url: `${config.api + '/subSpending'}`,
        data: obj,
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': wx.getStorageSync("sessionid")
          //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
        },
        method: 'POST',
        dataType: "json",
        success: function (res) {
          let data = res.data
          if (data.code == 1) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            that.funcGetDay(that.data.form.date)
          } else {
            wx.showToast({
              title: '提交失败',
              image: '../../images/fail.png',
              duration: 2000
            })
          }
        },
        fail: function (err) {
          console.log(err)
          wx.showToast({
            title: '提交失败',
            image: '../../images/fail.png',
            duration: 2000
          })
        }
      })
    }
  }
})