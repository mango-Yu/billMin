// components/compute/index.js
let keyValur = '' ;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    computeMoney:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenData:"0",
    operaSymbo:{"+":"+","-":"-","×":"*","÷":"/",".":"."},
    lastIsOperaSymbo:false,
    arr:[],
    logs:[],
    idb:"back",
    idc:"clear",
    idt:"toggle",
    idadd:"+",
    id9:"9",
    id8:"8",
    id7:"7",
    idj:"－",
    id6:"6",
    id5:"5",
    id4:"4",
    idx:"×",
    id3:"3",
    id2:"2",
    id1:"1",
    iddiv:"÷",
    id0:"0",
    idd:".",
    ide:"＝",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //处理按键
    _handleKeyPress(e) {
      let num = e.target.dataset.num;
      //不同按键处理逻辑
      // -1 代表无效按键，直接返回
      if (num == -1) return false;
      switch (String(num)) {
        //小数点
        // case '.':
        //   this._handleDecimalPoint();
        //   break;
        //删除键
        case 'D':
          this._handleDeleteKey();
          break;
        //清空键
        case 'C':
          this._handleClearKey();
          break;
        //确认键
        case 'S':
          this._handleConfirmKey();
          break;
        // //加号键
        // case '+':
        //   this._handleAddSumKey(num);
        //   break;

        default:
          this._handleNumberKey(num);
          break;
      }
    },
    //处理删除键
    _handleDeleteKey() {
      var data = this.data.screenData;
      if(data == "0"){
          return;
      }
      data = data.substring(0,data.length-1);
      if(data == "" || data == "－"){
          data = 0;
      }
      this.setData({"screenData":data});
      this.data.arr.pop();
      this.triggerEvent('handle-Key-Press', { money: this.data.screenData, keyboard: true }, { bubbles: true, composed: false  });
    },
    //处理清空键
    _handleClearKey() {
      this.setData({"screenData":"0"});
      this.data.arr.length = 0;
      this.triggerEvent('handle-Key-Press', { money: this.data.screenData, keyboard: true }, { bubbles: true, composed: false  });
    },
    //处理数字
    _handleNumberKey(id) {
      if(this.data.operaSymbo[id]){ //如果是符号+-*/
        if(this.data.lastIsOperaSymbo || this.data.screenData == "0"){
          return;
        }
      }
      var sd = this.data.screenData;
      var data;
      if(sd == 0){
        data = id;
      }else{
        data = sd + id;
      }
      if (data.indexOf('+') > 0 || data.indexOf('.') > 0) {
        let str = data.split("+");
        for(let i =0;i<str.length;i++){
          let index = str[i].indexOf('.');
          let strLen = str[i].substring(index, str[i].length)
          if ( strLen.length > 3 && str[i].indexOf('.') > 0  && str[i].indexOf('+') < 0){
            wx.showToast({
              title: '请保留两位小数',
              icon: 'success',
              duration: 2000
            })
            return;
          }
        }
      }
      this.setData({"screenData":data});
      this.data.arr.push(id);

      if(this.data.operaSymbo[id]){
        this.setData({"lastIsOperaSymbo":true});
      }else{
        this.setData({"lastIsOperaSymbo":false});
      }
      this.triggerEvent('handle-Key-Press', { money: this.data.screenData, keyboard: true }, { bubbles: true, composed: false  });
    },
    //+-
    _handleAddSumKey(){
      var data = this.data.screenData;
      if(data == "0"){
          return;
      }
      var firstWord = data.charAt(0);
      if(data == "－"){
        data = data.substr(1);
        this.data.arr.shift();
      }else{
        data = "－" + data;
        this.data.arr.unshift("－");
      }
      this.setData({"screenData":data});
    },
    //提交
    _handleConfirmKey() {
      var data = this.data.screenData;
      if(data == "0"){
          this.triggerEvent('handle-Key-Press', { money: this.data.screenData, keyboard: false }, { bubbles: true, composed: false  });
          return;
      }
      //eval是js中window的一个方法，而微信页面的脚本逻辑在是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能再脚本中使用window，也无法在脚本中操作组件                 
      //var result = eval(newData);
      var lastWord = data.charAt(data.length);
      if(isNaN(lastWord)){
        return;
      }
      var num = "";
      var lastOperator = "";
      var arr = this.data.arr;
      var optarr = [];
      for(var i in arr){
        if(isNaN(arr[i]) == false || arr[i] == this.data.idd || arr[i] == this.data.idt){
          num += arr[i];
        }else{
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      var result = Number(optarr[0])*1.0;
      // console.log(result);
      for(var i=1; i<optarr.length; i++){
        if(isNaN(optarr[i])){
            if(optarr[1] == this.data.idadd){
                result += Number(optarr[i + 1]);
            }else if(optarr[1] == this.data.idj){
                result -= Number(optarr[i + 1]);
            }else if(optarr[1] == this.data.idx){
                result *= Number(optarr[i + 1]);
            }else if(optarr[1] == this.data.iddiv){
                result /= Number(optarr[i + 1]);
            }
        }
      }
      this.data.arr.length = 0;
      this.data.arr.push(result);
      this.setData({"screenData":parseFloat(result).toFixed(2)+""});
      this.triggerEvent('handle-Key-Press', { money: this.data.screenData, keyboard: false }, { bubbles: true, composed: false  });
    }
  },
  observers:{
    "computeMoney": function computeMoney(_computeMoney){
      this.setData({
        screenData: _computeMoney.money
      })
      if (keyValur != _computeMoney.key) {
        keyValur = _computeMoney.key;
        this.data.arr.length = 0;
      }
      if (_computeMoney.money == "0") {
        this.data.arr.length = 0;
      }else{
        let html = '';
        for(let i = 0;i<this.data.arr.length;i++) {
           html += this.data.arr[i];
        }
        if (html == _computeMoney.money){
          return;
        }else{
          this.data.arr.push(_computeMoney.money);
        }
      }
      this.triggerEvent('handle-Key-Press', { money: this.data.screenData, keyboard: true }, { bubbles: true, composed: false  });
    }
  }
})
