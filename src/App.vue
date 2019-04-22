<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import CCC from './resource/ccc-streamer-utilities'
  import axios from 'axios'
  // const subscription = ['5~CCCAGG~CDT~BTC']
  export default {
    name: 'App',
    data() {
      return {
        msg: ''
      }
    },
    sockets: {
      connect: function () {
        console.log('socket connected')
      },
      m: function (message) {
        var messageType = message.substring(0, message.indexOf('~'));
        var res = {};
        if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
          res = CCC.CURRENT.unpack(message);
          let coinType = res.FROMSYMBOL
          let price = res.PRICE;
          let flags = res.FLAGS
          let hour24price = res.OPEN24HOUR
          let data = { type: coinType, price: price, flags: flags, hour24price: hour24price }
          /*let toCoinType = res.TOSYMBOL
          let toCoinSymbol = CCC.STATIC.CURRENCY.getSymbol(toCoinType)*/
          if (price) {
            this.updateCoinPrice(data)
          }
          // console.log(res)
        }
      }
    },
    computed: {
      ...mapState([ 'subscription' ])
    },
    mounted() {
      // socket 开关在这儿
      this.$socket.emit('SubAdd', { subs: this.subscription })
      
    },
    beforeMount() {
      this.getCoinInfo('ETH')
      this.getKLineData('ETH')
    },
    methods: {
      ...mapActions([ 'updateCoinPrice', 'getKLineData', 'getCoinInfo' ])
    }
  }
</script>

<style>
  html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #app {
    width: 100%;
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
