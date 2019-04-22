const models = require('../db/db')

const RegTmp = (req, res) => {
  console.log(req.body)
  let TmpModel = new models.Tmp({
    name: 'tmp',
    arr: [
      { body: '1' }, { body: '2' }
    ]
  })
  TmpModel.save((err) => {
    if (err) {
      res.status(400)
    }
    else (
      res.json({
        success: true
      })
    )
  })
}

const PushTmpChild = (req, res) => {
  let pushBody = req.body.pushBody
  models.Tmp.findOne({ name: 'tmp' }, (err, doc) => {
    if (err) {
      res.status(401)
    }
    if (!doc) {
      res.json({
        success: false
      })
    }
    else {
      doc.arr.push({ body: pushBody })
      doc.save((err) => {
        if (err) {
          res.status(400)
        }
        else {
          res.json({
            success: true
          })
        }
      })
    }
  })
}

module.exports = (router) => {
  router.get('/reg', RegTmp)
  router.post('/push', PushTmpChild)
}
