<template>
  <div>
    <div class="Chart">
      <chart :chartData="chartData" :timeUnit="timeUnit" :xAxesMax="xAxesMax" :xAxesMin="xAxesMin" :height="height"></chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from './Chart'
import { isInRange } from '@/js/utils.js'

export default {
  components: {
    Chart
  },
  props: ['range', 'timeUnit', 'height'],
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
    xAxesMax () {
      return this.range === 'all' ? null : new Date(this.audioArray[this.audioArray.length - 1].timestamp)
    },
    xAxesMin () {
      let now = new Date(this.audioArray[this.audioArray.length - 1].timestamp)
      let elapsedsec = (now - new Date(this.audioArray[0].timestamp)) / 1000
      switch (this.range) {
        case '1min':
          return elapsedsec < 60 ? new Date(now.setMinutes(now.getMinutes() - 1)) : null
        case '10min':
          return elapsedsec < 60 * 10 ? new Date(now.setMinutes(now.getMinutes() - 10)) : null
        case 'hour':
          return elapsedsec < 60 * 60 ? new Date(now.setHours(now.getHours() - 1)) : null
        case 'day':
          return elapsedsec < 60 * 60 * 24 ? new Date(now.setHours(now.getHours() - 24)) : null
        case 'week':
          return elapsedsec < 60 * 60 * 24 * 7 ? new Date(now.setDate(now.getDate() - 7)) : null
        case 'month':
          return elapsedsec < 60 * 60 * 24 * 30 ? new Date(now.setDate(now.getDate() - 30)) : null
        case 'all':
          return null
      }
    },
    ...mapGetters([
      'audioArray'
    ])
  },
  methods: {
    setAudioData () {
      let audioArrayRanged = this.audioArray.filter((o) => isInRange(this.range, new Date(o.timestamp), new Date(this.audioArray[this.audioArray.length - 1].timestamp)))
      let audioDataArray = audioArrayRanged.map((o) => o.data)
      this.$emit('calculated', {
        max: Math.max.apply(null, audioDataArray),
        min: Math.min.apply(null, audioDataArray),
        ave: Math.round(audioDataArray.reduce((sum, value) => sum + value) / audioArrayRanged.length * 100) / 100
      })
      return {
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: audioArrayRanged.map((o) => { return { x: new Date(o.timestamp), y: o.ret } })
          },
          {
            label: '音量',
            yAxisID: 'y-axis-1',
            backgroundColor: '#87CEFA',
            data: audioArrayRanged.map((o) => { return { x: new Date(o.timestamp), y: o.data } })
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
