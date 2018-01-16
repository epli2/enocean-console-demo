<template>
  <div>
    <section class="row text-center placeholders">
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ maxHumid }}%</h4>
        <h5>最高湿度</h5>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ minHumid }}%</h4>
        <h5>最低湿度</h5>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ aveHumid }}%</h4>
        <h5>平均湿度</h5>
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
import { mapState } from 'vuex'
import Chart from './Chart'
import { getTimeStr, isInRange } from '@/js/utils.js'

export default {
  components: {
    Chart
  },
  data () {
    return {
      maxHumid: 0,
      minHumid: 0,
      aveHumid: 0,
      range: 'all'
    }
  },
  computed: {
    chartData () {
      // storeのデータが空のとき, 空のChartデータを返す
      if (this.humidArray.length === 0) {
        return {
          datasets: [
            {
              label: 'anomaly score',
              yAxisID: 'y-axis-2',
              backgroundColor: 'rgba(255, 0, 0, 0.5)'
            },
            {
              label: '湿度',
              yAxisID: 'y-axis-1',
              backgroundColor: '#BAFF91'
            }
          ]
        }
      }
      return this.setHumidData()
    },
    ...mapState([
      'humidArray'
    ])
  },
  methods: {
    setRange (range) {
      this.range = range
    },
    setHumidData () {
      let humidArrayRanged = this.humidArray.filter((o) => {
        if (isInRange(this.range, new Date(o.timestamp))) {
          return true
        } else {
          return false
        }
      })
      let humidDataArray = humidArrayRanged.map((o) => o.data)
      let humidAnomalyScoreArray = humidArrayRanged.map((o) => o.ret)
      this.maxHumid = Math.max.apply(null, humidDataArray.map((v) => { return Math.round(v * 100) / 100 }))
      this.minHumid = Math.min.apply(null, humidDataArray.map((v) => { return Math.round(v * 100) / 100 }))
      this.aveHumid = Math.round(humidDataArray.reduce((sum, value) => sum + value) / humidDataArray.length * 100) / 100
      return {
        labels: humidArrayRanged.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: humidAnomalyScoreArray
          },
          {
            label: '湿度',
            yAxisID: 'y-axis-1',
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
  padding-bottom: 0.5rem;
}
.buttons {
  text-align: center;
}
</style>
