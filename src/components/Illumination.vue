<template>
  <div>
    <section class="row text-center placeholders">
      <div class="col-6 col-sm-4 placeholder">
        <h1>{{ maxIllum }}</h1>
        <h4>最高照度</h4>
        <div class="text-muted">前日+4</div>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h1>{{ minIllum }}</h1>
        <h4>最低照度</h4>
        <span class="text-muted">前日-1</span>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h1>{{ aveIllum }}</h1>
        <h4>平均照度</h4>
        <span class="text-muted">前日±0</span>
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
            backgroundColor: '#FF0000',
            data: illumAnomalyScoreArray
          },
          {
            label: '照度',
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
  padding-bottom: 3rem;
}
</style>
