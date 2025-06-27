<template>
  <div class="app-container flex">
    <Sidebar />
    <main class="content flex-1 p-6 bg-gray-50 min-h-screen">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/shared/Sidebar.vue'
</script>

<style scoped>
.app-container {
  display: flex;
}
.content {
  flex: 1;
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;
}
</style>