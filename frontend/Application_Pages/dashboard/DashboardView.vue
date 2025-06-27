<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1 class="dashboard-title poppins font-bold text-xxl">Admin Dashboard</h1>
      <p class="dashboard-desc text-secondary font-medium text-sm">Overview and statistics of the application process</p>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading dashboard data...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <h3 class="error-title">Error Loading Dashboard</h3>
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
    <div v-else class="dashboard-content">
      <!-- Stats Cards Row 1 -->
      <div class="stats-grid">
        <StatCardsRow :stats="stats.slice(0, 3)" />
      </div>
      
      <!-- Stats Cards Row 2 -->
      <div class="stats-grid-secondary">
        <StatCardsRow :stats="stats.slice(3, 5)" />
      </div>
      
      <!-- Action Cards -->
      <div class="action-cards">
        <div class="welcome-section">
          <WelcomeCard />
        </div>
        <div class="quick-actions-section">
          <QuickActions @allocate-slots="handleAllocateSlots" />
        </div>
      </div>
      
      <!-- Heatmap Section -->
      <div class="heatmap-section">
        <HeatmapCard title="Application Heatmap" :imgSrc="heatmapImg" alt="Application Heatmap" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import StatCardsRow from './components/StatCardsRow.vue';
import HeatmapCard from './components/HeatmapCard.vue';
import WelcomeCard from './components/WelcomeCard.vue';
import QuickActions from './components/QuickActions.vue';
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

const handleAllocateSlots = async () => {
  try {
    await store.allocateSlots();
    // Refresh data after allocation
    await loadData();
  } catch (error) {
    console.error('Slot allocation failed:', error);
  }
}

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.dashboard-container {
  padding: 32px 40px;
  background: var(--color-bg);
  min-height: 100vh;
  font-family: 'Inter', Arial, sans-serif;
}

.dashboard-header {
  margin-bottom: 40px;
}

.dashboard-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.6rem;
  font-weight: 800;
  color: var(--color-yellow-text);
  background: var(--color-yellow-bg);
  padding: 16px 32px;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px 0 rgba(255, 136, 0, 0.15);
  letter-spacing: 0.5px;
}

.dashboard-desc {
  font-family: 'Inter', sans-serif;
  color: var(--color-muted);
  margin-bottom: 28px;
  font-size: 1.05rem;
  margin-left: 8px;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.stats-grid-secondary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.action-cards {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  align-items: start;
}

.welcome-section {
  min-height: 300px;
}

.quick-actions-section {
  position: sticky;
  top: 32px;
}

.heatmap-section {
  margin-top: 16px;
}

/* Loading States */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.loading-text {
  font-size: 1.1rem;
  color: var(--color-muted);
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error States */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-danger);
  margin-bottom: 8px;
}

.error-message {
  font-family: 'Inter', sans-serif;
  color: var(--color-muted);
  font-size: 1rem;
  margin-bottom: 16px;
  max-width: 500px;
}

.retry-btn {
  background: var(--color-primary);
  color: var(--color-btn-text);
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border: 2.5px solid var(--color-primary-dark);
  border-radius: 8px;
  padding: 10px 22px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.10);
}

.retry-btn:hover {
  background: var(--color-yellow-bg);
  color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  box-shadow: 0 6px 24px 0 rgba(0,0,0,0.16);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-card);
  border: 2px dashed var(--color-border);
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
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
  color: var(--color-muted);
  margin-bottom: 8px;
}

.empty-desc {
  font-family: 'Inter', sans-serif;
  color: var(--color-muted);
  font-size: 1rem;
  max-width: 400px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .action-cards {
    grid-template-columns: 1fr;
  }
  
  .quick-actions-section {
    position: static;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 20px;
  }
  
  .dashboard-title {
    font-size: 2rem;
    padding: 12px 24px;
  }
  
  .stats-grid,
  .stats-grid-secondary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 16px;
  }
  
  .dashboard-title {
    font-size: 1.8rem;
    padding: 10px 20px;
  }
}
</style> 