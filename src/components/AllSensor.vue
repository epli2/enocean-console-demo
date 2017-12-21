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
import Chart from './Chart'
import { getTimeStr } from '@/js/utils.js'

export default {
  components: {
    Chart
  },
  data () {
    return {
      tempChartData: {},
      humidChartData: {},
      illumChartData: {},
      audioChartData: {}
    }
  },
  mounted () {
    let self = this
    self.setWeatherData()
    self.setHumidData()
    self.setIllumData()
    self.setAudioData()
    window.addEventListener('tempupdate', function (e) {
      self.setWeatherData()
    })
    window.addEventListener('humidupdate', function (e) {
      self.setHumidData()
    })
    window.addEventListener('illumupdate', function (e) {
      self.setIllumData()
    })
    window.addEventListener('audioupdate', function (e) {
      self.setAudioData()
    })
  },
  methods: {
    setWeatherData () {
      let tempArray = JSON.parse(localStorage.getItem('temp'))
      let tempDataArray = tempArray.map((o) => o.data)
      let tempAnomalyScoreArray = tempArray.map((o) => o.ret)
      this.tempChartData = {
        labels: tempArray.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: '#FF0000',
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
      let humidArray = JSON.parse(localStorage.getItem('humid'))
      let humidDataArray = humidArray.map((o) => o.data)
      let humidAnomalyScoreArray = humidArray.map((o) => o.ret)
      this.humidChartData = {
        labels: humidArray.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: '#FF0000',
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
      let illumArray = JSON.parse(localStorage.getItem('illum'))
      let illumDataArray = illumArray.map((o) => { return o.data })
      let illumAnomalyScoreArray = illumArray.map((o) => o.ret)
      this.illumChartData = {
        labels: illumArray.map((o) => getTimeStr(new Date(o.timestamp))),
        datasets: [
          {
            label: 'anomaly score',
            yAxisID: 'y-axis-2',
            backgroundColor: '#FF0000',
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
      let audioArray = JSON.parse(localStorage.getItem('audio'))
      this.audioChartData = {
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
