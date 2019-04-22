/*const getters = {
  allCoinTypes: state => {
    /!*let arr = state.coinTypes
    // 等价于 arr.unshift('USD', 'BTC')
    arr.unshift(...['USD', 'BTC'])*!/
    // 不能这么用，会改变 coinTypes
    return state.coinTypes.unshift('USD', 'BTC')
  }
}
export default getters*/

export const testArr = state => state.testArr
