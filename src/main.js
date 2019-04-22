// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import socketio from 'socket.io-client'
import store from './store/index'
import axios from './axios'


Vue.use(VueSocketio, socketio('https://streamer.cryptocompare.com/'))
Vue.use(ElementUI)

Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  components: { App },
  template: '<App/>'
})
