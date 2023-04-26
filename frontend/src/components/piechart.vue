<script>
// using chart.js library for the pie chart
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

export default {
  props: {
    label: {
      type: Array
    },
    chartData2: {
      type: Array
    }
  },
  async mounted() {
    // Random choosing of background and border colors
    const backgroundColor = this.chartData2.map(() => this.getColor())
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
            data: this.chartData2,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            
          }
        ]
      },
      options: {
        
        plugins: {
          legend: {
            display: true, 
               // Choosing to display the legend
        
          },
          title: { // Title with increased size set here
            display: true,
            text: 'Clients by Zip Code',
            font: {
              size: 20
            }
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
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.4)`
    }
  }
}
</script>

<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-20" ref="piechart"></canvas>
  </div>
</template>