<template>
	<el-menu class="el-menu-vertical-demo" :default-active="$route.path"
           :collapse="isCollapse" @select="handleSelect"
           background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <el-menu-item v-for="(coin, index) in coinTypes" :index="coin" :key="coin.id" class="menu-item">
      <img :src="'/static/icons/' + coin.toLowerCase() + '_logo.png'" alt="" width="30" height="30" class="menu-item__img">
      <span class="menu-item__symbol">{{ coin }}</span>
      <span class="menu-item__price"
            :class="{ priceUp: coinList[coin].flags === '1', priceDown: coinList[coin].flags === '2'}">
        ￥ {{ coinList[coin].currentPrice | toCNY }}
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: "nav-menu",
    props: {
      isCollapse: Boolean
    },
    data() {
      return {
        symbols: [],
        activeIndex: 'ETH'
      }
    },
    mounted() {
    
    },
    methods: {
      ...mapActions([ 'getKLineData', 'changeKLineType' ]),
      handleSelect(key, keyPath) {
        this.$router.push({ path: `/market/${key}` })
        this.changeKLineType('m')
      }
    },
    computed: {
      ...mapState([ 'coinList', 'coinTypes', 'current' ]),
    },
    filters: {
      toCNY: function (value) {
        return (value * 6.43489).toFixed(3)
      }
    }
  }
</script>

<style scoped>
  .menu-item {
    text-align: left;
  }
  .menu-item__img {
    margin-right: 10px;
  }
  .menu-item__symbol {
    display: inline-block;
    width: 70px;
    font-size: 16px;
  }
  .menu-item__price {
    display: inline-block;
    position: absolute;
    font-size: 14px;
    align-items: center;
    color: lightgray;
    padding-top: 2px;
  }
  .priceUp {
    animation: 1s turnGreen;
  }
  @keyframes turnGreen {
    0% { color: limegreen; }
    100% { color: lightgray; }
  }
  .priceDown {
    animation: 1s turnRed;
  }
  @keyframes turnRed {
    0% { color: red; }
    100% { color: lightgray; }
  }
  
</style>
