// pages/register/register.js
const config = require('../../utils/config.default.js')
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
    password: '',
    repPassword: "",
    phoneNum: "", //手机号
    verifyNum: "", //验证码
    sessionId: '',//sessionId
    btnContent: "获取验证码", //获取验证码按钮内文字
    time: 0, //发送验证码间隔时间
    disabled: false, //按钮状态
    verifyImg: false,
    // imgsArr: [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11]

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
      this.setData({
        password: event.detail
      })
    },
    onChangeRePwd(event) {
      this.setData({
        repPassword: event.detail
      })
    },
    onChangePhone(event) {
      this.setData({
        phoneNum: event.detail
      })
    },
    onChangeCode(event) {
      this.setData({
        verifyNum: event.detail
      })
    },
    sendSmsCode() {
      console.log(11)
    },
    onRegister() {
      var that = this;
      if (this.data.name == '') {
        wx.showToast({
          title: '请输入用户名',
          image: '../../images/fail.png',
          duration: 2000
        })
        return
      }
      if (!that.CheckPassWord(this.data.name, 0)) {
        wx.showToast({
          title: '用户名需为字母加数字且长度不大于6位',
          image: '../../images/fail.png',
          duration: 2000
        })
        return
      }
      if (this.data.password == '') {
        wx.showToast({
          title: '请输入密码',
          image: '../../images/fail.png',
          duration: 2000
        })
        return
      }
      if (!that.CheckPassWord(this.data.password, 1)) {
        wx.showToast({
          title: '密码需为字母加数字且长度不小于6位',
          image: '../../images/fail.png',
          duration: 2000
        })
        return
      }
      if (this.data.password != this.data.repPassword) {
        wx.showToast({
          title: '重复密码与密码不一致',
          image: '../../images/fail.png',
          duration: 2000
        })
        return
      }
      if (this.data.phoneNum == '') {
        wx.showToast({
          title: '请输入手机号码',
          image: '../../images/fail.png',
          duration: 2000
        })
        return
      }
      if (this.data.verifyNum == '') {
        wx.showToast({
          title: '请输入验证码',
          image: '../../images/fail.png',
          duration: 2000
        })
        return
      }
      wx.showToast({
        title: 'Loading',
        icon: 'loading',
        duration: 2000
      })
      let obj = {
        name: this.data.name,
        password: this.data.password,
        phoneNum: this.data.phoneNum,
        verifyNum: this.data.verifyNum,
        sessionId: this.sessionId
      }
      wx.request({
        url: `${config.api + '/register'}`,
        data: obj,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          res = data.res
          if (res.code == 1) {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: data.msg,
              image: '../../images/fail.png',
              duration: 2000
            })
          }
        },
        fail: function (res) {
          console.log(res);
          wx.showToast({
            title: '注册失败',
            image: '../../images/fail.png',
            duration: 2000
          })
        }
      })
    },
    CheckPassWord(password, type) {//必须为字母加数字且长度不小于6位
      var str = password;
      if (str != null) {
        if (str.length > 6 && type === 0) {
          return false;
        } else if (str.length < 6 && type === 1) {
          return false;
        }
      } else {
        return false;
      }
      var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
      if (!reg1.test(str)) {
        return false;
      }
      var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
      if (reg.test(str)) {
        return true;
      } else {
        return false;
      }
    }
  }
})
