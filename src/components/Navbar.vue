<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-nav-scroll" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/" role="button">
            📈 All
          </router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/single/temperature" role="button">
            🌡 温度
          </router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/single/humidity" role="button">
            💧 湿度
          </router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/single/illumination" role="button">
            ☀ 照度
          </router-link>
        </li>
         <li class="nav-item active">
          <router-link class="nav-link" to="/single/audio" role="button">
            🎤 音
          </router-link>
        </li>
      </ul>
    </div>
    <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
      <button v-if="isDemoMode" v-on:click="switchDemoMode" type="button" class="btn btn-secondary">demo mode</button>
      <button v-else type="button" v-on:click="switchDemoMode" class="btn btn-success">realtime mode</button>
      <li class="nav-item active">
        <a class="nav-link">
          現在 気温{{ nowTemp }}℃ / 湿度{{ nowHumid }}% / 照度{{ nowIllum }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
      'isDemoMode'
    ]),
    ...mapGetters([
      'tempArray',
      'humidArray',
      'illumArray'
    ])
  },
  methods: {
    ...mapActions([
      'switchDemoMode'
    ])
  }
}
</script>
