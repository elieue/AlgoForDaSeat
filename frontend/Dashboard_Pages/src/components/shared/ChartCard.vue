<template>
  <transition name="fade">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center" role="group" aria-label="Chart Card">
      <slot />
    </div>
  </transition>
</template>

<script setup>
// This script block is required for a valid SFC
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style> 