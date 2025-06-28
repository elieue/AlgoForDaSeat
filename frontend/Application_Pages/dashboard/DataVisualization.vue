<template>
  <div class="data-visualization bg-gray-50 min-h-screen p-8">
    <!-- Header Section -->
    <div class="dv-header">
      <h1 class="dv-title">Data Visualization</h1>
      <p class="dv-desc">Explore key statistics and trends from the application process, including slot allocation, socioeconomic breakdown, and exam results.</p>
    </div>
    <!-- Two charts stacked vertically -->
    <div class="flex flex-col gap-8 mb-10">
      <ChartCard class="min-h-[400px] flex">
        <SlotAllocationChart />
      </ChartCard>
      <ChartCard class="min-h-[400px] flex">
        <SocioEconomicChart />
      </ChartCard>
    </div>
    <!-- Exam results full width -->
    <ChartCard class="min-h-[300px] flex">
      <ExamResultsChart horizontal />
    </ChartCard>
  </div>
</template>

<script setup>
import SlotAllocationChart from './components/SlotAllocationChart.vue'
import SocioEconomicChart from './components/SocioEconomicChart.vue'
import ExamResultsChart from './components/ExamResultsChart.vue'
import ChartCard from './components/ChartCard.vue'
import { onMounted } from 'vue'
import { useSlotVisualizationStore } from '../store/slotVisualizationStore'
const store = useSlotVisualizationStore()
onMounted(() => {
  store.fetchDashboardData()
})
</script>

<style scoped>
.data-visualization {
  background: #f7f8fa;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  padding: 50px; /* Add left padding to account for sidebar width */
}
.dv-header {
  margin-bottom: 24px;
}
.dv-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: #f7a600;
  margin-bottom: 0.2em;
  letter-spacing: 0.2px;
}
.dv-desc {
  font-family: 'Inter', sans-serif;
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 0;
}
</style> 