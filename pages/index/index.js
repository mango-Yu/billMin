//index.js
//获取应用实例
const app = getApp()
import storage from '../../utils/storage.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    // wx.navigateTo({ 
    //   url: '/pages/login/login'
    // })
    // wx.switchTab({ 
    //   url: '/pages/login/login'
    // })
  },
  onLoad: function () {
    wx.checkSession({
      success () {
        if (storage.get('name') != "") {
          setTimeout(function(){
            wx.switchTab({ 
              url: '/pages/day/day' 
            })
          },1500)
        }else{
          setTimeout(function(){
            wx.navigateTo({ 
              url: '/pages/login/login' 
            })
          },1500)
        }
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })
    if (app.globalData.userInfo) { 
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
