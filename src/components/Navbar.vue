<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">📈</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/" role="button">
            🌡 温度
          </router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/Humidity" role="button">
            💧 湿度
          </router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/Illumination" role="button">
            ☀ 照度
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav my-2 my-lg-0">
        <li class="nav-item active">
          <a class="nav-link">
            現在 気温{{ nowTemp }}℃ / 湿度{{ nowHumid }}% / 照度{{ nowIllum }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      nowTemp: Number,
      nowHumid: Number,
      nowIllum: Number
    }
  },
  mounted () {
    let self = this
    self.setNowWeather()
    window.addEventListener('tempupdate', function (e) {
      self.setNowWeather()
    })
    window.addEventListener('humidupdate', function (e) {
      self.setNowWeather()
    })
    window.addEventListener('illumupdate', function (e) {
      self.setNowWeather()
    })
  },
  methods: {
    setNowWeather () {
      let tempArray = JSON.parse(localStorage.getItem('temp'))
      let humidArray = JSON.parse(localStorage.getItem('humid'))
      let illumArray = JSON.parse(localStorage.getItem('illum'))
      this.nowTemp = Math.round(tempArray[tempArray.length - 1].data * 100) / 100
      this.nowHumid = Math.round(humidArray[humidArray.length - 1].data * 100) / 100
      this.nowIllum = illumArray[illumArray.length - 1].data
    }
  }
}
</script>
