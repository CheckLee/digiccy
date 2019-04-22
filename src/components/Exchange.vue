<template>
  <div class="exchange">
    <div class="exchange-header">
      <div class="exchange-header__left">
        <el-card class="card btc-card" :body-style="{ padding: '0px' }">
          <div class="clearfix">
            <span class="title">BTC</span>
          </div>
          <div class="item price">实时价格：${{ coinList.BTC.currentPrice }}</div>
          <div class="item count">拥有数量：Ƀ{{ personalAsset.totalBTC | formatFloat }}</div>
        </el-card>
      </div>
      <div class="exchange-header__center">
        <el-card class="card exchange-card" :body-style="{ padding: '0px', height: '158px' }">
          <div class="clearfix">
            
            <span class="title">Exchange</span>
          </div>
          <div class="exchange-subpanel">
            <div class="buy-btc">
              <div class="btc-info">
                <span class="subtitle">买入BTC</span>
                <span class="exchange-subpanel__tip">BTC数量：{{ (buyBTC/tmpBTCprice).toFixed(4) }}</span>
              </div>
              <div class="btc-trade">
                <span>$ <el-input v-model="buyBTC" placeholder="请输入购买金额" style="width: 80%;" @focus="getTmpBTCprice" size="medium" clearable></el-input></span>
                <el-button type="danger" @click="handleBuyBTC" size="medium">买入</el-button>
              </div>
            </div>
            <div class="sell-btc">
              <div class="btc-info">
                <span class="subtitle">卖出BTC</span>
                <span class="exchange-subpanel__tip">BTC数量：{{ (sellBTC/tmpBTCprice).toFixed(4) }}</span>
              </div>
              <div class="btc-trade">
                <span>$ <el-input v-model="sellBTC" placeholder="请输入售卖金额" style="width: 80%;" @focus="getTmpBTCprice" size="medium" clearable></el-input></span>
                <el-button type="success" @click="handleSellBTC" size="medium">卖出</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="exchange-header__right">
        <el-card class="card usd-card" :body-style="{ padding: '0px' }">
          <div class="clearfix">
            <span class="title">USD</span>
          </div>
          <div class="item rate">汇率：6.4</div>
          <div class="item asset">资产：${{ personalAsset.totalAsset }}</div>
        </el-card>
      </div>
    </div>
    <div class="exchange-panel">
      <el-card class="card exchange-card" :body-style="{ padding: '0px', height: '158px' }">
        <div class="clearfix">
          <span class="title">Exchange</span>
        </div>
        <div class="exchange-subpanel">
          <div class="select-coin">
            <div class="coin-info">
              <span class="subtitle">选择币种</span>
              <span class="exchange-subpanel__tip">拥有数量：{{ selectedCoinAmount }}</span>
            </div>
            <el-select
              class="coin-select"
              v-model="selectedCoinType"
              filterable
              placeholder="请选择币种"
              @change="selectCoin">
              <el-option
                v-for="coinType in coinTypes"
                :key="coinType"
                :label="coinType"
                :value="coinType"
              >
              </el-option>
            </el-select>
          </div>
          <div class="buy-btc">
            <div class="btc-info">
              <span class="subtitle">买入{{ selectedCoinType }}</span>
              <span class="exchange-subpanel__tip">BTC数量：{{ (buyCoin * tmpBTCratio).toFixed(4) }}</span>
            </div>
            <div class="btc-trade">
              <span>δ <el-input v-model="buyCoin" placeholder="请输入购买数量" style="width: 80%;" @focus="getTmpBTCratio" size="medium" clearable></el-input></span>
              <el-button type="danger" @click="handleBuyCoin" size="medium">买入</el-button>
            </div>
          </div>
          <div class="sell-btc">
            <div class="btc-info">
              <span class="subtitle">卖出{{ selectedCoinType }}</span>
              <span class="exchange-subpanel__tip">BTC数量：{{ (sellCoin * tmpBTCratio).toFixed(4) }}</span>
            </div>
            <div class="btc-trade">
              <span>δ <el-input v-model="sellCoin" placeholder="请输入售卖数量" style="width: 80%;" @focus="getTmpBTCratio" size="medium" clearable></el-input></span>
              <el-button type="success" @click="handleSellCoin" size="medium">卖出</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="exchange-tradeLog" style="width: 970px;">
      <el-card :body-style=" { padding: '0px', width: '970px' }">
        <div class="clearfix">
          <span class="title">最近十次交易记录</span>
        </div>
        <exchange-log :tradeLog="exchangeTradeLog"></exchange-log>
      </el-card>
    </div>
    
    <!--测试按钮-->
    <!--<el-button @click="test">test</el-button>-->
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'
  import api from "../api/asset"
  import ExchangeLog from './ExchangeLog'
  import { formatDate } from "../resource/formatDate";

  export default {
    name: "exchange",
    data() {
      return {
        personalAsset: {},
        buyBTC: '',
        sellBTC: '',
        tmpBTCprice: 1,
        user: '',
        tradeLog: [],
        // 传给 exchange 的 最近十条 tradeLog
        exchangeTradeLog: [],
        // 测试异步传入数据后 能否改变 data 里的属性
        test: true,
        selectedCoinType: '',
        selectedCoinAmount: 0,
        buyCoin: '',
        sellCoin: '',
        tmpBTCratio: ''
      }
    },
    computed: {
      ...mapState([ 'coinList', 'current', 'coinTypes'])
    },
    beforeMount() {
      // 先不加注册登录时，先用 checklee 实验
      
      api.GetPersonalAsset('checklee')
        .then(({ data }) => {
          this.personalAsset = data
          this.user = 'checklee'
          this.tradeLog = data.tradeLog
          this.exchangeTradeLog = (this.tradeLog.length > 10) ? this.tradeLog.slice(-10) : this.tradeLog
        })
        .catch((err) => {
          console.log(err)
        })
    },
    methods: {
      // 测试方法
      /*test() {
        
        let tmpData = {
          user: 'checklee'
        }
        api.RegPersonalAsset(tmpData)
          .then(({ data }) => {
            console.log(data)
          })
          .catch((err) => {
            console.log(err)
          })
      },*/
      handleBuyBTC() {
        /* 参数说明 */
        /*
          @ buyByUSD： 买入 BTC 所需 USD
          @ ownUSD： 拥有 USD 数量
          @ ownBTC： 拥有 BTC 数量
        */
        this.tmpBTCprice = this.coinList.BTC.currentPrice
        let buyByUSD = parseFloat(this.buyBTC)
        let ownUSD = this.personalAsset.totalAsset
        let ownBTC = this.personalAsset.totalBTC
        if (isNaN(buyByUSD) || buyByUSD <= 0) {
          this.$message.error('请输入正确的数字')
        }
        else if ( buyByUSD > ownUSD ) {
          this.$message.error('余额不足，请充值')
        }
        else {
          let totalAssetRemain = ownUSD - buyByUSD
          let totalBTCRemain = ownBTC + buyByUSD / this.tmpBTCprice
          this.personalAsset.totalAsset = totalAssetRemain
          this.personalAsset.totalBTC = totalBTCRemain
          let tmpTradeLog = {
            date: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
            buy: 'BTC',
            sell: 'USD',
            buyAmount: buyByUSD / this.tmpBTCprice,
            sellAmount: buyByUSD
          }
          
          let insertTradeLog = {
            user: this.user,
            tradeType: 1,
            totalAsset: totalAssetRemain,
            totalBTC: totalBTCRemain,
            tradeLog: tmpTradeLog
          }
          
          api.InsertTradeLog(insertTradeLog)
            .then(({ data }) => {
              this.tradeLog.push(tmpTradeLog)
              this.exchangeTradeLog.push(tmpTradeLog)
              this.exchangeTradeLog.shift()
              console.log(data)
            }).catch((err) => {
              this.$message.error('网络故障，交易失败')
              console.log('???')
              console.log(err)
          })
        }
        // 交易结束后清零
        this.buyBTC = ''
      },
      handleSellBTC() {
        /* 参数说明 */
        /*
          @ sellByUSD： 卖出 BTC 所得 USD
          @ ownUSD： 拥有 USD 数量
          @ ownBTC： 拥有 BTC 数量
          @ sellBTC：  卖出 BTC 数量
        */
        this.tmpBTCprice = this.coinList.BTC.currentPrice
        let sellByUSD = parseFloat(this.sellBTC)
        let ownUSD = this.personalAsset.totalAsset
        let ownBTC = this.personalAsset.totalBTC
        let sellBTC = sellByUSD / this.tmpBTCprice
        if (isNaN(sellByUSD) || sellByUSD <= 0) {
          this.$message.error('请输入正确的数字')
        }
        else if ( sellBTC > ownBTC ) {
          this.$message.error('BTC不足！')
        }
        else {
          let totalAssetRemain = ownUSD + sellByUSD
          let totalBTCRemain = ownBTC - sellBTC
          this.personalAsset.totalAsset = totalAssetRemain
          this.personalAsset.totalBTC = totalBTCRemain
          let tmpTradeLog = {
            date: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
            buy: 'USD',
            sell: 'BTC',
            buyAmount: sellByUSD,
            sellAmount: sellBTC
          }
          
          let insertTradeLog = {
            user: this.user,
            tradeType: 2,
            totalAsset: totalAssetRemain,
            totalBTC: totalBTCRemain,
            tradeLog: tmpTradeLog
          }
    
          api.InsertTradeLog(insertTradeLog)
            .then(({ data }) => {
              this.tradeLog.push(tmpTradeLog)
              this.exchangeTradeLog.push(tmpTradeLog)
              this.exchangeTradeLog.shift()
              console.log(data)
            }).catch((err) => {
              this.$message.error('网络故障，交易失败！')
              console.log('???')
              console.log(err)
          })
        }
        // 交易结束后清零
        this.sellBTC = ''
      },
      // 当 focus 到 input 框时，获取当前价格
      getTmpBTCprice() {
        this.tmpBTCprice = this.coinList.BTC.currentPrice
      },
      selectCoin(coinType) {
        this.selectedCoinType = coinType
        this.selectedCoinAmount = this.personalAsset[coinType]
      },
      // 当前币价格 = 币与BTC比例 * BTCtoUSD
      getTmpBTCratio() {
        let BTCtoUSD = this.coinList.BTC.currentPrice
        this.tmpBTCratio = this.coinList[this.selectedCoinType].currentPrice / BTCtoUSD
      },
      handleBuyCoin() {
        /* 参数说明 */
        /*
          @ buyCoin：  买入 Coin 数量
          @ buyCoinByBTC： 买入 Coin 所需 BTC
          @ ownCoin： 拥有 Coin 数量
          @ ownBTC： 拥有 BTC 数量
          @ coinType： 所选择币种
        */
        let coinType = this.selectedCoinType
        let buyCoin = parseFloat(this.buyCoin)
        let BTCtoUSD = this.coinList.BTC.currentPrice
        this.tmpBTCratio = this.coinList[coinType].currentPrice / BTCtoUSD
        let buyCoinByBTC = buyCoin * this.tmpBTCratio
        let ownCoin = this.personalAsset[coinType]
        let ownBTC = this.personalAsset.totalBTC
        if (isNaN(buyCoin) || buyCoin <= 0) {
          this.$message.error('请输入正确的数字')
        }
        else if ( buyCoinByBTC > ownBTC ) {
          this.$message.error('BTC不足！')
        }
        else {
          let totalCoinRemain = ownCoin + buyCoin
          let totalBTCRemain = ownBTC - buyCoinByBTC
          this.personalAsset[coinType] = totalCoinRemain
          this.personalAsset.totalBTC = totalBTCRemain
          let tmpTradeLog = {
            date: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
            buy: coinType,
            sell: 'BTC',
            buyAmount: buyCoin,
            sellAmount: buyCoinByBTC
          }
    
          let insertTradeLog = {
            user: this.user,
            tradeType: 4,
            coinType: coinType,
            totalCoin: totalCoinRemain,
            totalBTC: totalBTCRemain,
            tradeLog: tmpTradeLog
          }
    
          api.InsertTradeLog(insertTradeLog)
            .then(({ data }) => {
              this.tradeLog.push(tmpTradeLog)
              this.exchangeTradeLog.push(tmpTradeLog)
              this.exchangeTradeLog.shift()
              this.selectedCoinAmount = totalCoinRemain
              console.log(data)
            }).catch((err) => {
            this.$message.error('网络故障，交易失败')
            console.log('???')
            console.log(err)
          })
        }
        // 交易结束后清零
        this.buyCoin = ''
      },
      handleSellCoin(){
        /* 参数说明 */
        /*
          @ sellCoin： 卖出 Coin 数量
          @ sellCoinByBTC： 卖出 Coin 所得 BTC
          @ ownCoin： 拥有 Coin 数量
          @ ownBTC： 拥有 BTC 数量
          @ coinType： 所选择币种
        */
        let coinType = this.selectedCoinType
        let sellCoin = parseFloat(this.sellCoin)
        let BTCtoUSD = this.coinList.BTC.currentPrice
        this.tmpBTCratio = this.coinList[coinType].currentPrice / BTCtoUSD
        let sellCoinByBTC = sellCoin * this.tmpBTCratio
        let ownCoin = this.personalAsset[coinType]
        let ownBTC = this.personalAsset.totalBTC
        if (isNaN(sellCoin) || sellCoin <= 0) {
          this.$message.error('请输入正确的数字')
        }
        else if ( sellCoin > ownCoin ) {
          this.$message.error(`${coinType}不足`)
        }
        else {
          let totalCoinRemain = ownCoin - sellCoin
          let totalBTCRemain = ownBTC + sellCoinByBTC
          this.personalAsset[coinType] = totalCoinRemain
          this.personalAsset.totalBTC = totalBTCRemain
          let tmpTradeLog = {
            date: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
            buy: 'BTC',
            sell: coinType,
            buyAmount: sellCoinByBTC,
            sellAmount: sellCoin
          }
    
          let insertTradeLog = {
            user: this.user,
            tradeType: 4,
            coinType: coinType,
            totalCoin: totalCoinRemain,
            totalBTC: totalBTCRemain,
            tradeLog: tmpTradeLog
          }
    
          api.InsertTradeLog(insertTradeLog)
            .then(({ data }) => {
              this.tradeLog.push(tmpTradeLog)
              this.exchangeTradeLog.push(tmpTradeLog)
              this.exchangeTradeLog.shift()
              this.selectedCoinAmount = totalCoinRemain
              console.log(data)
            }).catch((err) => {
            this.$message.error('网络故障，交易失败')
            console.log('???')
            console.log(err)
          })
        }
        // 交易结束后清零
        this.sellCoin = ''
      }
      
    },
    filters: {
      formatFloat(val) {
        if (String(val).indexOf('.') > -1) {
          return val.toFixed(4)
        }
        else {
          return val
        }
      }
    },
    components: { ExchangeLog }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .exchange {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .exchange-header {
      width: 80%;
      height: 150px;
      display: flex;
      flex-direction: row;
      .exchange-header__center {
        flex: 1;
        display: flex;
        margin-left: 20px;
        margin-right: 20px;
      }
      .exchange-header__right, .exchange-header__left {
        width: 220px;
        display: flex;
      }
    }
    
  }
  
  .card {
    width: 100%;
    text-align: left;
  }
  .el-card__header {
    padding: 9px 10px;
  }
  .clearfix {
    border-bottom: 1px solid #ebeef5;
    padding: 9px 20px;
    display: flex;
    background-color: rgb(84, 92, 100);
    color: #ffffff;
    font-size: 16px;
    font-weight: lighter;
    .title {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }
  .item {
    padding: 15px 0px 0px 20px;
  }
  .exchange-subpanel {
    height: 100%;
    display: flex;
  }
  .buy-btc, .sell-btc, .select-coin {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .exchange-card {
    width: 100%;
  }
  .buy-btc, .select-coin{
    border-right: 1px solid #ebeef5;
  }
  .select-coin {
  
  }
  .exchange-panel {
    height: 150px;
    width: 80%;
    display: flex;
  }
  .btc-info, .btc-trade, .coin-info, .coin-select {
    padding: 15px 20px 0 20px;
    display: flex;
    justify-content: space-between;
  }
  .el-card__body {
    padding: 0;
  }
</style>
