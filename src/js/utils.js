export { getTimeStr, isInRange }

function getTimeStr (isotime) {
  let hour = isotime.getHours()
  let minute = isotime.getMinutes()
  let second = isotime.getSeconds()
  let timestr = '' + ((hour > 12) ? hour - 12 : hour)
  if (hour === 0) {
    timestr = '12'
  }
  timestr += ((minute < 10) ? ':0' : ':') + minute
  timestr += ((second < 10) ? ':0' : ':') + second
  timestr += (hour >= 12) ? ' P.M.' : ' A.M.'
  return timestr
}

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
    case 'month':
      return (nowTime - isotime) / 1000 <= 60 * 60 * 24 * 30
    case 'all':
      return true
  }
}
