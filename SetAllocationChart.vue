<template>
  <div v-if="!data" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="text-center">
      <p class="text-gray-500">No slot allocation data available</p>
    </div>
  </div>
  <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-900">Slot Allocation Status</h3>
        <p class="text-gray-600 text-sm mt-1">
          Total Slots: <span class="font-medium">{{ data.totalSlots }}</span> | 
          Filled Slots: <span class="font-medium">{{ data.filledSlots }}</span> | 
          Available Slots: <span class="font-medium">{{ data.availableSlots }}</span>
        </p>
      </div>
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'SlotAllocationChart',
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

      const filledPercentage = Math.round((props.data.filledSlots / props.data.totalSlots) * 100)
      const availablePercentage = 100 - filledPercentage

      const config = {
        type: 'doughnut',
        data: {
          labels: ['Filled Slots', 'Available Slots'],
          datasets: [{
            data: [filledPercentage, availablePercentage],
            backgroundColor: ['#F59E0B', '#E5E7EB'],
            borderWidth: 0,
            cutout: '70%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  family: 'Inter',
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || ''
                  const value = context.parsed
                  const actualValue = label === 'Filled Slots' ? props.data.filledSlots : props.data.availableSlots
                  return `${label}: ${value}% (${actualValue} slots)`
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