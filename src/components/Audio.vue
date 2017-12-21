<template>
  <div>
    <div class="Chart">
      <chart :chartData="chartData" :height="320"></chart>
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
      chartData: {},
      range: String
    }
  },
  mounted () {
    let self = this
    self.range = 'month'
    self.setAudioData()
    window.addEventListener('audioupdate', function (e) {
      self.setAudioData()
    })
  },
  methods: {
    setRange (range) {
      this.range = range
      this.setAudioData()
    },
    setAudioData () {
      let audioArray = JSON.parse(localStorage.getItem('audio')).filter((o) => {
        if (isInRange(this.range, new Date(o.timestamp))) {
          return true
        } else {
          return false
        }
      })
      this.chartData = {
        labels: audioArray.map(o => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: '#FF0000',
            data: audioArray.map(o => o.ret)
          },
          {
            label: '音量',
            yAxisID: 'y-axis-1',
            backgroundColor: '#87CEFA',
            data: audioArray.map((o) => o.data)
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.buttons {
  text-align: center;
}
</style>
