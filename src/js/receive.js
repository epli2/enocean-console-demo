import io from 'socket.io-client'
export { startReceive, startDemo }

const tempTopic = 'sensor/04016897/Temperature'
const humidTopic = 'sensor/04016897/Humidity'
const illumTopic = 'sensor/04016777/Illumination'

/**
 * サーバからセンサのデータを取得する関数
 *
 * @param {Object} store VuexのStoreオブジェクト
 */
function startReceive (store) {
  let namespace = '/api/socket'
  let socket = io.connect(location.protocol + '//' + document.domain + ':' + 5000 + namespace, {
    transports: ['websocket', 'polling']
  });

  ['temperature', 'humidity', 'illumination', 'audio'].forEach(p => {
    fetch(`http://localhost:5000/api/history/${p}/1000`).then((res) => res.json()).then((json) => {
      json.data.forEach(d => storeData(store, d, false))
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

/**
 * JSONファイルからデモ用データを読み込む関数
 *
 * @param {Object} store VuexのStoreオブジェクト
 */
function startDemo (store) {
  let demodataName = window.location.search === '' ? 'demodata.json' : window.location.search.slice(1)
  fetch(`static/js/${demodataName}`).then((res) => res.json()).then((json) => {
    const READNUM = 11
    // JSONファイルからデータを10件読んで配列に追加
    json.temperature.slice(json.temperature.length - READNUM, json.temperature.length - 1).forEach(d => storeData(store, d, true))
    json.humidity.slice(json.humidity.length - READNUM, json.humidity.length - 1).forEach(d => storeData(store, d, true))
    json.illumination.slice(json.illumination.length - READNUM, json.illumination.length - 1).forEach(d => storeData(store, d, true))
    json.audio.slice(json.audio.length - READNUM, json.audio.length - 1).forEach(d => storeData(store, d, true))
    store.dispatch('sortData')

    // 残りのデータ
    let restTemps = json.temperature.slice(0, json.temperature.length - READNUM)
    let restHumids = json.humidity.slice(0, json.humidity.length - READNUM)
    let restIllums = json.illumination.slice(0, json.illumination.length - READNUM)
    let restAudios = json.audio.slice(0, json.audio.length - READNUM)

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

/**
 * VuexのStoreにデータを保存する関数
 *
 * @param {Object} store VuexのStoreオブジェクト
 * @param {Object} data センサデータ
 * @param {boolean} isDemo デモ用データかどうか
 */
function storeData (store, data, isDemo) {
  let dataFormatted = {
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
