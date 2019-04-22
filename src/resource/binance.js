const binance = require('node-binance-api')
var Promise = require('Promise')

binance.options({
  'APIKEY': '<api key>',
  'APISECRET': '<api secret>'
});

function getStockPrice() {
  let prices = binance.getPrices();
  return prices;
}

function getCandlesticksByName(name) {
  let timestamp = Date.parse(new Date());
  return binance.getCandlesticks(name, '5m', {limit: 5000, endTime: timestamp})
}

/*binance.candlesticks('CDTBTC', '5m', function (ticks, symbol) {
  console.log("candlesticks()", ticks);
  let last_tick = ticks[ticks.length - 1];
  let [time, open, high, low, close, volumn, closeTime, assetVolumn, trades, buyBaseVolume, buyAssetVolumn, ignored] = last_tick;
  console.log(symbol + "last close:" + close);
}, {limit: 5000, endTime: 1514764800000});*/

// binance.getCandlesticks('CDTBTC', '5m', {limit: 5000, endTime: 1514764800000}).then(res => console.log(res));
// exports.getLastCoinPrice = getLastCoinPrice;
exports.getStockPrice = getStockPrice;
exports.getCandlesticksByName = getCandlesticksByName;
