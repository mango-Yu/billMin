// pages/login/login.js
const config = require('../../utils/config.default.js')
import storage from '../../utils/storage.js'
const base64 = require('../../utils/base64.min')
const CryptoJS = require('../../utils/CryptoJS')
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
    name: '',
    password: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeUser(event) {
      // event.detail 为当前输入的值
      this.setData({
        name: event.detail
      })
    },
    onChangePwd(event) {
      // event.detail 为当前输入的值
      this.setData({
        password: event.detail
      })
    },

    onSubmit() {
      var that = this;
      if (this.data.name == '') {
        wx.showToast({
          title: '请输入用户名',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (this.data.password == '') {
        wx.showToast({
          title: '请输入密码',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      // var  enResult = base64.encode(CryptoJS.Encrypt());
      // var deResult = CryptoJS.Decrypt(base64.decode());
      // console.log(deResult)
      wx.request({
        url: `${config.api + '/login'}`,
        data: {
          name: this.data.name,
          password: base64.encode(CryptoJS.Encrypt(this.data.password))
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 1) {
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 2000
            })
            storage.put('name', that.data.name, 5);
            storage.put("sessionid", res.header["Set-Cookie"], 5);
            wx.switchTab({
              url: '/pages/setting/setting',
              success() {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              image: '../../images/fail.png',
              duration: 2000
            })
          }
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
  }
})