const express = require('express')
const InfoController = require('../controller/info')
const router = express.Router()

InfoController(router)

module.exports = router
