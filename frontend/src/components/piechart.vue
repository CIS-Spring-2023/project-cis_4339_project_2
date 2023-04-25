
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-20" ref="piechart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  async mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor())
    const borderColor = backgroundColor.map((e) =>
      e.replace(/[\d\.]+\)$/g, '1)')
    )
    await new Chart(this.$refs.piechart, {
      type: 'pie',
      data: {
        labels: this.label,
        datasets: [
          {
            label: 'Clients',
            data: this.chartData,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            
          }
        ]
      },
      options: {
        
        plugins: {
          legend: {
            display: true, 
               //display the legends 
        
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    })
  },
  methods: {
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.9)`
    }
  }
}
</script>
