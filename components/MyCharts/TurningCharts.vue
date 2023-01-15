<template>
  <div>
    <canvas height="400px" width="400px" ref="canvas"></canvas>
  </div>
</template>

<script>
import { Scatter } from 'vue-chartjs'
export default {
  extends: Scatter,
  data() {
    return {
      chartData: {
        datasets: [{
          showLine: true,
          stepped: true,
          tension: 0,
          data: []
        }]
      },
      chartOptions: {
        //responsive: true
      }
    }
  },
  computed: {
    fetchPoints() {
      return this.$store.state.points.pointList
    }
  },
  watch: {
    fetchPoints: {
      deep: true,
      handler() {
        const newData = this.$store.state.points.pointList.map(point => {
          return {x: point.x, y: point.y}
        })
        this.chartData.datasets[0].data = newData
        this.renderChart(this.chartData)
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData)
  },
}
</script>