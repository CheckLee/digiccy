<template>
	<el-menu class="el-menu-demo" :default-active="$route.path"
           mode="horizontal"
           text-color="#fff" background-color="#545c64" active-text-color="#ffd04b" router>
    <el-menu-item index="/news">资讯</el-menu-item>
    <el-menu-item index="/exchange">交易</el-menu-item>
    <el-menu-item index="/asset">资产</el-menu-item>
  </el-menu>
</template>

<script>
  // 怎么不靠点击本身来切换选项
  import { mapActions, mapState } from 'vuex'
  export default {
    name: "menu-nav",
    data() {
      return {
        // activeIndex: 'market'
      }
    },
    computed: {
      ...mapState([ 'current' ])
    },
    methods: {
      ...mapActions([ 'getCoinInfo' ]),
      /*handleSelect(key, keyPath) {
        if (key === 'market') {
          this.$router.push({ path: `/${key}/${this.current.symbol}` })
        }
        else {
          this.$router.push({ path: `/${key}`})
        }
      }*/
    },
    watch: {
      /*$route(to, from) {
        console.log(to)
      }*/
    }
  }
</script>

<style scoped>

</style>
