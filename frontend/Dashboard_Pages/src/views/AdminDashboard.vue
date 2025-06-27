<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1 class="page-title">Admin Dashboard</h1>
      <p class="page-desc">Overview of school enrollment applications and slot allocation status.</p>
    </div>

    <!-- Loading State -->
    <div v-if="dashboardStore.loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading dashboard data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="dashboardStore.error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h3 class="error-title">Error Loading Dashboard</h3>
      <p class="error-message">{{ dashboardStore.error }}</p>
      <button @click="refreshData" class="btn">Retry</button>
    </div>

    <!-- Dashboard Content -->
    <div v-else class="dashboard-content">
      <!-- Stats Cards Row 1 -->
      <div class="stats-grid">
        <StatsCard
          v-for="(card, index) in dashboardStore.statCards.slice(0, 3)"
          :key="card.label"
          :value="card.value"
          :label="card.label"
          :sublabel="card.sublabel"
          :color="card.color"
          :icon-name="card.iconName"
        />
      </div>

      <!-- Stats Cards Row 2 -->
      <div class="stats-grid-secondary">
        <StatsCard
          v-for="(card, index) in dashboardStore.statCards.slice(3, 5)"
          :key="card.label"
          :value="card.value"
          :label="card.label"
          :sublabel="card.sublabel"
          :color="card.color"
          :icon-name="card.iconName"
        />
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
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import StatsCard from '@/components/shared/StatsCard.vue'
import WelcomeCard from '@/components/shared/WelcomeCard.vue'
import QuickActions from '@/components/shared/QuickActions.vue'
import { useDashboardStore } from '@/store/dashboardStore'

const dashboardStore = useDashboardStore()

const refreshData = async () => {
  await dashboardStore.fetchStats()
}

const handleAllocateSlots = async () => {
  try {
    await dashboardStore.allocateSlots()
    // Show success message or redirect
  } catch (error) {
    console.error('Slot allocation failed:', error)
  }
}

onMounted(async () => {
  await dashboardStore.fetchStats()
})
</script>

<style scoped>
.admin-dashboard {
  padding: 32px;
  background: var(--color-bg);
  min-height: 100vh;
  font-family: 'Inter', Arial, sans-serif;
}

.dashboard-header {
  margin-bottom: 40px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-yellow-text);
  background: var(--color-yellow-bg);
  padding: 16px 32px;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px 0 rgba(255, 136, 0, 0.15);
}

.page-desc {
  font-size: 1.2rem;
  color: var(--color-muted);
  font-weight: 500;
  margin-left: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stats-grid-secondary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
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

/* Loading States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 24px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
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
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 24px;
  text-align: center;
}

.error-icon {
  font-size: 3rem;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-danger);
}

.error-message {
  font-size: 1.1rem;
  color: var(--color-muted);
  max-width: 500px;
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
  .admin-dashboard {
    padding: 20px;
  }
  
  .page-title {
    font-size: 2rem;
    padding: 12px 24px;
  }
  
  .stats-grid,
  .stats-grid-secondary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .admin-dashboard {
    padding: 16px;
  }
  
  .page-title {
    font-size: 1.8rem;
    padding: 10px 20px;
  }
}
</style>