<template>
  <div :class="['stats-card', cardClass]">
    <div class="card-icon">
      <component :is="iconComponent" />
    </div>
    <div class="card-content">
      <div class="card-label">{{ label }}</div>
      <div class="card-value">
        <span class="value-number">{{ value }}</span>
      </div>
      <div v-if="sublabel" class="card-sublabel">{{ sublabel }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: [String, Number],
  label: String,
  sublabel: String,
  color: { type: String, default: 'yellow' },
  iconName: String
})

const cardClass = computed(() => {
  const colorMap = {
    yellow: 'bg-yellow',
    green: 'bg-blue',
    red: 'bg-navy',
    blue: 'bg-orange',
    purple: 'bg-yellow'
  }
  return colorMap[props.color] || 'bg-yellow'
})

const iconComponent = computed(() => {
  const icons = {
    Clock: {
      template: `<svg class="icon" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>`
    },
    Check: {
      template: `<svg class="icon" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7"/>
      </svg>`
    },
    Pause: {
      template: `<svg class="icon" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="6" y="4" width="4" height="16"/>
        <rect x="14" y="4" width="4" height="16"/>
      </svg>`
    },
    X: {
      template: `<svg class="icon" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12"/>
      </svg>`
    },
    BarChart: {
      template: `<svg class="icon" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="12" width="4" height="8" rx="2"/>
        <rect x="9" y="8" width="4" height="12" rx="2"/>
        <rect x="15" y="4" width="4" height="16" rx="2"/>
      </svg>`
    }
  }
  return icons[props.iconName] || icons.BarChart
})
</script>

<style scoped>
.stats-card {
  background: var(--color-card);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
  position: relative;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
}

.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.16);
}

.card-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.7;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-muted);
  margin-bottom: 12px;
  font-family: 'Poppins', Arial, sans-serif;
}

.card-value {
  margin-bottom: 8px;
}

.value-number {
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-yellow-text);
  font-family: 'Poppins', Arial, sans-serif;
  line-height: 1;
}

.card-sublabel {
  font-size: 0.95rem;
  color: var(--color-muted);
  font-weight: 500;
  line-height: 1.4;
}

/* Color variants */
.bg-yellow {
  border-color: var(--color-yellow-text);
  background: var(--color-yellow-bg);
}

.bg-blue {
  border-color: var(--color-blue-text);
  background: var(--color-blue-bg);
}

.bg-orange {
  border-color: var(--color-orange-text);
  background: var(--color-orange-bg);
}

.bg-navy {
  border-color: var(--color-navy-text);
  background: var(--color-navy-bg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stats-card {
    padding: 20px;
    min-height: 160px;
  }
  
  .value-number {
    font-size: 2.5rem;
  }
  
  .card-label {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .stats-card {
    padding: 16px;
    min-height: 140px;
  }
  
  .value-number {
    font-size: 2rem;
  }
  
  .card-icon {
    top: 16px;
    right: 16px;
  }
}
</style> 