import * as types from './mutation-types'

const mutations = {
  [types.GET_COININFO](state, { type }) {
    state.current.symbol = type
    state.current.fullname = state.coinList[type].fullname
  },
  [types.UPDATE_COINPRICE](state, { type, price, flags, hour24price }){
    if (type === 'BTC') {
      state.coinList[type].currentPrice = price
    }
    else if (type !== 'BTC' && state.coinList.BTC.currentPrice !== 0) {
      let BTCtoUSD = state.coinList.BTC.currentPrice
      state.coinList[type].currentPrice = price * BTCtoUSD
    }
    state.coinList[type].flags = flags
    state.coinList[type].hour24price = hour24price
  },
  [types.GET_KLINEDATA](state, { mKLine, fKLine, hKLine, dKLine }) {
    state.current.mKLine = mKLine
    state.current.fKLine = fKLine
    state.current.hKLine = hKLine
    state.current.dKLine = dKLine
  },
  [types.CHANGE_KLINETYPE](state, { type }) {
    state.current.kLineType = type
  },
  [types.CHANGE_MENUNAV](state, { type }) {
    state.menunav = type
  },
  [types.GET_PERSONALASSET](state, { data }) {
    state.personalAsset = data
  },
  [types.LOGIN]: (state, data) => {
    // console.log(data)
    state.logInfo.token = data
    state.logInfo.isLogin = true
    let logInfo = JSON.stringify(state.logInfo)
    localStorage.setItem('token', logInfo)
  },
  [types.LOGOUT]: (state) => {
    state.token = null
    state.isLogin = false
    state.username = ''
    let logInfo = JSON.stringify(state.logInfo)
    localStorage.setItem('token', logInfo)
  },
  [types.GETUSER]: (state, data) => {
    state.username = data
    let logInfo = JSON.stringify(state.logInfo)
    localStorage.setItem('token', logInfo)
  }
}

export default mutations

/*
export const GET_COININFO = (state, { type }) => {
  state.current.symbol = type
  state.current.fullname = state.coinList[type].fullname
}

export const UPDATE_COINPRICE = (state, { type, price, flags, hour24price }) => {
  if (type === 'BTC') {
    state.coinList[type].currentPrice = price
  }
  else if (type !== 'BTC' && state.coinList.BTC.currentPrice !== 0) {
    let BTCtoUSD = state.coinList.BTC.currentPrice
    state.coinList[type].currentPrice = price * BTCtoUSD
  }
  state.coinList[type].flags = flags
  state.coinList[type].hour24price = hour24price
}

export const GET_KLINEDATA = (state, { mKLine, fKLine, hKLine, dKLine }) => {
  state.current.mKLine = mKLine
  state.current.fKLine = fKLine
  state.current.hKLine = hKLine
  state.current.dKLine = dKLine
}

export const CHANGE_KLINETYPE = (state, { type }) => {
  state.current.kLineType = type
}

export const CHANGE_MENUNAV = (state, { type }) => {
  state.menunav = type
}

export const GET_PERSONALASSET = (state, { data }) => {
  state.personalAsset = data
}
*/
