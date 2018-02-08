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
import { isInRange, getxAxesMin, reduceArray } from '@/js/utils.js'

export default {
  components: {
    Chart
  },
  props: ['range', 'timeUnit', 'height'],
  computed: {
    chartData () {
      // storeのデータが空のとき, 空のChartデータを返す
      if (this.illumArray.length === 0) {
        return {
          datasets: [
            {
              label: 'anomaly score',
              yAxisID: 'y-axis-2',
              backgroundColor: 'rgba(255, 0, 0, 0.5)'
            },
            {
              label: '照度',
              yAxisID: 'y-axis-1',
              backgroundColor: '#FFF02B'
            }
          ]
        }
      }
      return this.setIllumData()
    },
    xAxesMax () {
      if (this.illumArray.length === 0) {
        return null
      }
      return this.range === 'all' ? null : new Date(this.illumArray[this.illumArray.length - 1].timestamp)
    },
    xAxesMin () {
      if (this.illumArray.length === 0) {
        return null
      }
      return getxAxesMin(this.illumArray, this.range)
    },
    ...mapGetters([
      'illumArray'
    ])
  },
  methods: {
    setIllumData () {
      let illumArrayRanged = this.illumArray.filter((o) => isInRange(this.range, new Date(o.timestamp), new Date(this.illumArray[this.illumArray.length - 1].timestamp)))
      let illumDataArray = illumArrayRanged.map((o) => o.data)
      this.$emit('calculated', {
        max: Math.max.apply(null, illumDataArray),
        min: Math.min.apply(null, illumDataArray),
        ave: Math.round(illumDataArray.reduce((sum, value) => sum + value) / illumArrayRanged.length * 100) / 100
      })

      let illumArrayRangedReduced = reduceArray(illumArrayRanged, this.range)

      return {
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: illumArrayRangedReduced.map((o) => { return { x: new Date(o.timestamp), y: o.ret } })
          },
          {
            label: '照度',
            yAxisID: 'y-axis-1',
            backgroundColor: '#FFF02B',
            data: illumArrayRangedReduced.map((o) => { return { x: new Date(o.timestamp), y: o.y } })
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
