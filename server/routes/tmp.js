const express = require('express')
const TmpController = require('../controller/tmp')
const router = express.Router()

TmpController(router)

module.exports = router
