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
    msg.temperature.forEach(d => storeData(store, d, true))
    msg.humidity.forEach(d => storeData(store, d, true))
    msg.illumination.forEach(d => storeData(store, d, true))
    msg.audio.forEach(d => storeData(store, d, true))
    store.dispatch('sortData')
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
