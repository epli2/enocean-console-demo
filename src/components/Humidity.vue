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
    xAxesMax () {
      return this.range === 'all' ? null : new Date(this.humidArray[this.humidArray.length - 1].timestamp)
    },
    xAxesMin () {
      let now = new Date(this.humidArray[this.humidArray.length - 1].timestamp)
      let elapsedsec = (now - new Date(this.humidArray[0].timestamp)) / 1000
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
      'humidArray'
    ])
  },
  methods: {
    setHumidData () {
      let humidArrayRanged = this.humidArray.filter((o) => isInRange(this.range, new Date(o.timestamp), new Date(this.humidArray[this.humidArray.length - 1].timestamp)))
      let humidDataArray = humidArrayRanged.map((o) => o.data)
      this.$emit('calculated', {
        max: Math.max.apply(null, humidDataArray.map((v) => Math.round(v * 100) / 100)),
        min: Math.min.apply(null, humidDataArray.map((v) => Math.round(v * 100) / 100)),
        ave: Math.round(humidDataArray.reduce((sum, value) => sum + value) / humidDataArray.length * 100) / 100
      })
      return {
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: humidArrayRanged.map((o) => { return { x: new Date(o.timestamp), y: o.ret } })
          },
          {
            label: '湿度',
            yAxisID: 'y-axis-1',
            backgroundColor: '#BAFF91',
            data: humidArrayRanged.map((o) => { return { x: new Date(o.timestamp), y: o.data } })
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
