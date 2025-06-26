<template>
  <div v-if="!data" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="text-center">
      <p class="text-gray-500">No exam results data available</p>
    </div>
  </div>
  <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-900">Entrance Exam Results</h3>
      <p class="text-gray-600 text-sm mt-1">
        Percentage of applicants who passed or failed the entrance exam (Passing Score: 75).
      </p>
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'ExamResultsChart',
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const chartCanvas = ref(null)
    const chartInstance = ref(null)

    const createChart = () => {
      if (!chartCanvas.value || !props.data || !window.Chart) return

      // Destroy existing chart
      if (chartInstance.value) {
        chartInstance.value.destroy()
      }

      const ctx = chartCanvas.value.getContext('2d')
      if (!ctx) return

      const config = {
        type: 'bar',
        data: {
          labels: ['Passed', 'Failed'],
          datasets: [{
            data: [props.data.passed, props.data.failed],
            backgroundColor: ['#10B981', '#EF4444'],
            borderRadius: 4,
            barThickness: 40
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%'
                }
              },
              grid: {
                display: true
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                afterLabel: function(context) {
                  if (context.label === 'Passed') {
                    return `${props.data.passedCount} student(s)\n(${props.data.passed}% of total)`
                  } else {
                    return `${props.data.failedCount} student(s)\n(${props.data.failed}% of total)`
                  }
                }
              }
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
          }
        }
      }

      chartInstance.value = new window.Chart(ctx, config)
    }

    watch(() => props.data, () => {
      if (props.data) {
        createChart()
      }
    }, { deep: true })

    onMounted(() => {
      // Wait for Chart.js to be available
      if (window.Chart) {
        createChart()
      } else {
        // Wait a bit for Chart.js to load
        setTimeout(createChart, 100)
      }
    })

    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy()
      }
    })

    return {
      chartCanvas
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
}

.chart-animate {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>