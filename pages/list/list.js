// pages/list/list.js  
const utils = require('../../utils/util.js')
const configs = require('../../utils/config.default.js')  
const F2 = require('@antv/wx-f2');
import {tableHeader2}  from './config.js'

var dataTest = [{
  date: '2017-06-05',
  value: 116
}, {
  date: '2017-06-06',
  value: 129
}, {
  date: '2017-06-07',
  value: 135
}, {
  date: '2017-06-08',
  value: 86
}, {
  date: '2017-06-09',
  value: 73
}, {
  date: '2017-06-10',
  value: 85
}, {
  date: '2017-06-11',
  value: 73
}, {
  date: '2017-06-12',
  value: 68
}, {
  date: '2017-06-13',
  value: 92
}, {
  date: '2017-06-14',
  value: 130
}, {
  date: '2017-06-15',
  value: 245
}, {
  date: '2017-06-16',
  value: 139
}, {
  date: '2017-06-17',
  value: 115
}, {
  date: '2017-06-18',
  value: 111
}, {
  date: '2017-06-19',
  value: 309
}, {
  date: '2017-06-20',
  value: 206
}, {
  date: '2017-06-21',
  value: 137
}, {
  date: '2017-06-22',
  value: 128
}, {
  date: '2017-06-23',
  value: 85
}, {
  date: '2017-06-24',
  value: 94
}, {
  date: '2017-06-25',
  value: 71
}, {
  date: '2017-06-26',
  value: 106
}, {
  date: '2017-06-27',
  value: 84
}, {
  date: '2017-06-28',
  value: 93
}, {
  date: '2017-06-29',
  value: 85
}, {
  date: '2017-06-30',
  value: 73
}, {
  date: '2017-07-01',
  value: 83
}, {
  date: '2017-07-02',
  value: 125
}, {
  date: '2017-07-03',
  value: 107
}, {
  date: '2017-07-04',
  value: 82
}, {
  date: '2017-07-05',
  value: 44
}, {
  date: '2017-07-06',
  value: 72
}, {
  date: '2017-07-07',
  value: 106
}, {
  date: '2017-07-08',
  value: 107
}, {
  date: '2017-07-09',
  value: 66
}, {
  date: '2017-07-10',
  value: 91
}, {
  date: '2017-07-11',
  value: 92
}, {
  date: '2017-07-12',
  value: 113
}, {
  date: '2017-07-13',
  value: 107
}, {
  date: '2017-07-14',
  value: 131
}, {
  date: '2017-07-15',
  value: 111
}, {
  date: '2017-07-16',
  value: 64
}, {
  date: '2017-07-17',
  value: 69
}, {
  date: '2017-07-18',
  value: 88
}, {
  date: '2017-07-19',
  value: 77
}, {
  date: '2017-07-20',
  value: 83
}, {
  date: '2017-07-21',
  value: 111
}, {
  date: '2017-07-22',
  value: 57
}, {
  date: '2017-07-23',
  value: 55
}, {
  date: '2017-07-24',
  value: 60
}]
let chart = null;
Component({ 
  /**
   * 组件的属性列表
   */
  properties: {

  },
  computed: {
     
  },
  /**
   * 组件的初始数据
   */
  data: {
    loading: false,
    idShow: true,
    total: 0,
    currentPage: 1,
    pageSize: 10,
    tableData: [],
    objectData: [],
    allCostData: [],
    detailId: 0, // 详情ID
    filters: { // 搜索表单
      number: ''
    },
    chartColumn: null,
    chartBar: null,
    dateArr: [],
    costArr: [],
    costTypeSumArr: [],
    opts: {
      lazyLoad: true // 延迟加载组件
    },
    month: '',
    user_name: '', 
    tableHeader2,
    stripe: true,
    border: true,
    outBorder: true,
    height: '300px',
    row: [],
    msg: '没有打卡记录哦～'
  },

  /**
   * 组件的方法列表
   */
  methods: {
     onLoad(){
       let _this = this;
       //  _this.initLineChart(dataTest)
      this.funcGetListData()
     },
     funcGetListData() {
      let that = this;
      wx.request({
        url: `${configs.api + '/getAllSpending'}`,
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': wx.getStorageSync("sessionid")
          //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
        },
        method: 'POST',
        dataType: "json",
        success: function (res) {
          let data=res.data
          if(1 === data.code){
            if(data.data.length>0){
              that.setData({
                dateArr:[],
                costArr:[],
                costTypeSumArr:[],
                objectData:  data.data,
                total: data.data.length
              }) 
              that.data.objectData.sort(function(a,b) {
                return Date.parse((utils.formatDate(new Date(b.date), "yyyy-MM-dd")).replace(/-/g,"/"))-Date.parse((utils.formatDate(new Date(a.date), "yyyy-MM-dd")).replace(/-/g,"/"));
              });
              var breakfastSum = 0, lunchSum = 0, dinnerSum = 0, eatSum = 0, trafficSum = 0, sockSum = 0,
                  clothesSum = 0, playSum = 0, othersSum = 0, giftsSum = 0, buySum = 0, foodsSum = 0, visaSum = 0, loansSum = 0, skinSum = 0, healthSum = 0, insureSum = 0, houseSum = 0;
              that.data.objectData.forEach((item, index) => {
                item["idIndex"] = index+1;
                that.data.objectData[index].date = utils.formatDate(new Date(that.data.objectData[index].date), "yyyy-MM-dd");
                that.data.objectData[index].sumCalc = (parseFloat(item.breakfast)+parseFloat(item.lunch)+parseFloat(item.dinner)+
                  parseFloat(item.traffic)+parseFloat(item.sock)+parseFloat(item.clothes)+
                  parseFloat(item.play)+parseFloat(item.others)+parseFloat(item.gifts)+
                  parseFloat(item.buy)+parseFloat(item.foods)+parseFloat(item.loans)+parseFloat(item.skin)+parseFloat(item.health)+parseFloat(item.insure)).toFixed(2);
                breakfastSum = parseFloat(item.breakfast)+breakfastSum;
                lunchSum = parseFloat(item.lunch)+lunchSum;
                dinnerSum = parseFloat(item.dinner)+dinnerSum;
                trafficSum = parseFloat(item.traffic)+trafficSum;
                sockSum = parseFloat(item.sock)+sockSum;
                clothesSum = parseFloat(item.clothes)+clothesSum;
                playSum = parseFloat(item.play)+playSum;
                othersSum = parseFloat(item.others)+othersSum;
                giftsSum = parseFloat(item.gifts)+giftsSum;
                buySum = parseFloat(item.buy)+buySum;
                foodsSum = parseFloat(item.foods)+foodsSum;
                visaSum = parseFloat(item.visa)+visaSum;
                loansSum = parseFloat(item.loans)+loansSum;
                skinSum = parseFloat(item.skin)+skinSum;
                healthSum = parseFloat(item.health)+healthSum;
                insureSum = parseFloat(item.insure)+insureSum;
                houseSum = parseFloat(item.house)+houseSum;
                that.data.dateArr.push(utils.formatDate(new Date(item.date), "yyyy-MM-dd"));
                that.data.costArr.push({"value":parseFloat(that.data.objectData[index].sumCalc),"date":utils.formatDate(new Date(item.date), "yyyy-MM-dd")});

              });
              that.data.costTypeSumArr.push(
                {"value": parseFloat(breakfastSum.toFixed(2)), "name": "早餐", "const": "const"},
                {"value": parseFloat(lunchSum.toFixed(2)), "name": "午餐", "const": "const"},
                {"value": parseFloat(dinnerSum.toFixed(2)), "name": "晚餐", "const": "const"},
                {"value": parseFloat((breakfastSum+lunchSum+dinnerSum).toFixed(2)),"name":"餐飲", "const": "const"},
                {"value": parseFloat(trafficSum.toFixed(2)), "name": "交通", "const": "const"},
                {"value": parseFloat(sockSum.toFixed(2)), "name": "零食", "const": "const"},
                {"value": parseFloat(buySum.toFixed(2)), "name": "购物", "const": "const"},
                {"value": parseFloat(foodsSum.toFixed(2)), "name": "食材超市", "const": "const"},
                {"value": parseFloat(visaSum.toFixed(2)), "name": "信用花呗", "const": "const"},
                {"value": parseFloat(loansSum.toFixed(2)), "name": "贷款", "const": "const"},
                {"value": parseFloat(clothesSum.toFixed(2)), "name": "服装", "const": "const"},
                {"value": parseFloat(skinSum.toFixed(2)), "name": "化妆品", "const": "const"},
                {"value": parseFloat(healthSum.toFixed(2)), "name": "医疗", "const": "const"},
                {"value": parseFloat(insureSum.toFixed(2)), "name": "保险", "const": "const"},
                {"value": parseFloat(playSum.toFixed(2)), "name": "娱乐", "const": "const"},
                {"value": parseFloat(othersSum.toFixed(2)), "name": "其他", "const": "const"},
                {"value": parseFloat(giftsSum.toFixed(2)), "name": "人情", "const": "const"},
                {"value": parseFloat(houseSum.toFixed(2)), "name": "房租", "const": "const"}
              );
              
              that.setData({
                allCostData: that.data.objectData,
                tableData: that.pagination(1,10,that.data.objectData)
              })
              that.data.dateArr.reverse();
              that.data.costArr.reverse(); 
              // console.log(that.data.tableData)
              // console.log(that.data.dateArr)
              // console.log(that.data.costTypeSumArr)
              that.setData({
                row: that.data.tableData
              })
              that.initLineChart(that.data.costArr, that.data.dateArr)
              that.initBarChart(that.data.costArr, that.data.dateArr)
              that.initPieChart(that.data.costTypeSumArr)
            }else{

            }
          }
        }
      })
    },
    pagination(pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
    },
    formatNumber(n) {
      var num = String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return num;
    },
    initLineChart(lineData, dateData) {
      let _this = this;
      // var originDates = dateData.slice(dateData.length-5, dateData.length);
      var originDates = [];
      dateData.forEach(obj => {
        if (obj >= '2020-08-01') {
          originDates.push(obj);
        }
      }); 
      _this.chartComponent = _this.selectComponent('#lineChart');
      _this.chartComponent.init((canvas, width, height)=>{
        chart = new F2.Chart({
          el: canvas,
          width,
          height,
          animate: false
        });
        chart.source(lineData, {
          date: {
            type: 'timeCat',
            tickCount: 8,
            values: originDates,
            mask: 'MM-DD'
          },
          value: {
            tickCount: 5,  
          }
        });
        chart.tooltip({
          showCrosshairs: true,
          showItemMarker: false,
          background: {
            radius: 2,
            fill: '#1890FF',
            padding: [3, 5]
          },
          onShow(ev) {
            const items = ev.items;
            items[0].name = '';
            items[0].value = items[0].value;
          }
        });
        chart.axis('date', {
          tickLine: {
            length: 4,
            stroke: '#cacaca'
          },
          label: {
            fill: '#cacaca'
          },
          line: {
            top: true
          }
        });
        chart.axis('value', {
          position: 'left',
          label(text) {
            // console.log(text)
            return {
              text: _this.formatNumber(text * 1),
              fill: '#cacaca'
            };
          },
          grid: {
            stroke: '#d1d1d1'
          }
        });
        chart.line().position('date*value').shape('smooth').style({
          radius: [ 2, 2, 0, 0 ]
        });
        // chart.point()
        //   .position('date*value')
        //   .style({
        //     lineWidth: 1,
        //     stroke: '#fff'
        //   });
      // 定义进度条
      chart.scrollBar({
        mode: 'x',
        xStyle: {
          offsetY: -10
        }
      });
        chart.interaction('pan');
        
        
      
        // // 绘制 tag
        // chart.guide().tag({
        //   position: [ lineData[10].date, lineData[10].value ],
        //   withPoint: false,
        //   content:  lineData[10].value,
        //   limitInPlot: true,
        //   offsetX: 5,
        //   direct: 'cr'
        // });
        chart.render();
        return chart;
      })
    },
    initBarChart(barData, dateData) {
      let _this = this;
      // var originDates = dateData.slice(dateData.length-5, dateData.length);
      var originDates = [];
      dateData.forEach(obj => {
        if (obj >= '2020-08-01') {
          originDates.push(obj);
        }
      }); 
      _this.chartComponent = _this.selectComponent('#barChart');
      _this.chartComponent.init((canvas, width, height)=>{
        chart = new F2.Chart({
          el: canvas,
          width,
          height,
          animate: false
        });
        chart.source(barData, {
          date: {
            type: 'timeCat',
            tickCount: 8,
            values: originDates,
            mask: 'MM-DD'
          },
          value: {
            tickCount: 15,  
          }
        });
        chart.tooltip({
          showCrosshairs: true,
          showItemMarker: false,
          background: {
            radius: 2,
            fill: '#1890FF',
            padding: [3, 5]
          },
          onShow(ev) {
            const items = ev.items;
            items[0].name = '';
            items[0].value = items[0].value;
          }
        });
        chart.axis('date', {
          tickLine: {
            length: 4,
            stroke: '#cacaca'
          },
          label: {
            fill: '#cacaca'
          },
          line: {
            top: true
          }
        });
        chart.axis('value', {
          position: 'left',
          label(text) {
            return {
              text: _this.formatNumber(text * 1),
              fill: '#cacaca'
            };
          },
          grid: {
            stroke: '#d1d1d1'
          }
        });
        chart.interval().position('date*value').shape('smooth').style({
          radius: [ 2, 2, 0, 0 ]
        });
        // chart.point()
        //   .position('date*value')
        //   .style({
        //     lineWidth: 1,
        //     stroke: '#fff'
        //   });
      // 定义进度条
      chart.scrollBar({
        mode: 'x',
        xStyle: {
          offsetY: -10
        }
      });
        chart.interaction('pan');
        
        
      
        // // 绘制 tag
        // chart.guide().tag({
        //   position: [ lineData[10].date, lineData[10].value ],
        //   withPoint: false,
        //   content:  lineData[10].value,
        //   limitInPlot: true,
        //   offsetX: 5,
        //   direct: 'cr'
        // });
        chart.render();
        return chart;
      })
    },
    initPieChart(pieData) {
      let _this = this;
      _this.chartComponent = _this.selectComponent('#pieChart');
      _this.chartComponent.init((canvas, width, height)=>{
        chart = new F2.Chart({
          el: canvas,
          width,
          height
        });
        chart.source(pieData, {
           
        });
        chart.legend({
          position: 'bottom',
          align: 'center'
        });
        chart.tooltip(false);
        chart.coord('polar', {
          transposed: true,
          radius: 0.85
        });
        chart.axis(false);
        chart.pieLabel({
          sidePadding: 2,
          label1: function label1(data, color) {
            return {
              text: data.name,
              fill: color
            };
          },
          label2: function label2(data) {
            return {
              text: '￥' + String(Math.floor(data.value * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              fill: '#808080',
              fontWeight: 'bold',
              fontSize: '10'
            };
          }
        });
        chart.interval()
          .position('const*value')
          .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0',
                        '#decdc3', '#ffaa71', '#776d8a', '#8fc0a9', '#197163', '#56556e',
                        '#ffa36c', '#00b7c2', '#e97171', '#93b5e1', '#e94560', '#8543E0'])
          .adjust('stack')
          .style({
            lineWidth: 1,
            stroke: '#fff',
            lineJoin: 'round',
            lineCap: 'round'
          })
          .animate({
            appear: {
              duration: 1200,
              easing: 'bounceOut'
            }
          }); 
        chart.render();
        return chart;
      })
    }
  }
})
