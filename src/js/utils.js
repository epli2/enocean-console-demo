import { simplifyPath } from '@/js/douglasPeucker.js'

export { isInRange, getxAxesMin, reduceArray }

function isInRange (range, isotime, nowTime) {
  switch (range) {
    case '1min':
      return (nowTime - isotime) / 1000 <= 60
    case '10min':
      return (nowTime - isotime) / 1000 <= 60 * 10
    case 'hour':
      return (nowTime - isotime) / 1000 <= 60 * 60
    case 'day':
      return (nowTime - isotime) / 1000 <= 60 * 60 * 24
    case 'week':
      return (nowTime - isotime) / 1000 <= 60 * 60 * 24 * 7
    case 'month':
      return (nowTime - isotime) / 1000 <= 60 * 60 * 24 * 30
    case 'all':
      return true
  }
}

function getxAxesMin (dataArray, range) {
  let now = new Date(dataArray[dataArray.length - 1].timestamp)
  let elapsedsec = (now - new Date(dataArray[0].timestamp)) / 1000
  switch (range) {
    case '1min':
      return elapsedsec < 60 ? new Date(now.setMinutes(now.getMinutes() - 1)) : null
    case '10min':
      return elapsedsec < 60 * 10 ? new Date(now.setMinutes(now.getMinutes() - 10)) : null
    case 'hour':
      return elapsedsec < 60 * 60 ? new Date(now.setHours(now.getHours() - 1)) : null
    case 'day':
      return elapsedsec < 60 * 60 * 24 ? new Date(now.setHours(now.getHours() - 24)) : null
    case 'week':
      return elapsedsec < 60 * 60 * 24 * 7 ? new Date(now.setDate(now.getDate() - 7)) : null
    case 'month':
      return elapsedsec < 60 * 60 * 24 * 30 ? new Date(now.setDate(now.getDate() - 30)) : null
    case 'all':
      return null
  }
}

function reduceArray (dataArray, range) {
  switch (range) {
    case '1min':
      return dataArray.map((v) => { return {y: v.data, ret: v.ret, timestamp: v.timestamp} })
    case '10min':
      return dataArray.map((v) => { return {y: v.data, ret: v.ret, timestamp: v.timestamp} })
    case 'hour':
      return dataArray.map((v) => { return {y: v.data, ret: v.ret, timestamp: v.timestamp} })
    case 'day':
      return simplifyPath(dataArray, 1)
    case 'week':
      return simplifyPath(dataArray, 1)
    case 'month':
      return simplifyPath(dataArray, 2)
    case 'all':
      return dataArray.map((v) => { return {y: v.data, ret: v.ret, timestamp: v.timestamp} })
  }
}
