// pages/setting/setting.js
const utils = require('../../utils/util.js')
const config = require('../../utils/config.default.js')
import storage from '../../utils/storage.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    origain:"",
    newword:"",
    remewword:""
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
    if (!utils.CheckPassWord(this.data.newword, 1)) {
      wx.showToast({
        title: '密码必须为字母加数字且长度不小于6位',
        icon: 'none',
        duration: 2000
      }) 
      return
    }
    let obj={
      password: that.data.origain,
      newPas: that.data.newword
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
  }

})