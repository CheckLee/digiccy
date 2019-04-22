<template>
	<div class="asset-coins">
    <div class="coin-item">
      <el-card :body-style="{ padding: '0px' }" class="card">
        <div class="clearfix">
          <img :src="'/static/icons/btc_logo.png'" alt="" width="20" height="20" class="menu-item__img">
          <div class="title">BTC</div>
        </div>
        <div class="card-subpanel">
          <div class="amount">拥有数量：<span class="num">{{ personalAsset.totalBTC | formatFloat }}</span></div>
        </div>
      </el-card>
    </div>
    <div class="coin-item" v-for="coin in coinAmountTypes" :key="coin.index">
      <el-card :body-style="{ padding: '0px' }" class="card">
        <div class="clearfix">
          <img :src="'/static/icons/' + coin.toLowerCase() + '_logo.png'" alt="" width="20" height="20" class="menu-item__img">
          <div class="title">{{ coin }}</div>
        </div>
        <div class="card-subpanel">
          <div class="amount">拥有数量：<span class="num">{{ personalAsset[coin] }}</span></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      personalAsset: {
        type: Object
      },
      coinAmountTypes: {
        type: Array
      }
    },
    methods: {
    
    },
    filters: {
      formatFloat: function (val) {
        if (String(val).indexOf('.') > -1) {
          return val.toFixed(4)
        }
        else {
          return val
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .asset-coins {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 90%;
    .coin-item {
      display: flex;
      width: 200px;
      margin-right: 20px;
      .card {
        width: 200px;
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
            margin-left: 10px;
          }
        }
        .card-subpanel {
          padding: 9px 20px;
          text-align: left;
        }
      }
    }
  }
</style>
