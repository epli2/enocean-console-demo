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
  let isSameDate = function (timeA, timeB) {
    if (timeA.getFullYear() === timeB.getFullYear() &&
        timeA.getMonth() === timeB.getMonth() &&
        timeA.getDate() === timeB.getDate()) {
      return true
    }
    return false
  }
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
      if (isSameDate(isotime, nowTime) &&
          isotime.getHours() === nowTime.getHours()) {
        return true
      } else {
        return false
      }
    case 'day':
      if (isSameDate(isotime, nowTime)) {
        return true
      } else {
        return false
      }
    case 'month':
      if (isotime.getFullYear() === nowTime.getFullYear() &&
          isotime.getMonth() === nowTime.getMonth()) {
        return true
      } else {
        return false
      }
    case 'all':
      return true
  }
}
