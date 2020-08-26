// pages/login/login.js
const config = require('../../utils/config.default.js')
import storage from '../../utils/storage.js'
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
      wx.request({
        url: `${config.api + '/login'}`,
        data: {
          name: this.data.name,
          password: this.data.password
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 2000
            }) 
            storage.put('name', that.data.name, 5); 
            storage.put("sessionid", res.header["Set-Cookie"], 5);
            wx.switchTab({
              url: '/pages/day/day'
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
    },
    toRegister() {
      wx.navigateTo({
        url: '/pages/register/register'
      })
    }
  }
})