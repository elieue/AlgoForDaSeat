<template>
  <transition name="fade">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-0 min-h-[340px] w-full flex flex-col">
      <div class="mb-4 px-6 pt-6">
        <h3 class="text-xl font-semibold text-gray-900">Socioeconomic Distribution</h3>
        <p class="text-gray-600 text-sm mt-1">
          A breakdown of applicant households by monthly income.
        </p>
      </div>
      <div class="flex-1 px-6 pb-6">
        <div v-if="store.loading" class="h-[200px] flex items-center justify-center" aria-live="polite">Loading...</div>
        <div v-else-if="error" class="h-[200px] flex items-center justify-center text-red-500" aria-live="polite">Failed to load data.</div>
        <div v-else class="chart-container h-[200px] w-full relative overflow-hidden rounded-xl">
          <canvas ref="chartCanvas" class="w-full h-full" style="display:block" aria-label="Socioeconomic Distribution Pie Chart" tabindex="0" />
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
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
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
  const data = store.socioeconomic
  const lower = data?.lower ?? 0
  const middle = data?.middle ?? 0
  const upper = data?.upper ?? 0
  const totalApplicants = lower + middle + upper
  const config = {
    type: 'pie',
    data: {
      labels: ['Lower Class', 'Middle Class', 'Upper Class'],
      datasets: [{
        data: [lower, middle, upper],
        backgroundColor: ['#F59E0B', '#10B981', '#EF4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || ''
              const value = context.parsed
              const percentage = totalApplicants > 0 ? Math.round((value / totalApplicants) * 100) : 0
              return `${label}: ${value} (${percentage}% of total)`
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
    [() => store.loading, () => store.socioeconomic],
    ([isLoading, data]) => {
      if (!isLoading && data && (data.lower + data.middle + data.upper) > 0) {
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
watch(() => store.socioeconomic, () => { createOrUpdateChart() }, { deep: true })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.chart-container {
  position: relative;
  height: 200px;
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