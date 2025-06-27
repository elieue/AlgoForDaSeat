<template>
  <div class="applications-view">
    <div class="page-header">
      <h1 class="page-title">Pending Applications</h1>
      <p class="page-desc">Applications awaiting review and ranking process.</p>
    </div>

    <!-- Loading State -->
    <div v-if="dashboardStore.loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading pending applications...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="dashboardStore.error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h3 class="error-title">Error Loading Applications</h3>
      <p class="error-message">{{ dashboardStore.error }}</p>
      <button @click="refreshData" class="btn">Retry</button>
    </div>

    <!-- Applications List -->
    <div v-else class="applications-content">
      <div v-if="dashboardStore.applications.length === 0" class="empty-state">
        <div class="empty-icon">📋</div>
        <h3 class="empty-title">No Pending Applications</h3>
        <p class="empty-desc">All applications have been processed or there are no pending applications at this time.</p>
      </div>

      <div v-else class="applications-grid">
        <div 
          v-for="application in dashboardStore.applications" 
          :key="application.application_id"
          class="application-card"
        >
          <div class="card-header">
            <h3 class="applicant-name">{{ application.full_name }}</h3>
            <div class="application-id">#{{ application.application_id }}</div>
          </div>
          
          <div class="card-content">
            <div class="info-row">
              <span class="info-label">Age:</span>
              <span class="info-value">{{ application.age }} years</span>
            </div>
            <div class="info-row">
              <span class="info-label">Gender:</span>
              <span class="info-value">{{ application.gender }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">School:</span>
              <span class="info-value">{{ application.school_attended }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Monthly Income:</span>
              <span class="info-value">₱{{ application.monthly_income?.toLocaleString() }}</span>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="btn btn-secondary" @click="viewDetails(application)">
              View Details
            </button>
            <button class="btn" @click="processApplication(application)">
              Process
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDashboardStore } from '@/store/dashboardStore'

const dashboardStore = useDashboardStore()

const refreshData = async () => {
  await dashboardStore.fetchApplicationsByStatus('pending')
}

const viewDetails = (application) => {
  console.log('View details for:', application)
  // Navigate to application details page
}

const processApplication = async (application) => {
  console.log('Process application:', application)
  // Trigger processing logic
}

onMounted(async () => {
  await dashboardStore.fetchApplicationsByStatus('pending')
})
</script>

<style scoped>
.applications-view {
  padding: 32px;
  background: var(--color-bg);
  min-height: 100vh;
  font-family: 'Inter', Arial, sans-serif;
}

.page-header {
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

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 24px;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  opacity: 0.5;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-muted);
}

.empty-desc {
  font-size: 1.1rem;
  color: var(--color-muted);
  max-width: 500px;
  line-height: 1.6;
}

/* Applications Grid */
.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.application-card {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
}

.application-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.16);
  border-color: var(--color-yellow-text);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--color-border);
}

.applicant-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-yellow-text);
  font-family: 'Poppins', Arial, sans-serif;
}

.application-id {
  font-size: 0.9rem;
  color: var(--color-muted);
  font-weight: 600;
  background: var(--color-yellow-bg);
  padding: 4px 8px;
  border-radius: 6px;
}

.card-content {
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.info-value {
  font-weight: 500;
  color: var(--color-secondary);
  font-size: 0.95rem;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.btn-secondary {
  background: var(--color-card);
  color: var(--color-secondary);
  border: 2px solid var(--color-primary-dark);
  flex: 1;
}

.btn-secondary:hover {
  background: var(--color-yellow-bg);
  color: var(--color-primary-dark);
}

/* Responsive Design */
@media (max-width: 768px) {
  .applications-view {
    padding: 20px;
  }
  
  .page-title {
    font-size: 2rem;
    padding: 12px 24px;
  }
  
  .applications-grid {
    grid-template-columns: 1fr;
  }
  
  .card-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .applications-view {
    padding: 16px;
  }
  
  .page-title {
    font-size: 1.8rem;
    padding: 10px 20px;
  }
  
  .application-card {
    padding: 20px;
  }
}
</style> 