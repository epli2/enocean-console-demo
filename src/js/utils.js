export { isInRange }

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
