import axios from 'axios'
import store from './store'
import * as types from './store/mutation-types'
import router from './router'

// axios 配置
// const instance = axios.create()

// axios 配置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 5000

// axios拦截，向header添加token
axios.interceptors.request.use(
  config => {
    if (store.state.logInfo.token) {
      config.headers.Authorization = `token ${store.state.logInfo.token}`
    }
    // console.log(config.headers.Authorization)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录界面
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(err.response.data)
  }
)

export default axios

/*export default {
  UserLogin(data) {
    return instance.post('/api/login', data)
  }
}*/
