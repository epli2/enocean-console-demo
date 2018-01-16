<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">📈</router-link>
    <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> -->

    <div class="navbar-nav-scroll" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/Temperature" role="button">
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
         <li class="nav-item active">
          <router-link class="nav-link" to="/Audio" role="button">
            🎤 音
          </router-link>
        </li>
      </ul>
    </div>
    <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
      <li class="nav-item active">
        <a class="nav-link">
          現在 気温{{ nowTemp }}℃ / 湿度{{ nowHumid }}% / 照度{{ nowIllum }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    nowTemp () {
      if (this.tempArray.length === 0) {
        return 0
      }
      return Math.round(this.tempArray[this.tempArray.length - 1].data * 100) / 100
    },
    nowHumid () {
      if (this.humidArray.length === 0) {
        return 0
      }
      return Math.round(this.humidArray[this.humidArray.length - 1].data * 100) / 100
    },
    nowIllum () {
      if (this.illumArray.length === 0) {
        return 0
      }
      return this.illumArray[this.illumArray.length - 1].data
    },
    ...mapState([
      'tempArray',
      'humidArray',
      'illumArray'
    ])
  },
  methods: {
  }
}
</script>
