<template>
  <div>
    <div class="Chart">
      <chart :chartData="chartData" :height="362"></chart>
    </div>
    <div class="buttons">
      <div class="btn-group" role="group">
        <button v-on:click="setRange('1min')" type="button" class="btn btn-secondary" v-bind:class="{active: range === '1min'}">1分</button>
        <button v-on:click="setRange('10min')" type="button" class="btn btn-secondary" v-bind:class="{active: range === '10min'}">10分</button>
        <button v-on:click="setRange('hour')" type="button" class="btn btn-secondary" v-bind:class="{active: range === 'hour'}">1時間</button>
        <button v-on:click="setRange('all')" type="button" class="btn btn-secondary" v-bind:class="{active: range === 'all'}">全部</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from './Chart'
import { getTimeStr, isInRange } from '@/js/utils.js'

export default {
  components: {
    Chart
  },
  data () {
    return {
      range: 'all'
    }
  },
  computed: {
    chartData () {
      // storeのデータが空のとき, 空のChartデータを返す
      if (this.audioArray.length === 0) {
        return {
          datasets: [
            {
              label: 'anomaly score',
              yAxisID: 'y-axis-2',
              backgroundColor: 'rgba(255, 0, 0, 0.5)'
            },
            {
              label: '音量',
              yAxisID: 'y-axis-1',
              backgroundColor: '#87CEFA'
            }
          ]
        }
      }
      return this.setAudioData()
    },
    ...mapGetters([
      'audioArray'
    ])
  },
  methods: {
    setRange (range) {
      this.range = range
    },
    setAudioData () {
      let audioArrayRanged = this.audioArray.filter((o) => isInRange(this.range, new Date(o.timestamp), new Date(this.audioArray[this.audioArray.length - 1].timestamp)))
      return {
        labels: audioArrayRanged.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: audioArrayRanged.map((o) => o.ret)
          },
          {
            label: '音量',
            yAxisID: 'y-axis-1',
            backgroundColor: '#87CEFA',
            data: audioArrayRanged.map((o) => o.data)
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
