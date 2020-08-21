// pages/list/list.js  
const utils = require('../../utils/util.js')
const configs = require('../../utils/config.default.js')  
let chart = null;
 
function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
  ];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
 
  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.tooltip({
    showItemMarker: false,
    onShow(ev) {
      const { items } = ev;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = '¥ ' + items[0].value;
    }
  });
  chart.interval().position('year*sales');
  chart.render();
  return chart;
}
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
    // initChart:null
    opts: {
      onInit: initChart
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
     onLoad(){
       let _this = this;
       var data = [{
        "title": "Bohemian Rhapsody",
        "artist": "Queen",
        "release": 1975,
        "year": "1999",
        "rank": "1",
        "count": 978
      }, {
        "title": "Hotel California",
        "artist": "Eagles",
        "release": 1977,
        "year": "1999",
        "rank": "2",
        "count": 1284
      }, {
        "title": "Child In Time",
        "artist": "Deep Purple",
        "release": 1972,
        "year": "1999",
        "rank": "3",
        "count": 1117
      }, {
        "title": "Stairway To Heaven",
        "artist": "Led Zeppelin",
        "release": 1971,
        "year": "1999",
        "rank": "4",
        "count": 1132
      }, {
        "title": "Paradise By The Dashboard Light",
        "artist": "Meat Loaf",
        "release": 1978,
        "year": "1999",
        "rank": "5",
        "count": 1187
      }, {
        "title": "Yesterday",
        "artist": "The Beatles",
        "release": 1965,
        "year": "1999",
        "rank": "6",
        "count": 909
      }, {
        "title": "Angie",
        "artist": "The Rolling Stones",
        "release": 1973,
        "year": "1999",
        "rank": "8",
        "count": 1183
      }, {
        "title": "Bridge Over Troubled Water",
        "artist": "Simon & Garfunkel",
        "release": 1970,
        "year": "1999",
        "rank": "9",
        "count": 1111
      }, {
        "title": "A Whiter Shade Of Pale",
        "artist": "Procol Harum",
        "release": 1967,
        "year": "1999",
        "rank": "10",
        "count": 1190
      }, {
        "title": "Hey Jude",
        "artist": "The Beatles",
        "release": 1968,
        "year": "1999",
        "rank": "11",
        "count": 1037
      }, {
        "title": "House Of The Rising Sun",
        "artist": "The Animals",
        "release": 1964,
        "year": "1999",
        "rank": "13",
        "count": 543
      }, {
        "title": "Goodnight Saigon",
        "artist": "Billy Joel",
        "release": 1983,
        "year": "1999",
        "rank": "14",
        "count": 748
      }, {
        "title": "Dancing Queen",
        "artist": "ABBA",
        "release": 1976,
        "year": "1999",
        "rank": "16",
        "count": 1111
      }, {
        "title": "Another Brick In The Wall",
        "artist": "Pink Floyd",
        "release": 1979,
        "year": "1999",
        "rank": "17",
        "count": 1266
      }, {
        "title": "Sunday Bloody Sunday",
        "artist": "U2",
        "release": 1985,
        "year": "1999",
        "rank": "18",
        "count": 1087
      }, {
        "title": "Tears In Heaven",
        "artist": "Eric Clapton",
        "release": 1992,
        "year": "1999",
        "rank": "21",
        "count": 435
      }, {
        "title": "Old And Wise",
        "artist": "The Alan Parsons Project",
        "release": 1982,
        "year": "1999",
        "rank": "24",
        "count": 945
      }, {
        "title": "Losing My Religion",
        "artist": "R.E.M.",
        "release": 1991,
        "year": "1999",
        "rank": "25",
        "count": 415
      }, {
        "title": "School",
        "artist": "Supertramp",
        "release": 1974,
        "year": "1999",
        "rank": "26",
        "count": 1011
      }, {
        "title": "Who Wants To Live Forever",
        "artist": "Queen",
        "release": 1986,
        "year": "1999",
        "rank": "30",
        "count": 836
      }, {
        "title": "Everybody Hurts",
        "artist": "R.E.M.",
        "release": 1993,
        "year": "1999",
        "rank": "31",
        "count": 301
      }, {
        "title": "Over De Muur",
        "artist": "Klein Orkest",
        "release": 1984,
        "year": "1999",
        "rank": "32",
        "count": 1166
      }, {
        "title": "Paint It Black",
        "artist": "The Rolling Stones",
        "release": 1966,
        "year": "1999",
        "rank": "33",
        "count": 1077
      }, {
        "title": "The Winner Takes It All",
        "artist": "ABBA",
        "release": 1980,
        "year": "1999",
        "rank": "35",
        "count": 926
      }, {
        "title": "Candle In The Wind (1997)",
        "artist": "Elton John",
        "release": 1997,
        "year": "1999",
        "rank": "37",
        "count": 451
      }, {
        "title": "My Heart Will Go On",
        "artist": "Celine Dion",
        "release": 1998,
        "year": "1999",
        "rank": "41",
        "count": 415
      }, {
        "title": "The River",
        "artist": "Bruce Springsteen",
        "release": 1981,
        "year": "1999",
        "rank": "48",
        "count": 723
      }, {
        "title": "With Or Without You",
        "artist": "U2",
        "release": 1987,
        "year": "1999",
        "rank": "51",
        "count": 816
      }, {
        "title": "Space Oddity",
        "artist": "David Bowie",
        "release": 1969,
        "year": "1999",
        "rank": "59",
        "count": 1344
      }, {
        "title": "Stil In Mij",
        "artist": "Van Dik Hout",
        "release": 1994,
        "year": "1999",
        "rank": "65",
        "count": 373
      }, {
        "title": "Nothing Compares 2 U",
        "artist": "Sinead O'Connor",
        "release": 1990,
        "year": "1999",
        "rank": "90",
        "count": 426
      }, {
        "title": "Wonderful Tonight",
        "artist": "Eric Clapton",
        "release": 1988,
        "year": "1999",
        "rank": "91",
        "count": 515
      }, {
        "title": "Blowing In The Wind",
        "artist": "Bob Dylan",
        "release": 1963,
        "year": "1999",
        "rank": "94",
        "count": 323
      }, {
        "title": "Eternal Flame",
        "artist": "Bangles",
        "release": 1989,
        "year": "1999",
        "rank": "96",
        "count": 495
      }, {
        "title": "Non Je Ne Regrette Rien",
        "artist": "Edith Piaf",
        "release": 1961,
        "year": "1999",
        "rank": "106",
        "count": 178
      }, {
        "title": "Con Te Partiro",
        "artist": "Andrea Bocelli",
        "release": 1996,
        "year": "1999",
        "rank": "109",
        "count": 362
      }, {
        "title": "Conquest Of Paradise",
        "artist": "Vangelis",
        "release": 1995,
        "year": "1999",
        "rank": "157",
        "count": 315
      }, {
        "title": "White Christmas",
        "artist": "Bing Crosby",
        "release": 1954,
        "year": "1999",
        "rank": "218",
        "count": 10
      }, {
        "title": "(We're gonna) Rock Around The Clock",
        "artist": "Bill Haley & The Comets",
        "release": 1955,
        "year": "1999",
        "rank": "239",
        "count": 19
      }, {
        "title": "Jailhouse Rock",
        "artist": "Elvis Presley",
        "release": 1957,
        "year": "1999",
        "rank": "247",
        "count": 188
      }, {
        "title": "Take Five",
        "artist": "Dave Brubeck",
        "release": 1962,
        "year": "1999",
        "rank": "279",
        "count": 204
      }, {
        "title": "It's Now Or Never",
        "artist": "Elvis Presley",
        "release": 1960,
        "year": "1999",
        "rank": "285",
        "count": 221
      }, {
        "title": "Heartbreak Hotel",
        "artist": "Elvis Presley",
        "release": 1956,
        "year": "1999",
        "rank": "558",
        "count": 109
      }, {
        "title": "One Night",
        "artist": "Elvis Presley",
        "release": 1959,
        "year": "1999",
        "rank": "622",
        "count": 71
      }, {
        "title": "Johnny B. Goode",
        "artist": "Chuck Berry",
        "release": 1958,
        "year": "1999",
        "rank": "714",
        "count": 89
      }, {
        "title": "Unforgettable",
        "artist": "Nat 'King' Cole",
        "release": 1951,
        "year": "1999",
        "rank": "1188",
        "count": 20
      }, {
        "title": "La Mer",
        "artist": "Charles Trenet",
        "release": 1952,
        "year": "1999",
        "rank": "1249",
        "count": 24
      }, {
        "title": "The Road Ahead",
        "artist": "City To City",
        "release": 1999,
        "year": "1999",
        "rank": "1999",
        "count": 262
      }, {
        "title": "What It Is",
        "artist": "Mark Knopfler",
        "release": 2000,
        "year": "2000",
        "rank": "545",
        "count": 291
      }, {
        "title": "Overcome",
        "artist": "Live",
        "release": 2001,
        "year": "2001",
        "rank": "879",
        "count": 111
      }, {
        "title": "Mooie Dag",
        "artist": "Blof",
        "release": 2002,
        "year": "2003",
        "rank": "147",
        "count": 256
      }, {
        "title": "Clocks",
        "artist": "Coldplay",
        "release": 2003,
        "year": "2003",
        "rank": "733",
        "count": 169
      }, {
        "title": "Sunrise",
        "artist": "Norah Jones",
        "release": 2004,
        "year": "2004",
        "rank": "405",
        "count": 256
      }, {
        "title": "Nine Million Bicycles",
        "artist": "Katie Melua",
        "release": 2005,
        "year": "2005",
        "rank": "23",
        "count": 250
      }, {
        "title": "Rood",
        "artist": "Marco Borsato",
        "release": 2006,
        "year": "2006",
        "rank": "17",
        "count": 159
      }, {
        "title": "If You Were A Sailboat",
        "artist": "Katie Melua",
        "release": 2007,
        "year": "2007",
        "rank": "101",
        "count": 256
      }, {
        "title": "Viva La Vida",
        "artist": "Coldplay",
        "release": 2009,
        "year": "2009",
        "rank": "11",
        "count": 228
      }, {
        "title": "Dochters",
        "artist": "Marco Borsato",
        "release": 2008,
        "year": "2009",
        "rank": "25",
        "count": 268
      }, {
        "title": "Need You Now",
        "artist": "Lady Antebellum",
        "release": 2010,
        "year": "2010",
        "rank": "210",
        "count": 121
      }, {
        "title": "Someone Like You",
        "artist": "Adele",
        "release": 2011,
        "year": "2011",
        "rank": "6",
        "count": 187
      }, {
        "title": "I Follow Rivers",
        "artist": "Triggerfinger",
        "release": 2012,
        "year": "2012",
        "rank": "79",
        "count": 167
      }, {
        "title": "Get Lucky",
        "artist": "Daft Punk",
        "release": 2013,
        "year": "2013",
        "rank": "357",
        "count": 141
      }, {
        "title": "Home",
        "artist": "Dotan",
        "release": 2014,
        "year": "2014",
        "rank": "82",
        "count": 76
      }, {
        "title": "Hello",
        "artist": "Adele",
        "release": 2015,
        "year": "2015",
        "rank": "23",
        "count": 29
      }]
      //  this.setData({
      //    initChart: (F2, config) => _this.onInitChart(F2, config, data)
      //   })
      
      // this.funcGetListData()
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
    // onInitChart(F2, config, datas){
      // F2.Chart.registerInteraction('ScrollBar', ScrollBar);
      // const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar')
      // const chart = new F2.Chart({config, plugins: ScrollBar });
    //   const chart = new F2.Chart(config);
    //   chart.source(datas, {
    //     release: {
    //       min: 1990,
    //       max: 2010
    //     }
    //   });
    //   chart.tooltip({
    //     showCrosshairs: true,
    //     showItemMarker: false,
    //     background: {
    //       radius: 2,
    //       fill: '#1890FF',
    //       padding: [ 3, 5 ]
    //     },
    //     nameStyle: {
    //       fill: '#fff'
    //     },
    //     onShow: function onShow(ev) {
    //       const items = ev.items;
    //       items[0].name = items[0].title;
    //     }
    //   });
    //   chart.line().position('release*count');
    //   chart.point().position('release*count').style({
    //     lineWidth: 1,
    //     stroke: '#fff'
    //   });
  
    //   chart.interaction('pan');
    //   // 定义进度条
    //   // chart.scrollBar({
    //   //   mode: 'x',
    //   //   xStyle: {
    //   //     offsetY: -5
    //   //   }
    //   // });
  
    //   // 绘制 tag
    //   chart.guide().tag({
    //     position: [ 1969, 1344 ],
    //     withPoint: false,
    //     content: '1,344',
    //     limitInPlot: true,
    //     offsetX: 0,
    //     direct: 'cr'
    //   });
    //   chart.render();
    //   // 注意：需要把chart return 出来
     
    //   return chart;
    // }
  }
})
