<template>
  <div>
    <section class="row text-center placeholders">
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ maxIllum }}</h4>
        <h5>最高照度</h5>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ minIllum }}</h4>
        <h5>最低照度</h5>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ aveIllum }}</h4>
        <h5>平均照度</h5>
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
      maxIllum: Number,
      minIllum: Number,
      aveIllum: Number,
      chartData: {}
    }
  },
  mounted () {
    let self = this
    self.setIllumData()
    window.addEventListener('illumupdate', function (e) {
      self.setIllumData()
    })
  },
  methods: {
    setIllumData () {
      let illumArray = JSON.parse(localStorage.getItem('illum'))
      let illumDataArray = illumArray.map((o) => { return o.data })
      let illumAnomalyScoreArray = illumArray.map((o) => o.ret)
      this.maxIllum = Math.max.apply(null, illumDataArray)
      this.minIllum = Math.min.apply(null, illumDataArray)
      this.aveIllum = Math.round(illumDataArray.reduce((sum, value) => sum + value) / illumDataArray.length * 100) / 100
      this.chartData = {
        labels: illumArray.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: '#FF0000',
            data: illumAnomalyScoreArray
          },
          {
            label: '照度',
            yAxisID: 'y-axis-1',
            backgroundColor: '#FFF02B',
            data: illumDataArray
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
