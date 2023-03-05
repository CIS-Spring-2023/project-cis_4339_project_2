
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="piechart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import piechartdata from '../assets/piechartdata.js';
import { pie, mixins } from 'vue-chartjs';


export default {
  extends: pie,
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
  },
};
</script>


