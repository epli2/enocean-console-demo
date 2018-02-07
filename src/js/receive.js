import io from 'socket.io-client'
export { startReceive, startDemo }

const tempTopic = 'sensor/04016897/Temperature'
const humidTopic = 'sensor/04016897/Humidity'
const illumTopic = 'sensor/04016777/Illumination'

function startReceive (store) {
  let namespace = '/api/socket'
  let socket = io.connect(location.protocol + '//' + document.domain + ':' + 5000 + namespace, {
    transports: ['websocket', 'polling']
  });

  ['temperature', 'humidity', 'illumination', 'audio'].forEach(p => {
    // eslint-disable-next-line
    $.ajax({
      type: 'GET',
      url: `http://localhost:5000/api/history/${p}/1000`,
      dataType: 'json'
    }).done((msg) => {
      msg.data.forEach(d => storeData(store, d, false))
      store.dispatch('sortData')
    })
  })

  socket.on('connect', function () {
    console.log('connected!')
    socket.emit('connection', {data: 'connection from demoapp'})
  })

  socket.on('data', function (data) {
    console.log(data)
    storeData(store, JSON.parse(data), false)
  })

  socket.on('audio', function (data) {
    console.log(data)
    storeData(store, JSON.parse(data), false)
  })
}

function startDemo (store) {
  let demodataName = window.location.search === '' ? 'demodata.json' : window.location.search.slice(1)
  // eslint-disable-next-line
  $.ajax({
    type: 'GET',
    url: `static/js/${demodataName}`,
    dataType: 'json'
  }).done((msg) => {
    // JSONファイルからデータを10件読んで配列に追加
    msg.temperature.slice(msg.temperature.length - 11, msg.temperature.length - 1).forEach(d => storeData(store, d, true))
    msg.humidity.slice(msg.humidity.length - 11, msg.humidity.length - 1).forEach(d => storeData(store, d, true))
    msg.illumination.slice(msg.illumination.length - 11, msg.illumination.length - 1).forEach(d => storeData(store, d, true))
    msg.audio.slice(msg.audio.length - 11, msg.audio.length - 1).forEach(d => storeData(store, d, true))
    store.dispatch('sortData')

    // 残りのデータ
    let restTemps = msg.temperature.slice(0, msg.temperature.length - 11)
    let restHumids = msg.humidity.slice(0, msg.humidity.length - 11)
    let restIllums = msg.illumination.slice(0, msg.illumination.length - 11)
    let restAudios = msg.audio.slice(0, msg.audio.length - 11)

    // 気温, 湿度, 照度のデータを10秒ごとに追加
    setInterval(() => {
      if (restTemps.length <= 0 || restHumids.length <= 0 || restIllums.length <= 0) {
        return
      }
      storeData(store, restTemps.pop(), true)
      storeData(store, restHumids.pop(), true)
      storeData(store, restIllums.pop(), true)
    }, 10000)

    // 音声のデータを1秒ごとに追加
    setInterval(() => {
      if (restAudios.length <= 0) {
        return
      }
      storeData(store, restAudios.pop(), true)
    }, 1000)
  })
}

function storeData (store, data, isDemo) {
  let dataFormatted = {
    sensor: data.topic,
    data: data.value,
    timestamp: data.timestamp,
    ret: data.ret
  }

  let isDemoString = isDemo ? 'demo-' : ''
  switch (data.topic) {
    case tempTopic:
      store.dispatch('pushData', { data: dataFormatted, dataType: isDemoString + 'temp' })
      break
    case humidTopic:
      store.dispatch('pushData', { data: dataFormatted, dataType: isDemoString + 'humid' })
      break
    case illumTopic:
      store.dispatch('pushData', { data: dataFormatted, dataType: isDemoString + 'illum' })
      break
    case 'audio':
      store.dispatch('pushData', { data: dataFormatted, dataType: isDemoString + 'audio' })
      break
    default:
      console.log(`unexpedted topic: ${data.topic}`)
  }
}
