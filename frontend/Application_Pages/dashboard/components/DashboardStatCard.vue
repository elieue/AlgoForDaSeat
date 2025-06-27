<template>
  <div class="stat-card">
    <div class="card-icon">
      <img :src="icon" :alt="title + ' icon'" class="icon" />
    </div>
    <div class="card-content">
      <div class="card-label">{{ title }}</div>
      <div class="card-value">
        <span class="value-number">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  icon: { type: String, required: true },
});
</script>

<style scoped>
.stat-card {
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

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.16);
  border-color: var(--color-yellow-text);
}

.card-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.7;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 32px;
  height: 32px;
  color: var(--color-yellow-text);
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .stat-card {
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
  .stat-card {
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