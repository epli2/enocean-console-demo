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

function isInRange (range, isotime) {
  let nowTime = new Date()
  switch (range) {
    case '1min':
      if ((nowTime - isotime) / 1000 <= 60) {
        return true
      } else {
        return false
      }
    case '10min':
      if ((nowTime - isotime) / 1000 <= 60 * 10) {
        return true
      } else {
        return false
      }
    case 'hour':
      if ((nowTime - isotime) / 1000 <= 60 * 60) {
        return true
      } else {
        return false
      }
    case 'day':
      if ((nowTime - isotime) / 1000 <= 60 * 60 * 24) {
        return true
      } else {
        return false
      }
    case 'month':
      if ((nowTime - isotime) / 1000 <= 60 * 60 * 24 * 30) {
        return true
      } else {
        return false
      }
    case 'all':
      return true
  }
}
