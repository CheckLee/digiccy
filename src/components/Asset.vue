<template>
  <div class="asset">
    <div class="personal">
      <div class="info">
        <el-card class="card" :body-style="{ padding: '0px' }">
          <div class="clearfix">
            <div class="title">Info</div>
          </div>
          <div class="card-subpanel">
            <div class="buy-btc" style="width: 100%;">
              <div class="username">Welcome, {{ user }}!</div>
              <div class="estimate">预估总资产：<span class="estimate-asset">{{ estimateAsset }}</span></div>
              <el-button class="logout" type="primary" @click="logout">退出登录</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="recharge">
        <el-card class="card" :body-style="{ padding: '0px' }">
          <div class="clearfix">
            <div class="title">Recharge</div>
          </div>
          <div class="card-subpanel">
            <div class="buy" style="width: 100%;">
              <div class="subtitle">
                <div class="title">买入USD</div>
                <div class="balance">余额：$ {{ personalAsset.totalAsset }}</div>
              </div>
              <div>$ <el-input v-model="recharge" placeholder="请输入购买金额" style="width: 150px;" size="medium" clearable></el-input>
</div>
              <el-button class="usd-buy" type="danger" @click="handleBuyUSD" size="medium">买入</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="coins">
      <asset-coins :personalAsset="personalAsset" :coinAmountTypes="coinAmountTypes"></asset-coins>
    </div>
    <div class="log">
      <asset-log :tradeLog="tradeLog" :showCoinTypes="showCoinTypes" :currentTradeLog="currentTradeLog"></asset-log>
    </div>
  </div>
</template>

<script>
  import api from 'api/asset'
  import AssetLog from 'components/AssetLog'
  import AssetCoins from 'components/AssetCoins'
  import { mapState, mapActions } from 'vuex'
  import { formatDate } from "../resource/formatDate";
  
  export default {
    name: "asset",
    data() {
      return {
        personalAsset: {},
        user: '',
        tradeLog: [],
        recharge: '',
        balance: '',
        // 用于展示交易记录的 coinTypes
        showCoinTypes: [],
        // 用于展示拥有数量的 coinTypes
        coinAmountTypes: [],
        // 用于刚结束的USD买入交易记录
        currentTradeLog: {}
      }
    },
    computed: {
      ...mapState([ 'coinTypes', 'coinList' ]),
      estimateAsset() {
        // USD
        let usd = this.personalAsset.totalAsset
        let btc = this.personalAsset.totalBTC * this.coinList.BTC.currentPrice
        let others = 0
        this.coinAmountTypes.forEach(coin => {
          others += this.personalAsset[coin] * this.coinList[coin].currentPrice
        })
        return (usd + btc + others).toFixed(4)
      }
    },
    methods: {
      ...mapActions([ 'getPersonalAsset' ]),
      logout() {
      
      },
      handleBuyUSD() {
        let recharge = parseFloat(this.recharge)
        let ownUSD = this.personalAsset.totalAsset
        let ownBTC = this.personalAsset.totalBTC
        this.personalAsset.totalAsset = ownUSD + recharge
        this.personalAsset.totalBTC = ownBTC
        if (isNaN(recharge) || recharge <= 0) {
          this.$message.error('请输入正确的数字')
        } else if (recharge > 20000) {
          this.$message.error('金额过大')
        }
        else {
          let totalAssetRemain = ownUSD + recharge
          let tmpTradeLog = {
            date: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
            buy: 'USD',
            sell: '',
            buyAmount: recharge,
            sellAmount: ''
          }
          let insertTradeLog = {
            user: this.user,
            tradeType: 2,
            totalAsset: totalAssetRemain,
            totalBTC: ownBTC,
            tradeLog: tmpTradeLog
          }
          api.InsertTradeLog(insertTradeLog)
            .then(({ data }) => {
              this.tradeLog.push(tmpTradeLog)
              this.currentTradeLog = tmpTradeLog
              /*
              this.exchangeTradeLog.push(tmpTradeLog)
              this.exchangeTradeLog.shift()
              */
              console.log(data)
            }).catch((err) => {
              this.$message.error('网络故障，交易失败')
              console.log('???')
              console.log(err)
          })
        }
        this.recharge = ''
      }
    },
    beforeMount() {
      // 先不加注册登录时，先用 checklee 实验
    
      api.GetPersonalAsset('checklee')
        .then(({ data }) => {
          this.getPersonalAsset(data)
          this.personalAsset = data
          this.user = 'checklee'
          this.tradeLog = data.tradeLog
  
          /* 用于展示交易记录的 coinTypes */
          let tmpCoinTypes = ['USD', 'BTC']
          this.tradeLog.forEach(log => {
            let type = (log.buy === 'BTC') ? log.sell : log.buy
            tmpCoinTypes.push(type)
          })
          // console.log(tmpCoinTypes)
          // 数组去重好方法！
          this.showCoinTypes = [...new Set(tmpCoinTypes)]
          // console.log(this.showTradeLog)
  
          /* 用于展示拥有数量的 coinTypes */
          this.coinAmountTypes = []
          this.coinTypes.forEach(coin => {
            if (this.personalAsset[coin] !== 0) {
              this.coinAmountTypes.push(coin)
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    components: { AssetLog, AssetCoins }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .asset {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    .personal {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 90%;
      .info, .recharge {
        margin-right: 90px;
        .card {
          width: 350px;
          .clearfix {
            display: flex;
            border-bottom: 1px solid #ebeef5;
            padding: 9px 20px;
            background-color:  rgb(84, 92, 100);
            color: #ffffff;
            font-size: 16px;
            font-weight: lighter;
            .title {
              display: flex;
              align-items: center;
            }
          }
          .card-subpanel {
            padding: 9px 20px;
            text-align: left;
          }
        }
      }
      .info {
        .card-subpanel {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          color: #000;
          .username {
            height: 30px;
            line-height: 30px;
          }
          .estimate {
            height: 30px;
            line-height: 30px;
            .estimate-asset {
              display: inline;
            }
          }
          .logout {
            float: right;
            align-self: flex-end;
          }
        }
      }
      .recharge {
        .card-subpanel {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          color: #000;
          .subtitle {
            height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
          }
          .usd-buy {
            float: right;
            align-self: flex-end;
          }
        }
      }
    }
    .coins {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .log {
      height: 320px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
</style>
