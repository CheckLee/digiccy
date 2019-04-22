import axios from '../axios'

export default {
  RegPersonalAsset(data) {
    return axios.post('/local/asset/reg', data)
  },
  GetPersonalAsset(id) {
    return axios.get(`/local/asset/user/${id}`)
  },
  InsertTradeLog(data) {
    return axios.post('/local/asset/insertTradeLog', data)
  }
}
