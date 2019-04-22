import { formatDate } from "./formatDate";

export default function processRawData(rawData, type) {
  var categoryData = []
  var values = []
  var volumes = []
  var fmt
  if (type === 'm' || type === 'f') { fmt = 'yyyy-MM-dd hh:mm' }
  else if (type === 'h') { fmt = 'yyyy-MM-dd hh时' }
  else if (type === 'd') { fmt = 'yyyy-MM-dd' }
  // console.log(fmt)

  for (var i = 0; i < rawData.length; i++) {
    // 首先 rawDate 里面的 time 缺秒位，所以拼接000
    let timestamp = rawData[i].time + '000'
    // timestamp 是字符串，不能直接用 new Date()，要转换成数字
    let time = new Date(Number(timestamp))
    // console.log(time)
    let formatTime = formatDate(time, fmt)
    // console.log(formatTime)
    categoryData.push(formatTime)
    values.push([rawData[i].open, rawData[i].close, rawData[i].low, rawData[i].high, rawData[i].volumesfrom])
    volumes.push([i, rawData[i].volumefrom, rawData[i].open > rawData[i].close ? 1 : -1])
  }

  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  }
}

