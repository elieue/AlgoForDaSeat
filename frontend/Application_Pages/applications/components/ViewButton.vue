<template>
  <button class="view-btn" @click="$emit('click')" aria-label="View application details">
    <img :src="viewDetailsIcon" alt="View" class="icon" />
    View
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);
import viewDetailsIcon from '../../../Assets/view-details-logo.svg';
</script>

<style scoped>
.view-btn {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #e0e0e0;
  color: #222;
  font-weight: 600;
  border-radius: 12px;
  padding: 6px 18px 6px 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.18s, border-color 0.18s;
  outline: none;
  box-shadow: none;
}
.view-btn .icon {
  width: 22px;
  height: 22px;
  margin-right: 8px;
  filter: none;
}
.view-btn:hover, .view-btn:focus {
  background: #faf9f6;
  border-color: #bdbdbd;
  color: #222;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
}
.view-btn:active {
  background: #f0f0f0;
  border-color: #bdbdbd;
  color: #222;
}
</style> 