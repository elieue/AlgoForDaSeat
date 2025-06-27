<template>
  <div class="stat-card">
    <div class="icon-wrapper">
      <img :src="icon" :alt="title + ' icon'" class="icon" />
    </div>
    <div class="stat-value">{{ value }}</div>
    <div class="stat-title">{{ title }}</div>
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
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
  padding: 24px 20px 18px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 140px;
}
.icon-wrapper {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}
.icon {
  width: 32px;
  height: 32px;
}
.stat-value {
  font-family: 'Poppins', sans-serif;
  font-size: 2.1rem;
  font-weight: 800;
  color: #f7a600;
  margin-bottom: 2px;
  line-height: 1;
}
.stat-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  color: #888;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
}
</style> 