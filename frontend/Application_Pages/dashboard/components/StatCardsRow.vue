<template>
  <div class="stats-row">
    <DashboardStatCard
      v-for="stat in stats"
      :key="stat.title"
      :title="stat.title"
      :value="stat.value"
      :icon="stat.icon"
    />
  </div>
</template>

<script setup>
import DashboardStatCard from './DashboardStatCard.vue';
// Stat icons are passed as imported variables (not string paths) for Vite compatibility.
const props = defineProps({
  stats: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 36px;
}
</style> 