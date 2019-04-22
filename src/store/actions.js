import Vue from 'vue'
import store from './index'
import axios from 'axios'
import * as types from './mutation-types'

export const getCoinInfo = ({ commit }, type) => {
  commit(types.GET_COININFO, { type })
};

export const updateCoinPrice = ({ commit }, data) => {
  let type = data.type,
    price = data.price,
    flags = data.flags,
    hour24price = data.hour24price
  commit(types.UPDATE_COINPRICE, { type, price, flags, hour24price })
}

export const getKLineData = ({ commit }, type) => {
  let baseURL = 'https://min-api.cryptocompare.com'
  let urls = [
    `${baseURL}/data/histominute?fsym=${type}&tsym=BTC&limit=240&aggregate=1&e=CCCAGG`,
    `${baseURL}/data/histominute?fsym=${type}&tsym=BTC&limit=288&aggregate=5&e=CCCAGG`,
    `${baseURL}/data/histohour?fsym=${type}&tsym=BTC&limit=240&aggregate=1&e=CCCAGG`,
    `${baseURL}/data/histoday?fsym=${type}&tsym=BTC&limit=240&aggregate=1&e=CCCAGG`
  ]
  let requests = urls.map(url => axios.get(url))
  axios.all(requests)
    .then(res => {
      let mKLine = res[0].data.Data
      let fKLine = res[1].data.Data
      let hKLine = res[2].data.Data
      let dKLine = res[3].data.Data
      commit(types.GET_KLINEDATA, { mKLine, fKLine, hKLine, dKLine })
    })
}

export const changeKLineType = ({ commit }, type) => {
  commit(types.CHANGE_KLINETYPE, { type })
}

export const changeMenuNav = ({ commit }, type) => {
  commit(types.CHANGE_MENUNAV, { type })
}

export const getPersonalAsset = ({ commit }, data) => {
  commit(types.GET_PERSONALASSET, { data })
}
