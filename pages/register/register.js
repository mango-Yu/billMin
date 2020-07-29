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
    loadCaptcha: false,
    gt:'',
    challenge:'',
    offline:'',
    result:'',
    styleConfig: {
      btnWidth: '100%'// minwidth: 210px, maxwidth:320px
    },
    toReset: false
    // imgsArr: [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoadGeet(){
      var that = this;
      wx.request({
        url:  `${config.api + '/geetRegister?t=' +  (new Date()).getTime()}`,
        type: "get",
        dataType: "json",
        success: function (res) {
          console.log(res);
          that.setData({ loadCaptcha:true,gt: res.data.gt, challenge: res.data.challenge, offline: !res.data.success})
          console.log(that.data)
        }
      })
    },
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
    },
    captchaSuccess:function(result){
      console.log("captcha-Success!");
      this.setData({
        result: result.detail
      })
      let that = this;
      
      // 获取验证码请求
      var obj = {"phoneNum": that.data.phoneNum};
      wx.request({
        url: `${config.api + '/msg'}`,
        data: obj,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (data) {
          let object = data.data;
          console.log(data)
          console.log(data.data.SendStatusSet)
          data = data.data.SendStatusSet[0];
          if (data.Code == "Ok") {
            wx.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 2000
            })
            that.time = 60;
            that.timer();
            that.sessionId = object.sessionId;
          } else {
            wx.showToast({
              title: data.Message,
              icon: 'none',
              duration: 2000
            })
            that.setData({ loadCaptcha: false })
            that.btnReset();
          }
        },
        fail: function(error){
          console.log(error)
          wx.showToast({
            title: '发送失败失败',
            icon: 'none',
            duration: 2000
          })
          that.setData({ loadCaptcha: false })
          that.btnReset();
        }
      })
    },
    captchaError:function(e){
      console.log('captcha-Error!', e.detail)
      if (e.detail.code === 21) {
        var that = this
        // 需要先将插件销毁
        that.setData({ loadCaptcha: false })
        // 重新调用api1
        that.btnReset();
      }
    },
    btnReset() {
      this.setData({
        toReset: true
     })
    },
    btnSubmit(){
      var that = this;
      var data = that.data.result; // 获取完成验证码时存储的验证结果
      if(typeof data !== 'object'){
        console.log("请先完成验证！")
        return 
      }
      // 将结果提交给用户服务端进行二次验证
      wx.request({
        url: "API2接口（详见服务端部署）",
        method: 'POST',
        dataType: 'json',
        data: {
          geetest_challenge: data.geetest_challenge,
          geetest_validate: data.geetest_validate,
          geetest_seccode: data.geetest_seccode
        },
        success: function (res) {
          wx.showToast({
            title: res.data.status
          })
        },
        fail: function () {
          console.log('error')
        }
      })
    },
    timer() {
      let that = this;
      if (that.time > 0) {
        that.time--;
        that.setData({
          btnContent: that.time + "s后重新获取"
        })
        that.setData({
          disabled: true
        })
        var timers = setTimeout(that.timer.bind(that), 1000);
      } else if (that.time == 0) {
        that.setData({
          btnContent: "获取验证码"
        })
        clearTimeout(timers);
        that.setData({
          disabled: false
        })
      }
    },
    sendSmsCode() {
      let that = this;
      var reg = 11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/;//手机号正则验证
      var phoneNum = that.data.phoneNum;
      if (!phoneNum) {//未输入手机号
        wx.showToast({
          title: '请输入手机号码',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (!reg.test(phoneNum)) {//手机号不合法
        wx.showToast({
          title: '您输入的手机号码不合法，请重新输入',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      this.onLoadGeet();
    },
    onRegister() {
      var that = this;
      if (this.data.name == '') {
        wx.showToast({
          title: '请输入用户名',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!that.CheckPassWord(this.data.name, 0)) {
        wx.showToast({
          title: '用户名需为字母加数字且长度不大于6位',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.data.password == '') {
        wx.showToast({
          title: '请输入密码',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!that.CheckPassWord(this.data.password, 1)) {
        wx.showToast({
          title: '密码需为字母加数字且长度不小于6位',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.data.password != this.data.repPassword) {
        wx.showToast({
          title: '重复密码与密码不一致',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.data.phoneNum == '') {
        wx.showToast({
          title: '请输入手机号码',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.data.verifyNum == '') {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000
        })
        return
      }
      var data = that.data.result; // 获取完成验证码时存储的验证结果
      if(typeof data !== 'object'){
        console.log("请先完成验证！")
        return 
      }
      let obj = {
        name: this.data.name,
        password: this.data.password,
        phoneNum: this.data.phoneNum,
        verifyNum: this.data.verifyNum,
        sessionId: this.sessionId,
        geetest_challenge: data.geetest_challenge,
        geetest_validate: data.geetest_validate,
        geetest_seccode: data.geetest_seccode
      }
      wx.request({
        url: `${config.api + '/validateRegister'}`,
        data: obj,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (data) {
          if (data.res) {
            var res = data.res;
            if (res.code == 1) {
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }else{
            if (data.result == "fail") {
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
          
        },
        fail: function (res) {
          console.log(res);
          wx.showToast({
            title: '注册失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
})
