<template>
  <div v-if="!data" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="text-center">
      <p class="text-gray-500">No socioeconomic data available</p>
    </div>
  </div>
  <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-900">Socioeconomic Distribution</h3>
      <p class="text-gray-600 text-sm mt-1">
        A breakdown of applicant households by monthly income.
      </p>
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div class="flex justify-center mt-4 space-x-6">
      <div class="flex items-center">
        <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
        <span class="text-sm text-gray-600">Lower Class</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
        <span class="text-sm text-gray-600">Middle Class</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
        <span class="text-sm text-gray-600">Upper Class</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'SocioeconomicChart',
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
        type: 'pie',
        data: {
          labels: ['Lower Class', 'Middle Class', 'Upper Class'],
          datasets: [{
            data: [props.data.lower, props.data.middle, props.data.upper],
            backgroundColor: ['#F59E0B', '#10B981', '#EF4444'],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.parsed}%`
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