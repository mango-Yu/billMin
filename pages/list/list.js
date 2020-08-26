// pages/list/list.js  
const utils = require('../../utils/util.js')
const configs = require('../../utils/config.default.js')
const F2 = require('@antv/wx-f2');
import {
  tableHeader2
} from './config.js'
import storage from '../../utils/storage.js'

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
    totalPage: 0,
    tableData: [],
    objectData: [],
    allCostData: [],
    chartColumn: null,
    chartBar: null,
    dateArr: [],
    costArr: [],
    costTypeSumArr: [],
    opts: {
      lazyLoad: true // 延迟加载组件
    },
    tableHeader2,
    stripe: true,
    border: true,
    outBorder: true,
    // height: '475px',
    row: [],
    msg: '没有打卡记录哦～',
    form: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      traffic: 0,
      sock: 0,
      clothes: 0,
      play: 0,
      others: 0,
      buy: 0,
      gifts: 0,
      loans: 0,
      visa: 0,
      foods: 0,
      skin: 0,
      health: 0,
      insure: 0,
      house: 0,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      let _this = this;
      //  _this.initLineChart(dataTest)
      this.funcGetListData(this.data.currentPage-1,this.data.pageSize)
      this.funcGetSumData()
    },
    funcGetListData(start, pageSize) {
      let that = this;
      wx.request({
        url: `${configs.api + '/getAllSpending'}`,
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': storage.get("sessionid")
          //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
        },
        method: 'POST',
        data: {
          start: start * pageSize,
          pageSize: pageSize
        },
        dataType: "json",
        success: function (res) {
          let data = res.data;
          if (1 === data.code) {
            if (data.data.dataList.length > 0) {
              that.setData({
                tableData: data.data.dataList,
                total: data.data.total,
                totalPage: Math.ceil(data.data.total / that.data.pageSize)
              })
              that.data.tableData.sort(function (a, b) {
                return Date.parse((utils.formatDate(new Date(b.date), "yyyy-MM-dd")).replace(/-/g, "/")) - Date.parse((utils.formatDate(new Date(a.date), "yyyy-MM-dd")).replace(/-/g, "/"));
              });
              that.data.tableData.forEach((item, index) => {
                item["idIndex"] = (index + 1) + start * pageSize;
                that.data.tableData[index].date = utils.formatDate(new Date(that.data.tableData[index].date), "yyyy-MM-dd");
                that.data.tableData[index].sumCalc = (parseFloat(item.breakfast) + parseFloat(item.lunch) + parseFloat(item.dinner) +
                  parseFloat(item.traffic) + parseFloat(item.sock) + parseFloat(item.clothes) +
                  parseFloat(item.play) + parseFloat(item.others) + parseFloat(item.gifts) +
                  parseFloat(item.buy) + parseFloat(item.foods) + parseFloat(item.loans) + parseFloat(item.skin) + parseFloat(item.health) + parseFloat(item.insure)).toFixed(2);
              });
              that.setData({
                row: that.data.tableData
              })
            } else {

            }
          }
        }
      })
    },
    funcGetSumData() {
      let that = this;
      wx.request({
        url: `${configs.api + '/getSumByUser'}`,
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': storage.get("sessionid")
          //读取sessionid,当作cookie传入后台将PHPSESSID做session_id使用
        },
        method: 'POST',
        dataType: "json",
        success: function (res) {
          let data = res.data.data
          if (res.data.code === 1) {
            let objData = data.allCostSumList[0];
            if (objData) {
              objData.allCost = 0;
              for (let i in objData) {
                if (objData[i] == null) {
                  let str = i.split(')')[0].split('(')[1]
                  that.data.form[str] = 0
                  that.data.form.allCost = 0;
                  that.setData({
                    form: that.data.form
                  });
                } else {
                  let str = i.split(')')[0].split('(')[1];
                  that.data.form[str] = parseFloat(objData[i]).toFixed(2);
                  if (str === "visa" || str === "house") {
                    objData.allCost += 0;
                  } else {
                    objData.allCost += parseFloat(objData[i]);
                  }
                  that.setData({
                    form: that.data.form
                  });
                }
              }
              objData.allCost = (objData.allCost).toFixed(2);
              that.setData({
                allCostData: objData,
                costTypeSumArr: []
              })
              that.data.costTypeSumArr.push({
                "value": parseFloat(that.data.form.breakfast),
                "name": "早餐",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.lunch),
                "name": "午餐",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.dinner),
                "name": "晚餐",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.breakfast + that.data.form.lunch + that.data.form.dinner),
                "name": "餐飲",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.traffic),
                "name": "交通",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.sock),
                "name": "零食",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.buy),
                "name": "购物",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.foods),
                "name": "食材超市",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.visa),
                "name": "信用花呗",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.loans),
                "name": "贷款",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.clothes),
                "name": "服装",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.skin),
                "name": "化妆品",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.health),
                "name": "医疗",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.insure),
                "name": "保险",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.play),
                "name": "娱乐",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.others),
                "name": "其他",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.gifts),
                "name": "人情",
                "const": "const"
              }, {
                "value": parseFloat(that.data.form.house),
                "name": "房租",
                "const": "const"
              });
              that.initPieChart(that.data.costTypeSumArr)
            }
            if (data.allCostDataList.length > 0) {
              that.setData({
                dateArr: [],
                costArr: [],
                objectData: data.allCostDataList
              })
              that.data.objectData.sort(function (a, b) {
                return Date.parse((utils.formatDate(new Date(b.date), "yyyy-MM-dd")).replace(/-/g, "/")) - Date.parse((utils.formatDate(new Date(a.date), "yyyy-MM-dd")).replace(/-/g, "/"));
              });
              that.data.objectData.forEach((item, index) => {
                item["idIndex"] = index + 1;
                that.data.objectData[index].date = utils.formatDate(new Date(that.data.objectData[index].date), "yyyy-MM-dd");
                that.data.objectData[index].sumCalc = (parseFloat(item.breakfast) + parseFloat(item.lunch) + parseFloat(item.dinner) +
                  parseFloat(item.traffic) + parseFloat(item.sock) + parseFloat(item.clothes) +
                  parseFloat(item.play) + parseFloat(item.others) + parseFloat(item.gifts) +
                  parseFloat(item.buy) + parseFloat(item.foods) + parseFloat(item.loans) + parseFloat(item.skin) + parseFloat(item.health) + parseFloat(item.insure)).toFixed(2);
                that.data.dateArr.push(utils.formatDate(new Date(item.date), "yyyy-MM-dd"));
                that.data.costArr.push({
                  "value": parseFloat(that.data.objectData[index].sumCalc),
                  "date": utils.formatDate(new Date(item.date), "yyyy-MM-dd")
                });
              });
              that.initLineChart(that.data.costArr, that.data.dateArr)
              that.initBarChart(that.data.costArr, that.data.dateArr)
            }
          } else {

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
      _this.chartComponent.init((canvas, width, height) => {
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
          radius: [2, 2, 0, 0]
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
      _this.chartComponent.init((canvas, width, height) => {
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
          radius: [2, 2, 0, 0]
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
      _this.chartComponent.init((canvas, width, height) => {
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
            '#ffa36c', '#00b7c2', '#e97171', '#93b5e1', '#e94560', '#8543E0'
          ])
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
    },
    // 选择每页显示条数
    handleSizeChange(e){
      let that = this;
      that.funcGetListData(0, e.detail.size);
    },
    handleCurrentChange(e) {
      let that = this;
      that.funcGetListData(e.detail.current-1, e.detail.size);
    },
    handlePrevChange(e) {
      let that = this;
      that.funcGetListData(e.detail.current-1, e.detail.size);
    },
    handleNextChange(e) {
      let that = this;
      that.funcGetListData(e.detail.current-1, e.detail.size);
    },
  }
})