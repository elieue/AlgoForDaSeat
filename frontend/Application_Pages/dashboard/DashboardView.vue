<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title poppins font-bold text-xxl">Dashboard</h1>
    <p class="dashboard-desc text-secondary font-medium text-sm">Overview and statistics of the application process</p>
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading dashboard data...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p class="error-message">{{ error }}</p>
      <button @click="loadData" class="retry-btn">Retry</button>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="totalApplications === 0" class="empty-state">
      <img src="../../Assets/dashboard-icon.svg" class="empty-icon" alt="No Data" />
      <h2 class="empty-title">No Applications Found</h2>
      <p class="empty-desc">There are no applications in the system yet.</p>
    </div>
    
    <!-- Data State -->
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
import { onMounted } from 'vue';
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
const { pendingCount, approvedCount, waitlistedCount, rejectedCount, pending, approved, waitlisted, rejected, loading, error } = storeToRefs(store);
const totalApplications = computed(() => pending.value.length + approved.value.length + waitlisted.value.length + rejected.value.length);

const stats = computed(() => [
  { title: 'Total Applications', value: totalApplications.value, icon: applicationRankingIcon },
  { title: 'Pending', value: pendingCount.value, icon: viewDetailsIcon },
  { title: 'Approved', value: approvedCount.value, icon: approvedIcon },
  { title: 'Waitlisted', value: waitlistedCount.value, icon: waitlistedIcon },
  { title: 'Rejected', value: rejectedCount.value, icon: rejectedIcon },
]);

async function loadData() {
  await store.loadAllApplications();
}

onMounted(() => {
  loadData();
});
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
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
}
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f7a600;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 2px dashed #ffcdd2;
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
}
.error-message {
  font-family: 'Inter', sans-serif;
  color: #d32f2f;
  font-size: 1rem;
  margin-bottom: 16px;
}
.retry-btn {
  background: #f7a600;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.retry-btn:hover {
  background: #e69500;
}
</style> 