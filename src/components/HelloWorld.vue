<template>
  <div class="hello">
    <el-container>
      <el-header>
        <div class="box-card">
          <img src="https://www.cryptocompare.com/media/1383699/cdt.png" alt="" width="30" height="30" class="box-card__img">
          <span>CoinDash(CDT)</span>
        </div>
        <menu-nav class="menu-nav"></menu-nav>
        <div class="person-info">
          <div class="notLogin" v-if="!logInfo.isLogin">
            <el-button type="primary" size="medium" @click="reg">注册</el-button>
            <el-button type="success" size="medium" @click="login">登录</el-button>
          </div>
          <div class="isLogin" v-else>
            Hello, {{ logInfo.username }} !
          </div>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <coin-nav class="coin-nav" :isCollapse="isCollapse"></coin-nav>
          <div id="showPanel">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'
  import CoinNav from './CoinNav'
  import MenuNav from './MenuNav'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        isCollapse: false
      }
    },
    methods: {
      ...mapActions([ 'getCoinList', 'getKLineData' ]),
      back() {
        this.isCollapse = !this.isCollapse
      },
      reg() {
        this.$router.push('/reg')
      },
      login() {
        this.$router.push('/login')
      }
    },
    computed: {
      ...mapState(['logInfo'])
    },
    beforeMount() {
      // this.getCoinList()
      
    },
    mounted() {
    
    },
    components: { CoinNav, MenuNav }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '_helloworld.scss';
</style>
