// pages/list/list.js  
const utils = require('../../utils/util.js')
const configs = require('../../utils/config.default.js')  
const F2 = require('@antv/wx-f2');

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
    }
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
                return Date.parse((utils.formatTime(new Date(b.date), "yyyy-MM-dd")).replace(/-/g,"/"))-Date.parse((utils.formatTime(new Date(a.date), "yyyy-MM-dd")).replace(/-/g,"/"));
              });
              var breakfastSum = 0, lunchSum = 0, dinnerSum = 0, eatSum = 0, trafficSum = 0, sockSum = 0,
                  clothesSum = 0, playSum = 0, othersSum = 0, giftsSum = 0, buySum = 0, foodsSum = 0, visaSum = 0, loansSum = 0, skinSum = 0, healthSum = 0, insureSum = 0, houseSum = 0;
              that.data.objectData.forEach((item, index) => {
                item["idIndex"] = index+1;
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
                that.data.dateArr.push(utils.formatTime(new Date(item.date), "yyyy-MM-dd"));
                that.data.costArr.push({"value":parseFloat(that.data.objectData[index].sumCalc),"date":utils.formatTime(new Date(item.date), "yyyy-MM-dd")});

              });
              that.data.costTypeSumArr.push(
                {"value": breakfastSum.toFixed(2), "name": "早餐"},
                {"value": lunchSum.toFixed(2), "name": "午餐"},
                {"value": dinnerSum.toFixed(2), "name": "晚餐"},
                {"value": (breakfastSum+lunchSum+dinnerSum).toFixed(2),"name":"餐飲"},
                {"value": trafficSum.toFixed(2), "name": "交通"},
                {"value": sockSum.toFixed(2), "name": "零食"},
                {"value": buySum.toFixed(2), "name": "购物"},
                {"value": foodsSum.toFixed(2), "name": "食材超市"},
                {"value": visaSum.toFixed(2), "name": "信用花呗"},
                {"value": loansSum.toFixed(2), "name": "贷款"},
                {"value": clothesSum.toFixed(2), "name": "服装"},
                {"value": skinSum.toFixed(2), "name": "化妆品"},
                {"value": healthSum.toFixed(2), "name": "医疗"},
                {"value": insureSum.toFixed(2), "name": "保险"},
                {"value": playSum.toFixed(2), "name": "娱乐"},
                {"value": othersSum.toFixed(2), "name": "其他"},
                {"value": giftsSum.toFixed(2), "name": "人情"},
                {"value": houseSum.toFixed(2), "name": "房租"},
              );
              that.setData({
                tableData: that.pagination(1,10,that.data.objectData)
              })
              that.data.dateArr.reverse();
              that.data.costArr.reverse(); 
              // console.log(that.data.tableData)
              // console.log(that.data.dateArr)
              // console.log(that.data.costArr)
              that.initLineChart(that.data.costArr, that.data.dateArr)
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
      _this.chartComponent = _this.selectComponent('#column-dom');
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
            tickCount: 10,
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
            console.log(text)
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
    }
  }
})
