<template>
  <div class="skeleton-page">
    <div class="skeleton-header"></div>
    <div class="skeleton-card"></div>
    <div class="skeleton-card"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.skeleton-page {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.skeleton-header {
  height: 90px;
  width: 100%;
  background: #f5f5f5;
  border-radius: 0 0 18px 18px;
  animation: pulse 1.2s infinite alternate;
}
.skeleton-card {
  height: 220px;
  width: 100%;
  background: #f5f5f5;
  border-radius: 18px;
  animation: pulse 1.2s infinite alternate;
}
@keyframes pulse {
  0% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style> 