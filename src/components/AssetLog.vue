<template>
  <div class="exchange-log">
    <div class="select-coin">
      <el-card class="card" :body-style="{ padding: '0px'}">
        <div class="clearfix">
          <div class="title">Log</div>
          <el-button class="show-all" type="primary" size="medium" @click="showAllTradeLog">显示全部</el-button>
        </div>
        <div class="card-subpanel">
          
          <div class="subtitle">选择币种交易类型
            <el-select
              v-model="selectedCoinType"
              style="width: 120px"
              filterable
              placeholder="请选择币种"
              @change="selectCoin">
              <el-option
                v-for="coinType in showCoinTypes"
                :key="coinType"
                :label="coinType"
                :value="coinType"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-card>
    </div>
    <div class="show-log">
      <el-table
        :data="showTradeLog.slice((currentPage-1)*pageSize, currentPage*pageSize)"
        size="medium"
        style="width: 100%"
        max-height="280"
        border
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="220"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="sell"
          label="卖出币种"
          width="120"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="sellAmount"
          label="卖出数量"
          width="180"
          header-align="center"
          :formatter="formatFloat"
        ></el-table-column>
        <el-table-column
          prop="buy"
          label="买入币种"
          width="120"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="buyAmount"
          label="买入数量"
          width="180"
          header-align="center"
          :formatter="formatFloat"
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 25, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="showTradeLog.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import api from 'api/asset'
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: "",
    props: {
      tradeLog: {
        type: Array
      },
      showCoinTypes: {
        type: Array
      },
      currentTradeLog: {
        type: Object
      }
    },
    data() {
      return {
        selectedCoinType: '',
        currentPage: 1,
        pageSize: 5,
        allCoinTypes: [],
        allTradeLog: [],
        showTradeLog: [],
        showFirst: true
      }
    },
    beforeMount() {
      api.GetPersonalAsset('checklee')
        .then(({ data }) => {
          let tradeLog = data.tradeLog.reverse()
          this.allTradeLog = tradeLog
          this.showTradeLog = tradeLog
        })
        .catch((err) => {
          console.log(err)
        })
    },
    mounted() {
      this.allCoinTypes = ['USD', 'BTC']
      this.allCoinTypes.push(...this.coinTypes)
      // 只留下有交易记录的
    },
    
    computed: {
      ...mapState([ 'coinTypes' ]),
    },
    methods: {
      formatFloat(row, column, val) {
        if (String(val).indexOf('.') > -1) {
          return val.toFixed(4)
        }
        else {
          return val
        }
      },
      handleSizeChange(size) {
        this.pageSize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      selectCoin(type) {
        this.selectedCoinType = type
        if (type === 'BTC') {
          this.showTradeLog = this.allTradeLog.filter(function (log) {
            return ((log.buy === 'BTC' && log.sell === 'USD')||(log.buy === 'USD' && log.sell === 'BTC'))
          })
        }
        else if (type === 'USD') {
          this.showTradeLog = this.allTradeLog.filter(function (log) {
            return (log.buy === 'USD' && log.sell === '')
          })
        }
        else {
          this.showTradeLog = this.allTradeLog.filter(function (log) {
            return (log.buy === type || log.sell === type)
          })
        }
      },
      showAllTradeLog() {
        this.selectedCoinType = ''
        this.showTradeLog = this.allTradeLog
      }
    },
    watch: {
      currentTradeLog() {
        this.allTradeLog.unshift(this.currentTradeLog)
        if (this.selectedCoinType === '') {
          this.showTradeLog = this.allTradeLog
        } else if (this.selectedCoinType === 'USD') {
          this.showTradeLog = this.allTradeLog.filter(function (log) {
            return (log.buy === 'USD' && log.sell === '')
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .exchange-log {
    display: flex;
    justify-content: space-between;
    width: 90%;
    .select-coin {
      width: 300px;
      .card {
        width: 300px;
        .clearfix {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ebeef5;
          padding: 9px 20px;
          background-color:  rgb(84, 92, 100);
          color: #ffffff;
          font-size: 20px;
          font-weight: lighter;
          .title {
            display: flex;
            align-items: center;
          }
        }
        .card-subpanel {
          padding: 9px 20px;
        }
      }
    }
  }
</style>
