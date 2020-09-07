// pages/setting/setting.js
const utils = require('../../utils/util.js')
const config = require('../../utils/config.default.js')
import storage from '../../utils/storage.js'
const base64 = require('../../utils/base64.min')
const CryptoJS = require('../../utils/CryptoJS')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    origain:"",
    newword:"",
    remewword:"",
    show: false,
    myloginInfo: storage.get('name'),
    userInfo:  storage.get('userInfo'),
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

   
  onInputPsw(event){
    this.setData({
      origain: event.detail
    })
  },
  onInputNewPsw(event){
    this.setData({
      newword: event.detail
    })
  },

  onInputRePsw(event){
    this.setData({
      remewword: event.detail
    })
  },
  onChage(){
    let that = this;
    if(this.data.origain==''){
      wx.showToast({
        title: '请输入原来的密码',
        icon: 'none',
        duration: 2000
      }) 
      return
    }
    if(this.data.newword==''){
      wx.showToast({
        title: '请输入新的的密码',
        icon: 'none',
        duration: 2000
      }) 
      return
    }
    if(this.data.remewword==''){
      wx.showToast({
        title: '请重复密码',
        icon: 'none',
        duration: 2000
      }) 
      return
    }
    if(this.data.remewword!=this.data.newword){
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none',
        duration: 2000
      }) 
      return
    }
    // if (!utils.CheckPassWord(this.data.newword, 1)) {
    //   wx.showToast({
    //     title: '密码必须为字母加数字且长度不小于6位',
    //     icon: 'none',
    //     duration: 2000
    //   }) 
    //   return
    // }
    
    let obj={
      password: base64.encode(CryptoJS.Encrypt(that.data.origain)),
      newPas: base64.encode(CryptoJS.Encrypt(that.data.newword))
    }
    wx.request({
      url: `${config.api + '/changePassword'}`,
      data: obj,
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': storage.get("sessionid")
        //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
      },
      method: 'POST',
      success: function (data) {
        let  response=data.data;
        if(response.code==1){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          }) 
          that.setData({
            origain: '',
            newword: '',
            remewword: ''
          })
          wx.navigateTo({ 
            url: '/pages/login/login' 
          })
          storage.remove("name");
          storage.remove("sessionid");
        }else{
          wx.showToast({
            title: response.msg,
            icon: 'none',
            duration: 2000
          })
          that.setData({
            origain: '',
            newword: '',
            remewword: ''
          })
        }
      }
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  toRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  exitLogin() {
    storage.remove('userInfo');
    storage.remove('name');
    storage.remove('sessionid');
    this.onLoad();
  },
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // }) 
    if (storage.get('name') != "") {
      wx.switchTab({ 
        url: '/pages/day/day'
      })
    }else{
      wx.navigateTo({ 
        url: '/pages/login/login' 
      })
    }
  },
  onLoad: function () {
    let that = this;
    if (storage.get('name') != '') {
      that.setData({
        myloginInfo: storage.get('name')
      })
      wx.switchTab({ 
        url: '/pages/day/day'
      })
    }else{
      that.setData({
        myloginInfo: ''
      })
    }
    if (app.globalData.userInfo) { 
      // that.bindViewTap();
      storage.put('userInfo', app.globalData.userInfo, 5)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        if (res.userInfo) {
          // that.bindViewTap();
          storage.put('userInfo', res.userInfo, 5)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      }
    } else {
      console.log(3)
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          if (app.globalData.userInfo) {
            // that.bindViewTap();
            storage.put('userInfo', res.userInfo, 5)
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (app.globalData.userInfo) {
      storage.put('userInfo', app.globalData.userInfo, 5)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '花好每一分钱，每一分钱都值得被记录',
      path: '/pages/setting/setting',
      imageUrl: '/images/share.png',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    }
  }
})