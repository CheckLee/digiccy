<template>
  <div class="exchange-log">
    <el-table
      :data="tradeLog"
      size="medium"
      style="width: 100%"
      max-height="269"
      border
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="250"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="sell"
        label="卖出币种"
        width="150"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="sellAmount"
        label="卖出数量"
        width="200"
        header-align="center"
        :formatter="formatFloat"
      ></el-table-column>
      <el-table-column
        prop="buy"
        label="买入币种"
        width="150"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="buyAmount"
        label="买入数量"
        width="200"
        header-align="center"
        :formatter="formatFloat"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      tradeLog: {
        type: Array
      }
    },
    methods: {
      formatFloat(row, column, val) {
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

<style scoped>

</style>
