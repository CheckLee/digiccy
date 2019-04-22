import axios from '../axios'

export default {
  RegTmp() {
    return axios.get('/local/tmp/reg')
  },
  PushTmpChild(data) {
    return axios.post('/local/tmp/push', data)
  }
}
