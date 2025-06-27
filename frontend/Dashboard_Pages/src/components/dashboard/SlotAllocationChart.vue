<template>
  <transition name="fade">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-0 min-h-[400px] w-full flex flex-col">
      <div class="flex justify-between items-center mb-4 px-6 pt-6">
        <div>
          <h3 class="text-xl font-semibold text-gray-900">Slot Allocation Status</h3>
          <p class="text-gray-600 text-sm mt-1">
            Total Slots: <span class="font-medium">{{ data?.totalSlots ?? 0 }}</span> | 
            Filled Slots: <span class="font-medium">{{ data?.filledSlots ?? 0 }}</span> | 
            Available Slots: <span class="font-medium">{{ data?.availableSlots ?? 0 }}</span>
          </p>
        </div>
      </div>
      <div class="flex-1 px-6 pb-6">
        <div v-if="loading" class="h-[240px] flex items-center justify-center" aria-live="polite">Loading...</div>
        <div v-else-if="error" class="h-[240px] flex items-center justify-center text-red-500" aria-live="polite">Failed to load data.</div>
        <div v-else class="chart-container h-[240px] w-full relative overflow-hidden rounded-xl">
          <canvas ref="chartCanvas" class="w-full h-full" style="display:block" aria-label="Slot Allocation Doughnut Chart" tabindex="0" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useSlotVisualizationStore } from '@/store/slotVisualizationStore'
Chart.register(...registerables)
const store = useSlotVisualizationStore()
let data = store.slotAllocation
if (!data || typeof data.filled !== 'number' || typeof data.available !== 'number' || typeof data.total !== 'number') {
  data = { filled: 65, available: 35, total: 100, filledSlots: 65, availableSlots: 35, totalSlots: 100 }
}
console.log('SlotAllocationChart data:', data)
const chartCanvas = ref(null)
const chartInstance = ref(null)
const loading = ref(false)
const error = ref(false)
let resizeTimeout = null
const createOrUpdateChart = () => {
  if (!chartCanvas.value) return
  const container = chartCanvas.value.parentElement
  if (container) {
    chartCanvas.value.width = container.offsetWidth
    chartCanvas.value.height = container.offsetHeight
  }
  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return
  const filled = data?.filled ?? 0
  const total = data?.total ?? 1
  const available = data?.available ?? 0
  const filledPercentage = total > 0 ? Math.round((filled / total) * 100) : 0
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
              const actualValue = label === 'Filled Slots' ? filled : available
              return `${label}: ${value}% (${actualValue} slots)`
            }
          }
        }
      },
      animation: {
        duration: 800,
        easing: 'easeInOutQuart'
      }
    }
  }
  if (chartInstance.value) {
    chartInstance.value.data = config.data
    chartInstance.value.options = config.options
    chartInstance.value.update()
  } else {
    chartInstance.value = new Chart(ctx, config)
  }
}
const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    createOrUpdateChart()
  }, 150)
}
let resizeObserver = null
onMounted(() => {
  try {
    loading.value = false
    createOrUpdateChart()
    error.value = false
    const container = chartCanvas.value?.parentElement
    if (container && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(container)
    } else {
      window.addEventListener('resize', handleResize)
    }
  } catch (e) {
    loading.value = false
    error.value = true
  }
})
onUnmounted(() => {
  if (chartInstance.value) chartInstance.value.destroy()
  if (resizeObserver) resizeObserver.disconnect()
  window.removeEventListener('resize', handleResize)
  if (resizeTimeout) clearTimeout(resizeTimeout)
})
watch(() => store.slotAllocation, (newVal) => {
  data = newVal
  createOrUpdateChart()
}, { deep: true })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.chart-container {
  position: relative;
  height: 240px;
  width: 100%;
}
.chart-animate {
  animation: fadeInUp 1s ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 