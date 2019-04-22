const Promise = require('bluebird')
const mongoose = require('mongoose')
const config = require('config-lite')(__dirname)

mongoose.Promise = Promise

var Schema = mongoose.Schema
var apiUrl = 'mongodb://'+ config.mongo.username +':'+ config.mongo.password +'@ds145275.mlab.com:45275/checklee'

var coinSchema = new Schema({
  id: { type: Number, unique: true },
  symbol: { type: String, unique: true },
  fullname: { type: String},
  imgurl: { type: String }
})

var tradeLogSchema = new Schema({
  date: { type: String },
  buy: { type: String, unique: true },
  sell: { type: String, unique: true },
  buyAmount: { type: Number },
  sellAmount: { type: Number }
})

var assetSchema = new Schema({
  user: { type: String, unique: true },
  totalAsset: { type: Number },
  totalBTC: { type: Number, default: 0 },
  ETH: { type: Number, default: 0 },
  LTC: { type: Number, default: 0 },
  NEO: { type: Number, default: 0 },
  ETC: { type: Number, default: 0 },
  CDT: { type: Number, default: 0 },
  EOS: { type: Number, default: 0 },
  QTUM: { type: Number, default: 0 },
  DGB: { type: Number, default: 0 },
  DASH: { type: Number, default: 0 },
  DT: { type: Number, default: 0 },
  MRY: { type: Number, default: 0 },
  SNT: { type: Number, default: 0 },
  STORJ: { type: Number, default: 0 },
  tradeLog: [tradeLogSchema]
})

var tmpChildSchema = new Schema({
  body: String,
  date: { type: Date, default: new Date() }
})

var tmpSchema = new Schema({
  name: String,
  arr: [tmpChildSchema]
})

var models = {
  Coin: mongoose.model('Coin', coinSchema),
  Asset: mongoose.model('Asset', assetSchema),
  Tmp: mongoose.model('Test', tmpSchema)
}

mongoose.connect(apiUrl)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function () {
  console.log('MongoDB start successfully')
})

module.exports = models
