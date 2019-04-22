const binance = require('node-binance-api')
const currentDate = new Date()
const currentTime = currentDate.getTime()/1000
const example = require('./test')

var interval, onChangeHandler;

function simulateChange() {
  // var r = Math.random();
  onChangeHandler();
}

function start(onChange) {
  stop();
  onChangeHandler = onChange;
  interval = setInterval(simulateChange, 5000);
}

function stop() {
  clearInterval(interval);
}

exports.start = start;
exports.stop = stop;
