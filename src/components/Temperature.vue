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
      if (this.tempArray.length === 0) {
        return {
          datasets: [
            {
              label: 'anomaly score',
              yAxisID: 'y-axis-2',
              backgroundColor: 'rgba(255, 0, 0, 0.5)'
            },
            {
              label: '温度',
              yAxisID: 'y-axis-1',
              backgroundColor: '#FF7257'
            }
          ]
        }
      }
      return this.setTempData()
    },
    xAxesMax () {
      return this.range === 'all' ? null : new Date(this.tempArray[this.tempArray.length - 1].timestamp)
    },
    xAxesMin () {
      let now = new Date(this.tempArray[this.tempArray.length - 1].timestamp)
      let elapsedsec = (now - new Date(this.tempArray[0].timestamp)) / 1000
      switch (this.range) {
        case '1min':
          return elapsedsec < 60 ? new Date(now.setMinutes(now.getMinutes() - 1)) : null
        case '10min':
          return elapsedsec < 60 * 10 ? new Date(now.setMinutes(now.getMinutes() - 10)) : null
        case 'hour':
          return elapsedsec < 60 * 60 ? new Date(now.setHours(now.getHours() - 1)) : null
        case 'all':
          return null
      }
    },
    ...mapGetters([
      'tempArray'
    ])
  },
  methods: {
    setTempData () {
      let tempArrayRanged = this.tempArray.filter((o) => isInRange(this.range, new Date(o.timestamp), new Date(this.tempArray[this.tempArray.length - 1].timestamp)))
      let tempDataArray = tempArrayRanged.map((o) => o.data)
      this.$emit('calculated', {
        max: Math.max.apply(null, tempDataArray.map((v) => Math.round(v * 100) / 100)),
        min: Math.min.apply(null, tempDataArray.map((v) => Math.round(v * 100) / 100)),
        ave: Math.round(tempDataArray.reduce((sum, value) => sum + value) / tempDataArray.length * 100) / 100
      })
      return {
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: tempArrayRanged.map((o) => { return { x: new Date(o.timestamp), y: o.ret } })
          },
          {
            label: '温度',
            yAxisID: 'y-axis-1',
            backgroundColor: '#FF7257',
            data: tempArrayRanged.map((o) => { return { x: new Date(o.timestamp), y: o.data } })
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
