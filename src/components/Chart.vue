<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: Object,
    timeUnit: String,
    xAxesMax: Date,
    xAxesMin: Date
  },
  watch: {
    'timeUnit': {
      handler (newOption, oldOption) {
        this.$data._chart.destroy()
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    },
    'xAxesMax': {
      handler (newOption, oldOption) {
        this.$data._chart.destroy()
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    },
    'xAxesMin': {
      handler (newOption, oldOption) {
        this.$data._chart.destroy()
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  },
  computed: {
    options () {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              /* http://www.chartjs.org/docs/latest/axes/cartesian/linear.html#axis-range-settings
              *  x軸(横軸)をどの範囲で表示するか指定する
              *  max: 右端, min: 左端
              */
              max: this.xAxesMax,
              min: this.xAxesMin,
              unit: this.timeUnit
            }
          }],
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1'
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'right',
            id: 'y-axis-2',
            // grid line settings
            gridLines: {
              drawOnChartArea: false // only want the grid lines for one axis to show up
            },
            ticks: {
              callback: (v) => v.toExponential(1)
            }
          }]
        },
        elements: {
          line: {
            tension: 0 // 軽量化のためベジェ曲線を無効にする
          }
        },
        // 軽量化のためアニメーションを無効にする
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsiveAnimationDuration: 0
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
