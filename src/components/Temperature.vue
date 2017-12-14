<template>
  <div>
    <section class="row text-center placeholders">
      <div class="col-6 col-sm-4 placeholder">
        <h1>{{ maxTemp }}℃</h1>
        <h4>最高気温</h4>
        <div class="text-muted">前日+0℃</div>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h1>{{ minTemp }}℃</h1>
        <h4>最低気温</h4>
        <span class="text-muted">前日±0℃</span>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h1>{{ aveTemp }}℃</h1>
        <h4>平均気温</h4>
        <span class="text-muted">前日±0℃</span>
      </div>
    </section>
    <div class="Chart">
      <chart :chartData="chartData"></chart>
    </div>
  </div>
</template>

<script>
import Chart from './Chart'
import { getTimeStr } from '@/js/utils.js'

export default {
  components: {
    Chart
  },
  data () {
    return {
      maxTemp: Number,
      minTemp: Number,
      aveTemp: Number,
      chartData: {}
    }
  },
  mounted () {
    let self = this
    self.setWeatherData()
    window.addEventListener('tempupdate', function (e) {
      self.setWeatherData()
    })
  },
  methods: {
    setWeatherData () {
      let tempArray = JSON.parse(localStorage.getItem('temp'))
      let tempDataArray = tempArray.map((o) => o.data)
      let tempAnomalyScoreArray = tempArray.map((o) => o.ret)
      this.maxTemp = Math.max.apply(null, tempDataArray.map((v) => { return Math.round(v * 100) / 100 }))
      this.minTemp = Math.min.apply(null, tempDataArray.map((v) => { return Math.round(v * 100) / 100 }))
      this.aveTemp = Math.round(tempDataArray.reduce((sum, value) => sum + value) / tempDataArray.length * 100) / 100
      this.chartData = {
        labels: tempArray.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: '#FF0000',
            data: tempAnomalyScoreArray
          },
          {
            label: '温度',
            yAxisID: 'y-axis-1',
            backgroundColor: '#FF7257',
            data: tempDataArray
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.placeholders {
  padding-bottom: 3rem;
}
</style>
