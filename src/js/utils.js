export { getTimeStr }

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
