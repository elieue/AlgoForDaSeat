<template>
  <div class="welcome-card">
    <div class="welcome-header">
      <h2 class="welcome-title">Welcome, Administrator!</h2>
      <p class="welcome-subtitle">
        Manage student applications efficiently and fairly. 
        Total applications: <span class="highlight">{{ dashboardStore.stats.total }}</span>
      </p>
    </div>
    
    <p class="welcome-description">
      This dashboard provides a quick overview of the current application status. 
      Navigate using the sidebar to view detailed application lists, manage rankings, 
      and visualize slot allocations.
    </p>
    
    <div class="welcome-actions">
      <button class="btn btn-secondary" @click="viewPendingApplications">
        View Pending Applications
      </button>
      <button class="btn btn-secondary" @click="processRankings">
        Process Rankings
      </button>
    </div>
    
    <div class="welcome-illustration">
      <img 
        src="@/assets/dashboard.webp" 
        alt="Welcome Illustration" 
        class="illustration-image"
      />
    </div>
  </div>
</template>

<script setup>
import { useDashboardStore } from '@/store/dashboardStore'

const dashboardStore = useDashboardStore()

const viewPendingApplications = () => {
  // Navigate to pending applications
  console.log('Navigate to pending applications')
}

const processRankings = () => {
  // Trigger ranking process
  console.log('Process rankings')
}
</script>

<style scoped>
.welcome-card {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.welcome-header {
  margin-bottom: 8px;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-yellow-text);
  background: var(--color-yellow-bg);
  padding: 12px 24px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 16px;
  font-family: 'Poppins', Arial, sans-serif;
  box-shadow: 0 2px 8px 0 rgba(255,136,0,0.10);
}

.welcome-subtitle {
  font-size: 1.1rem;
  color: var(--color-muted);
  font-weight: 500;
  line-height: 1.5;
}

.highlight {
  color: var(--color-yellow-text);
  font-weight: 900;
  background: var(--color-yellow-bg);
  padding: 2px 8px;
  border-radius: 4px;
}

.welcome-description {
  font-size: 1rem;
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: 8px;
}

.welcome-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-secondary {
  background: var(--color-card);
  color: var(--color-secondary);
  border: 2px solid var(--color-primary-dark);
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
  font-family: 'Poppins', Arial, sans-serif;
}

.btn-secondary:hover {
  background: var(--color-yellow-bg);
  color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.12);
}

.btn-secondary:active {
  background: var(--color-orange-bg);
  color: var(--color-navy-text);
  border-color: var(--color-navy-text);
  transform: translateY(0);
}

.welcome-illustration {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.illustration-image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .welcome-card {
    padding: 24px;
    gap: 20px;
  }
  
  .welcome-title {
    font-size: 1.8rem;
    padding: 10px 20px;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
  
  .welcome-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .btn-secondary {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .welcome-card {
    padding: 20px;
    gap: 16px;
  }
  
  .welcome-title {
    font-size: 1.6rem;
    padding: 8px 16px;
  }
  
  .welcome-description {
    font-size: 0.95rem;
  }
}
</style> 