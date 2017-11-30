<template>
  <div>
    <section class="row text-center placeholders">
      <div class="col-6 col-sm-3 placeholder">
        <h1>24℃</h1>
        <h4>最高気温</h4>
        <div class="text-muted">前日+4℃</div>
      </div>
      <div class="col-6 col-sm-3 placeholder">
        <h1>15℃</h1>
        <h4>最低気温</h4>
        <span class="text-muted">前日-1℃</span>
      </div>
      <div class="col-6 col-sm-3 placeholder">
        <h1>81%</h1>
        <h4>最高湿度</h4>
        <span class="text-muted">前日±0%</span>
      </div>
      <div class="col-6 col-sm-3 placeholder">
        <h1>72%</h1>
        <h4>最高湿度</h4>
        <span class="text-muted">前日+2%</span>
      </div>
    </section>
    <div class="Chart">
      <weather-chart></weather-chart>
    </div>
  </div>
</template>

<script>
import WeatherChart from './WeatherChart'

export default {
  components: {
    WeatherChart
  },
  mounted () {
  }
}
</script>

<style scoped>
.placeholders {
  padding-bottom: 3rem;
}
</style>
