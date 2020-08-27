const configDefault = require('../utils/config.default');

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);
const computedBehavior = require('miniprogram-computed')
Component({
  behaviors: [computedBehavior],
  /**
   * 外部样式类
   */
  externalClasses: ['header-row-class-name', 'row-class-name', 'cell-class-name'],

  /**
   * 组件样式隔离
   */
  options: {
    styleIsolation: "isolated",
    multipleSlots: true // 支持多个slot
  },

  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    },
    allData: {
      type: Object,
      value: []
    },
    headers: {
      type: Array,
      value: []
    },
    // table的高度, 溢出可滚动
    height: {
      type: String,
      value: 'auto'
    },
    width: {
      type: Number || String,
      value: '100%'
    },
    // 单元格的宽度
    tdWidth: {
      type:  Number || String,
      value: '100%'
    },
    // 固定表头 thead达到Header的位置时就应该被fixed了
    offsetTop: {
      type: Number,
      value: 150
    },
    // 是否带有纵向边框
    stripe: {
      type: Boolean,
      value: false
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      value: false
    },
    msg: {
      type: String,
      value: '暂无数据~'
    },
    totalSize: { // 总数据条数
      type: Number,
      value: 0
    },

    pages: { // 总数据页数
      type: Number,
      value: 0
    },
    size: {
        type: Number, // 每一页多少条数据
        value: 0
    }
  },
  computed: {
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    scrolWidth: '100%',
    current: 1,
    totalCost: [],
    allProp: []
  },

  /**
   * 组件的监听属性
   */
  observers: {
    // 在 numberA 或者 numberB 被设置时，执行这个函数
    'headers': function headers(_headers) {
      var reducer = function reducer(accumulator, currentValue) {
        return accumulator + Number(currentValue.width);
      };
      var scrolWidth = _headers.reduce(reducer, 0);

      this.setData({
        scrolWidth: scrolWidth,
        allProp: _headers
      });
     
    },
    'allData': function allData (_allData) {
      let allPropLen = this.data.allProp;
      for(let j in _allData){ 
          for (let i = 0; i < allPropLen.length; i++) {
            let str=j.split(')')[0].split('(')[1];
            if (allPropLen[i].prop == str) {
              allPropLen[i].allCost = _allData[j].toFixed(2)
            }else if (allPropLen[i].prop == "id" || allPropLen[i].prop == "date"
            || allPropLen[i].prop == "user" || (allPropLen[i].prop).indexOf("Remind") > -1) {
              allPropLen[i].allCost = "---"
            }else if ( allPropLen[i].prop == "sumCalc"){
              allPropLen[i].allCost = _allData["allCost"]
            } 
          }
        }
        this.setData({
          totalCost: allPropLen,
        })
    },
    'pages': function(newData, oldData) {},
    'size': function(newData, oldData) {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRowClick: function onRowClick(e) {
      // this.triggerEvent('rowClick', e, e.currentTarget.dataset.it);
     
    },
    onPrevious() {
      if (this.data.current - 1 > 0) {
          this.setData({
              current: this.data.current - 1
          });
          
      }
      this.triggerEvent('prev-click', { current: this.data.current, size: this.data.size }, { bubbles: true, composed: false  });
    },
    onNext() {
        if (this.data.current + 1 <= this.data.pages) {
            this.setData({
                current: this.data.current + 1
            });
        }
        this.triggerEvent('next-click', { current: this.data.current, size: this.data.size }, { bubbles: true, composed: false  });
    },
    onJump() {
        this.triggerEvent('current-change', { current: this.data.current, size: this.data.size }, { bubbles: true, composed: false  });
    },
    onSizeBlur(e) {
        this.triggerEvent('size-change', { size: parseInt(e.detail.value) }, { bubbles: true, composed: false  });
    } ,
    onCurrentBlur(e) {
        if (Number(e.detail.value) > 0 && Number(e.detail.value) <= this.data.pages) {
            this.setData({
                current: Number(e.detail.value)
            });
        } else {
            this.setData({
                current: 1
            });
        }
    },
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  getFlag: function getFlag() {
    return true;
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map