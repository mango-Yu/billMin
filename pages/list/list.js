// pages/list/list.js  
const utils = require('../../utils/util.js')
const config = require('../../utils/config.default.js')
const computedBehavior = require('miniprogram-computed')
Component({
  behaviors: [computedBehavior],
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
    onInitChart(F2, config) {
      const chart = new F2.Chart(config);
      const data = [
        { value: 63.4, city: 'New York', date: '2011-10-01' },
        { value: 62.7, city: 'Alaska', date: '2011-10-01' },
        { value: 72.2, city: 'Austin', date: '2011-10-01' },
        { value: 58, city: 'New York', date: '2011-10-02' },
        { value: 59.9, city: 'Alaska', date: '2011-10-02' },
        { value: 67.7, city: 'Austin', date: '2011-10-02' },
        { value: 53.3, city: 'New York', date: '2011-10-03' },
        { value: 59.1, city: 'Alaska', date: '2011-10-03' },
        { value: 69.4, city: 'Austin', date: '2011-10-03' },
      ];
      chart.source(data, {
        date: {
          range: [0, 1],
          type: 'timeCat',
          mask: 'MM-DD'
        },
        value: {
          max: 300,
          tickCount: 4
        }
      });
      chart.area().position('date*value').color('city').adjust('stack');
      chart.line().position('date*value').color('city').adjust('stack');
      chart.render();
      // 注意：需要把chart return 出来
      return chart;
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
     onLoad(){
      this.funcGetListData()
     },
     funcGetListData() {
      let that = this;
      wx.request({
        url: `${config.api + '/getAllSpending'}`,
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
                that.data.costArr.push({"value":that.data.objectData[index].sumCalc,"name":utils.formatTime(new Date(item.date), "yyyy-MM-dd")});

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
              console.log(that.data.tableData)
              console.log(that.data.dateArr)
              console.log(that.data.costArr)
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
  }
})
