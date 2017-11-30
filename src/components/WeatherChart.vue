<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '温度',
          backgroundColor: '#FF7257',
          data: [20, 25, 10, 40, 39, 11, 33]
        },
        {
          label: '湿度',
          backgroundColor: '#BAFF91',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
