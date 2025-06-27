<template>
  <transition name="fade">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-0 min-h-[400px] w-full flex flex-col">
      <div class="flex justify-between items-center mb-4 px-6 pt-6">
        <div>
          <h3 class="text-xl font-semibold text-gray-900">Slot Allocation Status</h3>
          <p class="text-gray-600 text-sm mt-1">
            Total: <span class="font-medium">{{ store.slotAllocation.total }}</span> |
            Admitted: <span class="font-medium">{{ store.slotAllocation.admitted }}</span> |
            Waitlisted: <span class="font-medium">{{ store.slotAllocation.waitlisted }}</span> |
            Rejected: <span class="font-medium">{{ store.slotAllocation.rejected }}</span>
          </p>
        </div>
      </div>
      <div class="flex-1 px-6 pb-6">
        <div v-if="store.loading" class="h-[240px] flex items-center justify-center" aria-live="polite">Loading...</div>
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
import { useSlotVisualizationStore } from '../../store/slotVisualizationStore'
Chart.register(...registerables)
const store = useSlotVisualizationStore()
const chartCanvas = ref(null)
const chartInstance = ref(null)
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
  const data = store.slotAllocation
  const admitted = data?.admitted ?? 0
  const waitlisted = data?.waitlisted ?? 0
  const rejected = data?.rejected ?? 0
  const config = {
    type: 'doughnut',
    data: {
      labels: ['Admitted', 'Waitlisted', 'Rejected'],
      datasets: [{
        data: [admitted, waitlisted, rejected],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
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
              return `${label}: ${value}`
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
  watch(
    [() => store.loading, () => store.slotAllocation],
    ([isLoading, data]) => {
      if (!isLoading && data && (data.admitted + data.waitlisted + data.rejected) > 0) {
        createOrUpdateChart()
      }
    },
    { immediate: true, deep: true }
  )
  const container = chartCanvas.value?.parentElement
  if (container && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)
  } else {
    window.addEventListener('resize', handleResize)
  }
})
onUnmounted(() => {
  if (chartInstance.value) chartInstance.value.destroy()
  if (resizeObserver) resizeObserver.disconnect()
  window.removeEventListener('resize', handleResize)
  if (resizeTimeout) clearTimeout(resizeTimeout)
})
watch(() => store.slotAllocation, () => { createOrUpdateChart() }, { deep: true })
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