<template>
  <div class="chart-card">
    <slot />
  </div>
</template>

<script setup>
// No props needed, just a slot wrapper
</script>

<style scoped>
.chart-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  padding: 24px 32px 32px 32px;
  margin-top: 8px;
  border: 1px solid #e5e7eb;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}
</style> 