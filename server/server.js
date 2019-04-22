const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const config = require('config-lite')
// const test = require('./test')
// const example = require('./example')
const infoRoutes = require('./routes/info')
const assetRoutes = require('./routes/asset')
const tmpRoutes = require('./routes/tmp')

global.ROOT_PATH = __dirname;

var app = express()
// socket.io 用法
// var httpServer = http.Server(app)
// var io = require('socket.io')(httpServer)

// httpServer.listen(3000);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// app.use(express.static('public'))

// 指向路由
app.use('/local/info', infoRoutes)
app.use('/local/asset', assetRoutes)
app.use('/local/tmp', tmpRoutes)

app.listen(3002, function () {
  console.log(ROOT_PATH)
})


console.log(__dirname)

app.get('/', function (req, res) {
  res.send('hello, socket.io')
})



/*io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })
  example.getCandlesticksByName('CDTBTC').then((res) => {
    socket.emit('candle', {res: res})
  })

  // 实时发数据，不过是通过setInterval控制
  /!*test.start(function () {
    example.getStockPrice().then((res) => {
      let price = res.CDTBTC
      socket.emit('test', {price: price})
    })
  })*!/
  socket.on('my other event', function (data) {
    console.log(data)
  })
})*/


