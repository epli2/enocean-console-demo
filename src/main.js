// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mqtt from 'mqtt'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
    mqtt
  },
  created () {
    var date = new Date()
    var timestamp = date.getTime()
    var c = {
      client: null,
      clientId: this.city + '_clock_' + timestamp,
      broker: 'ws://192.168.212.33:8080/mqtt',
      mqttUser: 'james-kitchen',
      mqttPass: 'webdino',
      mqttTopic: 'sensor/002DAEE8/#',
      tempTopic: 'sensor/04016897/Temperature',
      humidTopic: 'sensor/04016897/Humidity',
      illumTopic: 'sensor/04016777/Illumination'
    }
    this.mqttConnect(c)
  },
  methods: {
    mqttConnect (c) {
      console.log(c.broker)
      var options = {
        cmd: 'connect',
        clientId: c.clientId,
        username: c.mqttUser,
        password: c.mqttPass
      }

      c.client = mqtt.connect(c.broker, options)
      console.log('connecting....')

      c.client.on('connect', function (connect) { // 接続時の制御
        console.log('connected.')
      })

      c.client.on('message', function (topic, message, packet) {
        // console.log(topic, String.fromCharCode.apply(null, message), packet)
        try {
          var data = JSON.parse(String.fromCharCode.apply(null, message))
          var dataFormatted = {
            sensor: topic,
            data: data.value,
            timestamp: data.timestamp
          }

          var setLocalStorage = function (dataType, dataFormatted) {
            var dataArray = []
            if (localStorage.getItem(dataType) !== null) {
              dataArray = dataArray.concat(JSON.parse(localStorage.getItem(dataType)))
            }
            dataArray.push(dataFormatted)
            localStorage.setItem(dataType, JSON.stringify(dataArray))
          }
          let tempevent = new Event('tempupdate')
          let humidevent = new Event('humidupdate')
          let illumevent = new Event('illumupdate')

          switch (topic) {
            case c.tempTopic:
              setLocalStorage('temp', dataFormatted)
              window.dispatchEvent(tempevent)
              break
            case c.humidTopic:
              setLocalStorage('humid', dataFormatted)
              window.dispatchEvent(humidevent)
              break
            case c.illumTopic:
              setLocalStorage('illum', dataFormatted)
              window.dispatchEvent(illumevent)
              break
            default:
              console.log(`unexpedted topic: ${topic}`)
          }
          console.log(dataFormatted)
        } catch (e) {
          console.log('JSON parse error.', e)
        }
      })

      c.client.on('offline', function () {
        console.log('offline.')
      })

      c.client && c.client.subscribe('sensor/#', null, function (err, granted) { console.log(err) })
    }
  }
})
