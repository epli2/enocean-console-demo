<template>
  <div>
    <section class="row text-center placeholders">
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ maxTemp }}℃</h4>
        <h5>最高気温</h5>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ minTemp }}℃</h4>
        <h5>最低気温</h5>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ aveTemp }}℃</h4>
        <h5>平均気温</h5>
      </div>
    </section>
    <div class="Chart">
      <chart :chartData="chartData" height="320"></chart>
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
  padding-bottom: 0.5rem;
}
</style>
