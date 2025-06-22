<template>
  <canvas ref="heatmapCanvas" width="320" height="200"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import matrixPlugin from 'chartjs-chart-matrix';

Chart.register(...registerables, matrixPlugin);

export default {
  name: 'HeatMap',
  mounted() {
    const ctx = this.$refs.heatmapCanvas.getContext('2d');
    const cities = ['Manila', 'Quezon City', 'Pasig City', 'Taguig City'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr'];
    const dataPoints = [
      { x: 0, y: 0, v: 12 }, { x: 1, y: 0, v: 18 }, { x: 2, y: 0, v: 22 }, { x: 3, y: 0, v: 15 },
      { x: 0, y: 1, v: 25 }, { x: 1, y: 1, v: 30 }, { x: 2, y: 1, v: 16 }, { x: 3, y: 1, v: 10 },
      { x: 0, y: 2, v: 20 }, { x: 1, y: 2, v: 10 }, { x: 2, y: 2, v: 30 }, { x: 3, y: 2, v: 22 },
      { x: 0, y: 3, v: 5 },  { x: 1, y: 3, v: 15 }, { x: 2, y: 3, v: 8 },  { x: 3, y: 3, v: 12 }
    ];

    new Chart(ctx, {
      type: 'matrix',
      data: {
        datasets: [{
          label: 'Applications Heatmap',
          data: dataPoints,
          backgroundColor(ctx) {
            const v = ctx.raw.v;
            if (v > 25) return '#d73027';
            if (v > 15) return '#fc8d59';
            if (v > 5) return '#fee08b';
            return '#d9ef8b';
          },
          width: 60,
          height: 40
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (ctx) => `${months[ctx[0].raw.y]} — ${cities[ctx[0].raw.x]}`,
              label: (ctx) => `Applications: ${ctx.raw.v}`
            }
          }
        },
        scales: {
          x: {
            ticks: {
              callback: (val) => cities[val],
              font: { size: 12 }
            },
            grid: { display: false }
          },
          y: {
            ticks: {
              callback: (val) => months[val],
              font: { size: 12 }
            },
            reverse: true,
            grid: { display: false }
          }
        }
      }
    });
  }
};
</script>