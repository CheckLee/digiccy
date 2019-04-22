const binance = require('../example')
const models = require('../db/db')

const GetAllSymbolsAndPrices = (req, res) => {
  binance.getStockPrice()
    .then(data => {
      if (!data) {
        res.status(401)
        reject('Error!')
      }
      else {
        res.json(data)
      }
    })
}



module.exports = (router) => {
  router.get('/prices', GetAllSymbolsAndPrices)
}
