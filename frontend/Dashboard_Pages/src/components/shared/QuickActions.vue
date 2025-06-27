<template>
  <div class="quick-actions-card">
    <h3 class="card-title">Quick Actions</h3>
    <ul class="actions-list">
      <li 
        class="action-item"
        :class="{ 'action-disabled': loading }"
        @click="handleAllocateSlots"
      >
        <div class="action-icon">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <div class="action-content">
          <span class="action-text">Process Slot Allocation</span>
          <span v-if="loading" class="action-status">Processing...</span>
        </div>
      </li>
      
      <li class="action-item" @click="viewSlotChart">
        <div class="action-icon">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="action-content">
          <span class="action-text">View Slot Chart</span>
        </div>
      </li>
      
      <li class="action-item action-disabled">
        <div class="action-icon">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div class="action-content">
          <span class="action-text">Manage Users</span>
          <span class="action-status">Coming Soon</span>
        </div>
      </li>
      
      <li class="action-item action-disabled">
        <div class="action-icon">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </div>
        <div class="action-content">
          <span class="action-text">System Settings</span>
          <span class="action-status">Coming Soon</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['allocate-slots'])

const loading = ref(false)

const handleAllocateSlots = async () => {
  if (loading.value) return
  
  loading.value = true
  try {
    await emit('allocate-slots')
  } finally {
    loading.value = false
  }
}

const viewSlotChart = () => {
  // Navigate to slot chart view
  console.log('Navigate to slot chart')
}
</script>

<style scoped>
.quick-actions-card {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-yellow-text);
  background: var(--color-yellow-bg);
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 20px;
  font-family: 'Poppins', Arial, sans-serif;
}

.actions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
  border: 2px solid transparent;
}

.action-item:hover:not(.action-disabled) {
  background: var(--color-yellow-bg);
  border-color: var(--color-yellow-text);
  transform: translateX(4px);
}

.action-item:active:not(.action-disabled) {
  background: var(--color-orange-bg);
  border-color: var(--color-orange-text);
}

.action-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-disabled:hover {
  transform: none;
  background: transparent;
  border-color: transparent;
}

.action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--color-yellow-bg);
  flex-shrink: 0;
}

.action-item:hover:not(.action-disabled) .action-icon {
  background: var(--color-orange-bg);
}

.action-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.action-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-secondary);
  font-family: 'Poppins', Arial, sans-serif;
}

.action-status {
  font-size: 0.85rem;
  color: var(--color-muted);
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .quick-actions-card {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.2rem;
    padding: 6px 12px;
  }
  
  .action-item {
    padding: 10px 12px;
  }
  
  .action-icon {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .quick-actions-card {
    padding: 16px;
  }
  
  .action-item {
    padding: 8px 10px;
  }
  
  .action-icon {
    width: 32px;
    height: 32px;
  }
}
</style> 