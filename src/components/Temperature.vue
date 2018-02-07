<template>
  <div>
    <div class="Chart">
      <chart :chartData="chartData" :height="285"></chart>
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
  props: ['range'],
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
        labels: tempArrayRanged.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: tempArrayRanged.map((o) => o.ret)
          },
          {
            label: '温度',
            yAxisID: 'y-axis-1',
            backgroundColor: '#FF7257',
            data: tempDataArray
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
