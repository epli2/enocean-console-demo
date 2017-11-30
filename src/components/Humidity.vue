<template>
  <div>
    <section class="row text-center placeholders">
      <div class="col-6 col-sm-4 placeholder">
        <h1>{{ maxHumid }}%</h1>
        <h4>最高湿度</h4>
        <div class="text-muted">前日±0%</div>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h1>{{ minHumid }}%</h1>
        <h4>最低湿度</h4>
        <span class="text-muted">前日±0%</span>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h1>{{ aveHumid }}%</h1>
        <h4>平均湿度</h4>
        <span class="text-muted">前日±0%</span>
      </div>
    </section>
    <div class="Chart">
      <chart :chartData="chartData"></chart>
    </div>
  </div>
</template>

<script>
import Chart from './Chart'

export default {
  components: {
    Chart
  },
  data () {
    return {
      maxHumid: Number,
      minHumid: Number,
      aveHumid: Number,
      chartData: {}
    }
  },
  mounted () {
    let self = this
    self.setHumidData()
    window.addEventListener('humidupdate', function (e) {
      self.setHumidData()
    })
  },
  methods: {
    setHumidData () {
      let humidArray = JSON.parse(localStorage.getItem('humid'))
      let humidDataArray = humidArray.map((o) => o.data)
      this.maxHumid = Math.max.apply(null, humidDataArray.map((v) => { return Math.round(v * 100) / 100 }))
      this.minHumid = Math.min.apply(null, humidDataArray.map((v) => { return Math.round(v * 100) / 100 }))
      this.aveHumid = Math.round(humidDataArray.reduce((sum, value) => sum + value) / humidDataArray.length * 100) / 100
      this.chartData = {
        labels: humidArray.map((o) => o.timestamp),
        datasets: [
          {
            label: '湿度',
            backgroundColor: '#BAFF91',
            data: humidDataArray
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
