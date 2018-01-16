import io from 'socket.io-client'
export { startReceive, startDemo }

const tempTopic = 'sensor/04016897/Temperature'
const humidTopic = 'sensor/04016897/Humidity'
const illumTopic = 'sensor/04016777/Illumination'

function startReceive (store) {
  let namespace = '/api/socket'
  let socket = io.connect(location.protocol + '//' + document.domain + ':' + 5000 + namespace, {
    transports: ['websocket', 'polling']
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
    let jsondata = JSON.parse(data)
    let dataFormatted = {
      data: jsondata.volume,
      timestamp: jsondata.timestamp,
      ret: jsondata.ret
    }
    store.dispatch('pushData', { data: dataFormatted, dataType: 'audio' })
  })
}

function startDemo (store) {
  // eslint-disable-next-line
  $.ajax({
    type: 'GET',
    url: 'static/js/demodata.json',
    dataType: 'json'
  }).done((msg) => {
    msg.temperature.forEach(d => storeData(store, d, true))
    msg.humidity.forEach(d => storeData(store, d, true))
    msg.illumination.forEach(d => storeData(store, d, true))
    msg.audio.forEach(d => {
      let dataFormatted = {
        data: d.volume,
        timestamp: d.timestamp,
        ret: d.ret
      }
      store.dispatch('pushData', { data: dataFormatted, dataType: 'demo-audio' })
    })
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
    default:
      console.log(`unexpedted topic: ${data.topic}`)
  }
}
