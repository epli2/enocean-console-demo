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
      mqttTopic: 'sensor/002DAEE8/#'
    }
    this.mqttConnect(c)
  },
  methods: {
    mqttConnect: function (c) {
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

      // 最初に一通りくるらしいのでソレを記録する。
      let onSwitch = {
        all: false,
        AO: false,
        AI: false,
        BO: false,
        B2: false
      }

      c.client.on('message', function (topic, message, packet) {
        console.log(topic, String.fromCharCode.apply(null, message), packet)
        try {
          var data = JSON.parse(String.fromCharCode.apply(null, message))

          if (data.value.cmd === 'getAll') {
              // window.location.href='/clock/tokyo/'
          }

          // 全てが一通り来るのを吸収する
          if (onSwitch.all === false) {
            switch (data.value) {
              case 'AO':
                onSwitch['AO'] = true
                break
              case 'AI':
                onSwitch['AI'] = true
                break
              case 'BO':
                onSwitch['BO'] = true
                break
              case 'BI':
                onSwitch['BI'] = true
                break
            }
            if (onSwitch['AO'] && onSwitch['AI'] && onSwitch['BO'] && onSwitch['BI']) {
              onSwitch['all'] = true
              console.log('最初の奴はクリア')
            }
            return false
          }

          console.log(data.value)

          if (data.time) {
            console.log('[pub-sub]:' + (new Date().getTime() - data.time) + ' ms')
          }
        } catch (e) {
          console.log('JSON parse error.', e)
        }
      })

      c.client.on('offline', function () {
        console.log('offline.')
      })

      c.client && c.client.subscribe(c.mqttTopic, null, function (err, granted) { console.log(err) })
    }
  }
})
