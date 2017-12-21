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
      maxIllum: Number,
      minIllum: Number,
      aveIllum: Number,
      chartData: {},
      range: String
    }
  },
  mounted () {
    let self = this
    self.range = 'month'
    self.setIllumData()
    window.addEventListener('illumupdate', function (e) {
      self.setIllumData()
    })
  },
  methods: {
    setRange (range) {
      this.range = range
      this.setIllumData()
    },
    setIllumData () {
      let illumArray = JSON.parse(localStorage.getItem('illum'))
      let illumArrayRanged = illumArray.filter((o) => {
        if (isInRange(this.range, new Date(o.timestamp))) {
          return true
        } else {
          return false
        }
      })
      let illumDataArray = illumArrayRanged.map((o) => { return o.data })
      let illumAnomalyScoreArray = illumArrayRanged.map((o) => o.ret)
      this.maxIllum = Math.max.apply(null, illumDataArray)
      this.minIllum = Math.min.apply(null, illumDataArray)
      this.aveIllum = Math.round(illumDataArray.reduce((sum, value) => sum + value) / illumArrayRanged.length * 100) / 100
      this.chartData = {
        labels: illumArrayRanged.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
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
.buttons {
  text-align: center;
}
</style>
