import io from 'socket.io-client'
export { startReceive }

const tempTopic = 'sensor/04016897/Temperature'
const humidTopic = 'sensor/04016897/Humidity'
const illumTopic = 'sensor/04016777/Illumination'

function startReceive () {
  // let socket = io('http://localhost:5000', {
  //   transports: ['websocket'],
  //   path: '/api/socket'
  // })
  var namespace = '/api/socket'
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace)

  socket.on('connect', function () {
    console.log('connected!')
    socket.emit('connection', {data: 'connection from demoapp'})
  })

  socket.on('data', function (data) {
    console.log(data)
    storeData(data)
  })
}

function setLocalStorage (dataType, dataFormatted) {
  let dataArray = []
  if (localStorage.getItem(dataType) !== null) {
    dataArray = dataArray.concat(JSON.parse(localStorage.getItem(dataType)))
  }
  dataArray.push(dataFormatted)
  localStorage.setItem(dataType, JSON.stringify(dataArray))
}

function storeData (data) {
  let jsondata = JSON.parse(data)
  let dataFormatted = {
    sensor: jsondata.topic,
    data: jsondata.value,
    timestamp: jsondata.timestamp,
    ret: jsondata.ret
  }

  switch (jsondata.topic) {
    case tempTopic:
      setLocalStorage('temp', dataFormatted)
      window.dispatchEvent(new Event('tempupdate'))
      break
    case humidTopic:
      setLocalStorage('humid', dataFormatted)
      window.dispatchEvent(new Event('humidupdate'))
      break
    case illumTopic:
      setLocalStorage('illum', dataFormatted)
      window.dispatchEvent(new Event('illumupdate'))
      break
    default:
      console.log(`unexpedted topic: ${jsondata.topic}`)
  }
}
