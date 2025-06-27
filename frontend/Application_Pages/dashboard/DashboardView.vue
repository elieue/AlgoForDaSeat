<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title poppins font-bold text-xxl">Dashboard</h1>
    <p class="dashboard-desc text-secondary font-medium text-sm">Overview and statistics of the application process</p>
    <div v-if="totalApplications === 0" class="empty-state">
      <img src="../../Assets/dashboard-icon.svg" class="empty-icon" alt="No Data" />
      <h2 class="empty-title">No Applications Found</h2>
      <p class="empty-desc">There are no applications in the system yet.</p>
    </div>
    <div v-else>
      <transition-group name="stat-fade" tag="div">
        <StatCardsRow :stats="stats" key="stat-row" />
      </transition-group>
      <transition name="fade">
        <HeatmapCard title="Application Heatmap" :imgSrc="heatmapImg" alt="Application Heatmap" key="heatmap" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import StatCardsRow from './components/StatCardsRow.vue';
import HeatmapCard from './components/HeatmapCard.vue';
import { storeToRefs } from 'pinia';
import { useApplicationsStore } from '../store/applications';
import { computed } from 'vue';
import applicationRankingIcon from '../../Assets/application-ranking-logo.svg';
import viewDetailsIcon from '../../Assets/view-details-logo.svg';
import approvedIcon from '../../Assets/approved-applications-logo.svg';
import waitlistedIcon from '../../Assets/waitlisted-applications-logo.svg';
import rejectedIcon from '../../Assets/rejected-applications-logo.svg';
import heatmapImg from '../../Assets/heatmap.webp';

const store = useApplicationsStore();
const { pendingCount, approvedCount, waitlistedCount, rejectedCount, pending, approved, waitlisted, rejected } = storeToRefs(store);
const totalApplications = computed(() => pending.value.length + approved.value.length + waitlisted.value.length + rejected.value.length);

const stats = computed(() => [
  { title: 'Total Applications', value: totalApplications.value, icon: applicationRankingIcon },
  { title: 'Pending', value: pendingCount.value, icon: viewDetailsIcon },
  { title: 'Approved', value: approvedCount.value, icon: approvedIcon },
  { title: 'Waitlisted', value: waitlistedCount.value, icon: waitlistedIcon },
  { title: 'Rejected', value: rejectedCount.value, icon: rejectedIcon },
]);
</script>

<style scoped>
.dashboard-container {
  padding: 32px 40px;
}
.dashboard-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.6rem;
  font-weight: 800;
  color: #f7a600;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}
.dashboard-desc {
  font-family: 'Inter', sans-serif;
  color: #888;
  margin-bottom: 28px;
  font-size: 1.05rem;
}
.stat-fade-enter-active, .stat-fade-leave-active {
  transition: all 0.5s cubic-bezier(.4,0,.2,1);
}
.stat-fade-enter-from, .stat-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.stat-fade-enter-to, .stat-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s cubic-bezier(.4,0,.2,1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 2px dashed #f0f0f0;
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
}
.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
}
.empty-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #888;
  margin-bottom: 8px;
}
.empty-desc {
  font-family: 'Inter', sans-serif;
  color: #aaa;
  font-size: 1rem;
  max-width: 400px;
}
</style> 