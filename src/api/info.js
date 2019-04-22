import axios from '../axios'

export default {
  GetAllSymbolsAndPrices() {
    return axios.get('/local/info/prices')
  }
}
