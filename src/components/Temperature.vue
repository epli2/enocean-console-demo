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
      <chart :chartData="chartData" :height="285"></chart>
    </div>
    <div class="buttons">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button v-on:click="setRange('hour')" type="button" class="btn btn-secondary">1時間</button>
        <button v-on:click="setRange('day')" type="button" class="btn btn-secondary">1日</button>
        <button v-on:click="setRange('month')" type="button" class="btn btn-secondary">1ヶ月</button>
        <button v-on:click="setRange('all')" type="button" class="btn btn-secondary">全部</button>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from './Chart'
import { getTimeStr, isInRange } from '@/js/utils.js'

export default {
  components: {
    Chart
  },
  data () {
    return {
      maxTemp: Number,
      minTemp: Number,
      aveTemp: Number,
      chartData: {},
      range: String
    }
  },
  mounted () {
    let self = this
    self.range = 'month'
    self.setWeatherData()
    window.addEventListener('tempupdate', function (e) {
      self.setWeatherData()
    })
  },
  methods: {
    setRange (range) {
      this.range = range
      this.setWeatherData()
    },
    setWeatherData () {
      let tempArray = JSON.parse(localStorage.getItem('temp'))
      let tempArrayRanged = tempArray.filter((o) => {
        if (isInRange(this.range, new Date(o.timestamp))) {
          return true
        } else {
          return false
        }
      })
      let tempDataArray = tempArrayRanged.map((o) => o.data)
      let tempAnomalyScoreArray = tempArrayRanged.map((o) => o.ret)
      this.maxTemp = Math.max.apply(null, tempDataArray.map((v) => { return Math.round(v * 100) / 100 }))
      this.minTemp = Math.min.apply(null, tempDataArray.map((v) => { return Math.round(v * 100) / 100 }))
      this.aveTemp = Math.round(tempDataArray.reduce((sum, value) => sum + value) / tempDataArray.length * 100) / 100
      this.chartData = {
        labels: tempArrayRanged.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
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
.buttons {
  text-align: center;
}
</style>
