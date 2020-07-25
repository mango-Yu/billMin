// pages/login/login.js
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
    value: '',
    password: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 为当前输入的值
      console.log(event.detail);
    },
  }
})
