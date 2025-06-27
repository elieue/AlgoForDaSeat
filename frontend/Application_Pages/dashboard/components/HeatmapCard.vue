<template>
  <div class="heatmap-card">
    <h2 class="heatmap-title">{{ title }}</h2>
    <div class="heatmap-img-wrapper">
      <img :src="imgSrc" :alt="alt" class="heatmap-img" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  imgSrc: { type: String, required: true },
  alt: { type: String, required: true },
});
</script>

<style scoped>
.heatmap-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  padding: 24px 32px 32px 32px;
  margin-top: 8px;
}
.heatmap-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 18px;
}
.heatmap-img-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.heatmap-img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}
</style> 