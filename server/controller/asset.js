const models = require('../db/db')

// 放一个隐藏注册生成 personalAsset 功能

const RegPersonalAsset = function (req, res) {
  let AssetModel = new models.Asset({
    user: req.body.user,
    totalAsset: 1000
  })
  models.Asset.findOne({ user: AssetModel.user }, (err, doc) => {
    if (err) {
      res.status(401)
    }
    if (doc) {
      console.log("用户已经存在！")
      res.json({
        success: false
      })
    }
    else {
      AssetModel.save((err) => {
        if (err) {
          res.status(400)
        }
        console.log(`用户${AssetModel.user}注册成功`)
        res.json({
          success: true
        })
      })
    }
  })
}

const GetPersonalAsset = function (req, res) {
  // 这边测试一下能不能用 id
  console.log(req.params.id)
  if (req.params.id) {
    var username = req.params.id
    models.Asset.findOne({ user: username }, (err, doc) => {
      if (err) {
        res.status(401)
      }
      if (!doc) {
        console.log(`用户${username}不存在！`)
        res.json({
          success: false
        })
      }
      else {
        res.send(doc)
      }
    })
  }
}

// 不同交易类型决定 req 数据不同
/*
  req.body.tradeType
  1 —— USD to BTC : totalAsset/totalBTC
  2 —— BTC to USD : totalAsset/totalBTC
  3 —— XXX to BTC : totalBTC/totalXXX
  4 —— BTC to XXX : totalBTC/totalXXX
*/
const InsertTradeLog = function (req, res) {
  // console.log(req.body)
  let user = req.body.user
  let tradeLog = req.body.tradeLog
  let tradeType = req.body.tradeType
  let totalAsset, coinType, totalCoin
  let totalBTC = req.body.totalBTC
  if (tradeType === 1 || tradeType === 2) {
    totalAsset = req.body.totalAsset
  }
  else if (tradeType === 3 || tradeType == 4) {
    coinType = req.body.coinType
    totalCoin = req.body.totalCoin
  }
  models.Asset.findOne({ user: user }, (err, doc) => {
    if (err) {
      res.status(401)
    }
    if (!doc) {
      console.log(`用户${user}不存在！`)
      res.json({
        success: false
      })
    }
    else {
      doc.totalBTC = totalBTC
      if (tradeType === 1 || tradeType === 2) doc.totalAsset = totalAsset
      if (tradeType === 3 || tradeType === 4) {
        console.log(doc[coinType])
        doc[coinType] = totalCoin
      }
      doc.tradeLog.push(tradeLog)
      doc.save((err) => {
        if (err) {
          res.status(400)
        }
        else {
          console.log('成功插入交易记录')
          res.json({
            success: true
          })
        }
      })
    }
  })
}

module.exports = (router) => {
  router.get('/user/:id', GetPersonalAsset)
  router.post('/reg', RegPersonalAsset)
  router.post('/insertTradeLog', InsertTradeLog)
}
