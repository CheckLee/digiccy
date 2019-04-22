const express = require('express')
const router = express.Router()
const AssetController = require('../controller/asset')

AssetController(router)

module.exports = router
