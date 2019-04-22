<template>
  <div class="market">
    <div class="info">
      <h1 class="symbol">{{ current.symbol }}</h1>
      <span class="fullname">{{ current.fullname }}</span>
      <span class="price"></span>
      <span class="updownper"></span>
    </div>
    <div class="chart">
      <div class="chart-select">
        <el-radio-group v-model="kLineType" size="medium" @change="changeType">
          <el-radio-button label="m">一分钟</el-radio-button>
          <el-radio-button label="f">五分钟</el-radio-button>
          <el-radio-button label="h">一小时</el-radio-button>
          <el-radio-button label="d">一天</el-radio-button>
        </el-radio-group>
      </div>
      <div id="chart-demo"></div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import echarts from 'echarts'
  import options from '../resource/initOptions'
  import axios from 'axios'
  import processRawData from '../resource/processRawData'
  export default {
    name: "market",
    data() {
      return {
        kLineType: 'm',
      }
    },
    // 监视 route 变化
    watch: {
      '$route': 'initMarketPage'
    },
    computed: {
      ...mapState([ 'current' ])
    },
    methods: {
      ...mapActions([ 'changeKLineType', 'getKLineData', 'getCoinInfo' ]),
      
      changeType(type) {
        let myChart = echarts.getInstanceByDom(document.getElementById('chart-demo'))
        myChart.showLoading()
        myChart.setOption(options, true)
        
        // this.changeKLineType(type)
        let rawData = this.current[`${type}KLine`]
        // console.log(rawData)
        let chartData = processRawData(rawData, type)
        // 获取初始化的 DOM 元素中的 chart
        
        myChart.setOption({
          xAxis: [
            {
              type: 'category',
              data: chartData.categoryData,
            },
            {
              type: 'category',
              gridIndex: 1,
              data: chartData.categoryData,
            }
          ],
          series: [
            {
              name: 'Dow-Jones index',
              data: chartData.values,
            },
            {
              name: 'Volume',
              data: chartData.volumes
            }
          ]
        })
        myChart.hideLoading()
        
      },
      initMarketPage() {
        // 当 route 变化时，变更 current 中 current 信息，并显示
        let myChart = echarts.getInstanceByDom(document.getElementById('chart-demo'))
        myChart.showLoading()
        myChart.setOption(options, true)
        
        let curCoinType = this.$route.params.coinId
        this.getCoinInfo(curCoinType)
        this.getKLineData(curCoinType)
        
        // 由于不能异步读取数据设置，所以还是要先初始化
        // 判断初始请求 KLine 类型
        let urlType = {
          time: '',
          limit: 240,
          agg: 1
        }
        switch (this.kLineType) {
          case 'm':
            urlType = { time: 'minute', limit: 240, agg: 1 };
            break;
          case 'f':
            urlType = { time: 'minute', limit: 288, agg: 5 };
            break;
          case 'h':
            urlType = { time: 'hour', limit: 240, agg: 1 };
            break;
          case 'd':
            urlType = { time: 'day', limit: 240, agg: 1 };
            break;
        }
        // 根据 kLineType 初始化请求
        let baseURL = 'https://min-api.cryptocompare.com'
        axios.get(`${baseURL}/data/histo${urlType.time}?fsym=${curCoinType}&tsym=BTC&limit=${urlType.limit}&aggregate=${urlType.agg}&e=CCCAGG`)
          .then(({ data }) => {
            // rawData 是原生数据
            var rawData = data.Data
            // 处理原生数据放在 resource/processRawData 里面
            var chartData = processRawData(rawData, this.kLineType)
            
            myChart.setOption({
              xAxis: [
                {
                  type: 'category',
                  data: chartData.categoryData,
                },
                {
                  type: 'category',
                  gridIndex: 1,
                  data: chartData.categoryData,
                }
              ],
              series: [
                {
                  name: 'Dow-Jones index',
                  data: chartData.values,
                },
                {
                  name: 'Volume',
                  data: chartData.volumes
                }
              ]
            })
            myChart.hideLoading()
          })
    
      }
    },
    mounted() {
      var myChart = echarts.init(document.getElementById('chart-demo'))
      myChart.showLoading()
      myChart.setOption(options, true)
      
      // console.log(this.$route)
      let curCoinType = this.$route.params.coinId
      this.getCoinInfo(curCoinType)
      this.getKLineData(curCoinType)
  
      // 由于不能异步读取数据设置，所以还是要先初始化
      // 判断初始请求 KLine 类型
      let urlType = {
        time: '',
        limit: 240,
        agg: 1
      }
      switch (this.kLineType) {
        case 'm':
          urlType = { time: 'minute', limit: 240, agg: 1 };
          break;
        case 'f':
          urlType = { time: 'minute', limit: 288, agg: 5 };
          break;
        case 'h':
          urlType = { time: 'hour', limit: 240, agg: 1 };
          break;
        case 'd':
          urlType = { time: 'day', limit: 240, agg: 1 };
          break;
      }
      // 根据 kLineType 初始化请求
      let baseURL = 'https://min-api.cryptocompare.com'
      axios.get(`${baseURL}/data/histo${urlType.time}?fsym=${curCoinType}&tsym=BTC&limit=${urlType.limit}&aggregate=${urlType.agg}&e=CCCAGG`)
        .then(({ data }) => {
          // rawData 是原生数据
          var rawData = data.Data
          // 处理原生数据放在 resource/processRawData 里面
          var chartData = processRawData(rawData, this.kLineType)
          let myChart = echarts.getInstanceByDom(document.getElementById('chart-demo'))
      
          myChart.showLoading()
          myChart.setOption(options, true)
          myChart.setOption({
            xAxis: [
              {
                type: 'category',
                data: chartData.categoryData,
              },
              {
                type: 'category',
                gridIndex: 1,
                data: chartData.categoryData,
              }
            ],
            series: [
              {
                name: 'Dow-Jones index',
                data: chartData.values,
              },
              {
                name: 'Volume',
                data: chartData.volumes
              }
            ]
          })
          myChart.hideLoading()
        })
    }
  }
</script>

<style scoped>
  .market {
    width: 100%;
    height: 100%;
  }
  #chart-demo {
    width: 800px;
    height: 550px;
    margin: 20px auto 0;
  }
</style>
