import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  // 登录消息
  logInfo: {
    isLogin: false,
    token: null,
    username: ''
  },

  // coin info
  coinList: {
    // 只有BTC是to USD，其他都是to BTC
    BTC: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'BitCoin' },
    ETH: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'Ethereum' },
    LTC: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'Litecoin' },
    NEO: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'NEO' },
    ETC: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'Ethereum Classic' },
    CDT: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'CoinDash' },
    EOS: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'EOS' },
    QTUM: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'QTUM' },
    DGB: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'DigiByte' },
    DASH: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'DigitalCash' },
    DT: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'DarkToken' },
    MRY: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'MurrayCoin' },
    SNT: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'Status Network Token' },
    STORJ: { currentPrice: 0, flags: 0, hour24price: 0, fullname: 'Storj' }
  },
  coinTypes: ['ETH', 'LTC', 'NEO', 'ETC', 'CDT', 'EOS', 'QTUM', 'DGB',
    'DASH', 'DT', 'MRY', 'SNT', 'STORJ'],
  subscription: [
    '5~CCCAGG~BTC~USD',
    '5~CCCAGG~ETH~BTC',
    '5~CCCAGG~LTC~BTC',
    '5~CCCAGG~NEO~BTC',
    '5~CCCAGG~ETC~BTC',
    '5~CCCAGG~CDT~BTC',
    '5~CCCAGG~EOS~BTC',
    '5~CCCAGG~QTUM~BTC',
    '5~CCCAGG~DGB~BTC',
    '5~CCCAGG~DASH~BTC',
    '5~CCCAGG~DT~BTC',
    '5~CCCAGG~MRY~BTC',
    '5~CCCAGG~SNT~BTC',
    '5~CCCAGG~STORJ~BTC',
  ],
  current: {
    symbol:'',
    fullname: '',
    mKLine: {},
    fKLine: {},
    hKLine: {},
    dKLine: {},
    kLineType: 'm'
  },
  personalAsset: {},
  menuNavSelect: '',
  coinNavSelect: '',
  testArr: [1, 10, 2, 3, 4]
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
