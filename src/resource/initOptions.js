const upColor = '#00da3c';
const downColor = '#ec0000';
import store from '../store/index'

/*
// kLineType 是当前k线类型
// tmp 是取字段，比如 mKLine
// rawData 是原生数据
var kLineType = store.state.current.kLineType
var tmp = kLineType + 'KLine'
var rawData = store.state.current[tmp]

// close,high,low,open,time,volumefrom,volumeto

var categoryData = []
var values = []
var volumes = []

for (var i = 0; i < rawData.length; i++) {
  categoryData.push(rawData[i].time)
  values.push([rawData[i].open, rawData[i].close, rawData[i].low, rawData[i].high, rawData[i].volumesfrom])
  volumes.push([i, rawData[i].volumefrom, rawData[i].open > rawData[i].close ? 1 : -1])
}
var data = {
  categoryData: categoryData,
  values: values,
  volumes: volumes
}*/

const options = {
  backgroundColor: '#fff',
  animation: false,
  legend: {
    bottom: 10,
    left: 'center',
    data: ['Dow-Jones index']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#000'
    },
    position: function (pos, params, el, elRect, size) {
      var obj = { top: 10 };
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
      return obj;
    }
  },
  axisPointer: {
    link: { xAxisIndex: 'all' },
    label: {
      backgroundColor: '#777'
    }
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false
      },
      brush: {
        type: ['lineX', 'clear']
      }
    }
  },
  brush: {
    xAxisIndex: 'all',
    brushLink: 'all',
    outOfBrush: {
      colorAlpha: 0.1
    }
  },
  visualMap: {
    show: false,
    seriesIndex: 1,
    dimension: 2,
    pieces: [{
      value: 1,
      color: downColor
    }, {
      value: -1,
      color: upColor
    }]
  },
  grid: [
    {
      left: '10%',
      right: '8%',
      height: '50%'
    },
    {
      left: '10%',
      right: '8%',
      top: '63%',
      height: '16%'
    }
  ],
  xAxis: [
    {
      type: 'category',
      // data: data.categoryData,
      data: [],
      scale: true,
      boundaryGap: false,
      axisLine: {onZero: false},
      splitLine: {show: false},
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        z: 100
      }
    },
    {
      type: 'category',
      gridIndex: 1,
      // data: data.categoryData,
      data: [],
      scale: true,
      boundaryGap : false,
      axisLine: {onZero: false},
      axisTick: {show: false},
      splitLine: {show: false},
      axisLabel: {show: false},
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
      // axisPointer: {
      //     label: {
      //         formatter: function (params) {
      //             var seriesValue = (params.seriesData[0] || {}).value;
      //             return params.value
      //             + (seriesValue != null
      //                 ? '\n' + echarts.format.addCommas(seriesValue)
      //                 : ''
      //             );
      //         }
      //     }
      // }
    }
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true
      }
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: {show: false},
      axisLine: {show: false},
      axisTick: {show: false},
      splitLine: {show: false}
    }
  ],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 80,
      end: 100
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '85%',
      start: 80,
      end: 100
    }
  ],
  series: [
    {
      name: 'Dow-Jones index',
      type: 'candlestick',
      // data: data.values,
      data: [],
      itemStyle: {
        normal: {
          color: upColor,
          color0: downColor,
          borderColor: null,
          borderColor0: null
        }
      },
      tooltip: {
        formatter: function (param) {
          param = param[0];
          return [
            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            'Open: ' + param.data[0] + '<br/>',
            'Close: ' + param.data[1] + '<br/>',
            'Lowest: ' + param.data[2] + '<br/>',
            'Highest: ' + param.data[3] + '<br/>'
          ].join('');
        }
      }
    },
    {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      // data: data.volumes
      data: []
    }
  ]
}

/**/


export default options
