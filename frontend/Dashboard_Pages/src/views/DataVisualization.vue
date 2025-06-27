<template>
  <div class="data-visualization bg-gray-50 min-h-screen p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      <!-- Top row -->
      <ChartCard class="col-span-1 md:col-span-2 min-h-[400px] flex">
        <SlotAllocationChart />
      </ChartCard>
      <div class="col-span-1 w-full flex flex-col gap-4 items-stretch justify-start lg:w-[240px]">
        <KpiCard v-for="kpi in kpis" :key="kpi.label" :value="kpi.value" :label="kpi.label" :icon="kpi.icon" :color="kpi.color" small />
      </div>
      <!-- Second row -->
      <ChartCard class="col-span-1 md:col-span-2 min-h-[340px] flex">
        <ApplicationDensityMap />
      </ChartCard>
      <ChartCard class="col-span-1 min-h-[340px] flex">
        <SocioEconomicChart />
      </ChartCard>
      <!-- Bottom row -->
      <ChartCard class="col-span-1 md:col-span-3 min-h-[300px] flex">
        <ExamResultsChart horizontal />
      </ChartCard>
    </div>
  </div>
</template>

<script setup>
import SlotAllocationChart from '@/components/dashboard/SlotAllocationChart.vue'
import KpiCard from '@/components/dashboard/KpiCard.vue'
import ApplicationDensityMap from '@/components/dashboard/ApplicationDensityMap.vue'
import SocioEconomicChart from '@/components/dashboard/SocioEconomicChart.vue'
import ExamResultsChart from '@/components/dashboard/ExamResultsChart.vue'
import ChartCard from '@/components/shared/ChartCard.vue'
import { useSlotVisualizationStore } from '@/store/slotVisualizationStore'
const { kpis } = useSlotVisualizationStore()
</script>

<style scoped>
.data-visualization {
  background: #f7f8fa;
  min-height: 100vh;
}
</style>