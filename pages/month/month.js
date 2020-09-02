// pages/month/month.js
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
    form: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      traffic: 0,
      sock: 0,
      clothes: 0,
      play: 0,
      others: 0,
      buy: 0,
      gifts: 0,
      loans: 0,
      visa: 0,
      foods: 0,
      skin: 0,
      health: 0,
      insure: 0,
      house: 0,
    },
    show: false,
    month: "",
    count: 0,
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
    }
  },
  computed: {
    eat(data) {
      return (parseFloat(data.form.breakfast) + parseFloat(data.form.lunch) + parseFloat(data.form.dinner)).toFixed(2)
    },
    nextmonth(data) {
      let arr = data.month.split("-")
      let time = ""
      if (parseInt(arr[1]) == 12) {
        time = (parseInt(arr[0]) + 1) + '-01'
      } else {
        let m = (parseInt(arr[1]) + 1);
        time = arr[0] + '-' + ((m < 10) ? ('0' + m) : m)
      }
      return time
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      let date = new Date();
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      month = (month < 10) ? ("0" + month) : month
      this.setData({
        month: year + '-' + month
      })
      this.setData({
        now: year + '-' + month
      })
      // if (storage.get('exit')) {
      //   this.funcGetMonth();
      // }
    },
    onShow(item) {
      if (storage.get('name') == ""){
        for(let i in this.data.form){
          this.data.form[i] = 0;
        }
        this.setData({
          form: this.data.form,
          count: 0
        })
      }else{
        this.funcGetMonth();
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
      let selcetTime = utils.formatTime(dateTime, "month");
      let that = this;
      this.setData({
        month: utils.formatTime(dateTime, "month"),
        show: false
      });
      if (selcetTime < '2020-01') {
        this.setData({
          month: '2020-01'
        });
        wx.showToast({
          title: '2020-01是最早时间',
          icon: 'none',
          duration: 2000
        })
        if (storage.get('name') == ""){
          for(let i in this.data.form){
            this.data.form[i] = 0;
          }
          this.setData({
            form: this.data.form,
            count: 0
          })
        }else{
          this.funcGetMonth();
        }
      }else if (selcetTime > that.data.now) {
        this.setData({
          month: that.data.now
        });
        wx.showToast({
          title: that.data.now + '是最晚时间',
          icon: 'none',
          duration: 2000
        })
        if (storage.get('name') == ""){
          for(let i in this.data.form){
            this.data.form[i] = 0;
          }
          this.setData({
            form: this.data.form,
            count: 0
          })
        }else{
          this.funcGetMonth();
        }
      }else{
        if (storage.get('name') == ""){
          for(let i in this.data.form){
            this.data.form[i] = 0;
          }
          this.setData({
            form: this.data.form,
            count: 0
          })
        }else{
          this.funcGetMonth();
        }
      }
      // this.funcGetDay(utils.formatTime(dateTime))
    },
    cancelDate() {
      this.setData({
        show: false
      });
    },
    funcGetMonth() {
      // if (storage.get("sessionid") == '') {
      //   wx.navigateTo({
      //     url: '/pages/login/login'
      //   })
      //   return;
      // }
      let that = this;
      let obj = {
        month: this.data.month,
        nextmonth: this.data.nextmonth
      }
      wx.request({
        url: `${config.api + '/getSumByDate'}`,
        data: obj,
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': storage.get("sessionid")
          //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
        },
        method: 'POST',
        dataType: "json",
        success: function (res) {
          let objData = res.data.data[0]
          let allMonth = 0;
          for (let i in objData) {
            if (objData[i] == null) {
              that.setData({
                count: 0
              })
              let str = i.split(')')[0].split('(')[2]
              that.data.form[str] = 0
              that.setData({
                form: that.data.form
              });
            } else {
              if (i.indexOf('visa') > 0 || i.indexOf('house') > 0) {
                allMonth += 0
                // that.setData({
                //   count: that.data.count += 0
                // })
              } else {
                allMonth += objData[i]
                // that.setData({
                //   count: that.data.count += objData[i]
                // })
              }
              let str = i.split(')')[0].split('(')[2]
              that.data.form[str] = parseFloat(objData[i]).toFixed(2);
              that.setData({
                form: that.data.form
              });
            }
          }
          that.setData({
            count: parseFloat(allMonth).toFixed(2)
          })
        }
      })
    }
  }
})