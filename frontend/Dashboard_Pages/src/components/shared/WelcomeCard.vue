<template>
  <div class="bg-white border border-gray-200 rounded-2xl shadow p-10 flex flex-col gap-6">
    <div>
      <h2 class="text-2xl font-extrabold mb-1 text-gray-900">Welcome, Administrator!</h2>
      <p class="text-gray-500 text-lg font-medium">Manage student applications efficiently and fairly. Total applications: <span class="font-extrabold text-gray-900">{{ totalApplications }}</span></p>
    </div>
    <p class="text-gray-500 text-base">This dashboard provides a quick overview of the current application status. Navigate using the sidebar to view detailed application lists, manage rankings, and visualize slot allocations.</p>
    <div class="flex gap-4 mt-2">
      <button class="bg-white border border-gray-300 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-sm hover:bg-gray-100 hover:border-gray-400 transition">View Pending Applications</button>
      <button class="bg-white border border-gray-300 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-sm hover:bg-gray-100 hover:border-gray-400 transition">Process Rankings</button>
    </div>
    <div class="flex justify-center">
      <img src="@/assets/dashboard.webp" alt="Welcome Illustration" class="rounded-xl border border-gray-200 shadow p-2 mt-6 max-w-full" />
    </div>
  </div>
</template>

<script setup>
import { useDashboardStore } from '@/store/dashboardStore'
const dashboardStore = useDashboardStore()
const totalApplications = dashboardStore.totalApplications
</script>

<style scoped>
</style> 