import io from 'socket.io-client'
export { setData }

const tempTopic = 'sensor/04016897/Temperature'
const humidTopic = 'sensor/04016897/Humidity'
const illumTopic = 'sensor/04016777/Illumination'

function setData (store) {
  startReceive(store)
}

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
    storeData(store, JSON.parse(data))
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

function storeData (store, data) {
  let dataFormatted = {
    sensor: data.topic,
    data: data.value,
    timestamp: data.timestamp,
    ret: data.ret
  }

  switch (data.topic) {
    case tempTopic:
      store.dispatch('pushData', { data: dataFormatted, dataType: 'temp' })
      break
    case humidTopic:
      store.dispatch('pushData', { data: dataFormatted, dataType: 'humid' })
      break
    case illumTopic:
      store.dispatch('pushData', { data: dataFormatted, dataType: 'illum' })
      break
    default:
      console.log(`unexpedted topic: ${data.topic}`)
  }
}
