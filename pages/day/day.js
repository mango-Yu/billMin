// pages/day/day.js
const utils = require('../../utils/util.js')
const config = require('../../utils/config.default.js')
const computedBehavior = require('miniprogram-computed')
import storage from '../../utils/storage.js'
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
    first: 0,
    clicks: 0
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
      console.log(this.data.first)
      this.setData({
        form: {
          date: utils.formatTime(new Date()),
          user: storage.get('name')
        },
        now: utils.formatTime(new Date()),
        first: 1,
      });
      this.funcGetDay(utils.formatTime(new Date()))
    },
    onShow() {
      console.log(this.data.clicks)
      if (this.data.first === 0 && storage.get('name') !== "") {
        console.log(this.data.clicks)
        this.funcGetDay(utils.formatTime(new Date()))
        this.setData({
          first: 1
        })
      }
    },
    // onHide(){
    //   this.setData({
    //     first: 1,
    //   })
    // },
    onTabItemTap(item) {
      if (storage.get('name') == ""){
        this.funcSetData(2, '', this.data.form.date);
        this.setData({
          first: 0
        })
      }
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
        if (storage.get('name') == ""){
          this.funcSetData(2, '', '2020-01-01');
        }else{
          this.funcGetDay('2020-01-01')
        }
      } else if (selcetTime > that.data.now) {
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
        if (storage.get('name') == ""){
          this.funcSetData(2, '', that.data.now);
        }else{
          this.funcGetDay(that.data.now)
        }
      }else{
        if (storage.get('name') == ""){
          this.funcSetData(2, '', utils.formatTime(dateTime));
        }else{
          this.funcGetDay(utils.formatTime(dateTime))
        }
      }
      
    },
    cancelDate() {
      this.setData({
        show: false
      });
    },
    funcSetData(type, formData, date) {
      let that = this;
      if (type === 2) {
        this.setData({
          form: {
            date: date,
            user: storage.get('name'),
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
            user: storage.get('name'),
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
      console.log(inputVal)
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
      // if (storage.get("sessionid") == '') {
      //   wx.navigateTo({
      //     url: '/pages/login/login'
      //   })
      //   return;
      // }
      let obj = {
        date: d
      }
      var that = this;
      wx.request({
        url: `${config.api + '/getSpending'}`,
        data: obj,
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': storage.get("sessionid")
          //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
        },
        method: 'POST',
        dataType: "json",
        success: function (res) {
          let data = res.data;
          if (data.code == 1) {
            if (data.data.length > 0) {
              data.data[0].date = utils.formatTime(new Date(data.data[0].date), "yyyy-MM-dd")
              that.funcSetData(1, data.data[0], '');
            } else {
              that.funcSetData(2, '', d);
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
      let that = this;
      var obj = that.data.form;
      
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
      setTimeout(function(){
        wx.request({
          url: `${config.api + '/subSpending'}`,
          data: obj,
          header: {
            'content-type': 'application/json', // 默认值
            'cookie': storage.get("sessionid")
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
      }, 500)
    }
  }
})