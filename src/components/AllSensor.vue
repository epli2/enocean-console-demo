<template>
  <div>
    <section class="row">
      <div class="Chart col-6 col-sm-6">
        <div class="Chart">
          <chart :chartData="tempChartData" :height="200"></chart>
        </div>
      </div>
      <div class="Chart col-6 col-sm-6">
        <chart :chartData="humidChartData" :height="200"></chart>
      </div>
    </section>
    <section class="row">
      <div class="Chart col-6 col-sm-6">
        <chart :chartData="illumChartData" :height="200"></chart>
      </div>
      <div class="Chart col-6 col-sm-6">
        <chart :chartData="audioChartData" :height="200"></chart>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Chart from './Chart'
import { getTimeStr } from '@/js/utils.js'

export default {
  components: {
    Chart
  },
  computed: {
    tempChartData () {
      return this.setTempData()
    },
    humidChartData () {
      return this.setHumidData()
    },
    illumChartData () {
      return this.setIllumData()
    },
    audioChartData () {
      return this.setAudioData()
    },
    ...mapState([
      'tempArray',
      'humidArray',
      'illumArray',
      'audioArray'
    ])
  },
  methods: {
    setTempData () {
      let tempDataArray = this.tempArray.map((o) => o.data)
      let tempAnomalyScoreArray = this.tempArray.map((o) => o.ret)
      return {
        labels: this.tempArray.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: tempAnomalyScoreArray
          },
          {
            label: '温度',
            yAxisID: 'y-axis-1',
            backgroundColor: '#FF7257',
            data: tempDataArray
          }
        ]
      }
    },
    setHumidData () {
      let humidDataArray = this.humidArray.map((o) => o.data)
      let humidAnomalyScoreArray = this.humidArray.map((o) => o.ret)
      return {
        labels: this.humidArray.map((o) => getTimeStr(new Date(o.timestamp))),
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
    },
    setIllumData () {
      let illumDataArray = this.illumArray.map((o) => { return o.data })
      let illumAnomalyScoreArray = this.illumArray.map((o) => o.ret)
      return {
        labels: this.illumArray.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: illumAnomalyScoreArray
          },
          {
            label: '照度',
            yAxisID: 'y-axis-1',
            backgroundColor: '#FFF02B',
            data: illumDataArray
          }
        ]
      }
    },
    setAudioData () {
      return {
        labels: this.audioArray.map(o => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            data: this.audioArray.map(o => o.ret)
          },
          {
            label: '音量',
            yAxisID: 'y-axis-1',
            backgroundColor: '#87CEFA',
            data: this.audioArray.map((o) => o.data)
          }
        ]
      }
    }
  }
}
</script>
