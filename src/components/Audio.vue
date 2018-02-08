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
import { isInRange, getxAxesMin } from '@/js/utils.js'

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
      if (this.audioArray.length === 0) {
        return null
      }
      return this.range === 'all' ? null : new Date(this.audioArray[this.audioArray.length - 1].timestamp)
    },
    xAxesMin () {
      if (this.audioArray.length === 0) {
        return null
      }
      return getxAxesMin(this.audioArray, this.range)
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
