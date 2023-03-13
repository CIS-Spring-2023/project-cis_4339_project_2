
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-20" ref="piechart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

export default {
  data () {
    return {
      label: ['77063', '77356', '77097', '77016', '77090', '77061', '77005',
              '77081', '77021', '77213', '77494'], //data label
      chartData: [15, 10, 27, 5, 13, 3, 4, 8, 12, 5, 7]                              //data
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
            label: '# of clients',
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
        
          },
          title: {
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
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.9)`
    }
  }
}
</script>
