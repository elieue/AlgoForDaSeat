<template>
  <transition name="fade">
    <div class="admin-dashboard">
      <div class="dashboard-header mb-10">
        <h1 class="text-5xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent" style="letter-spacing: -2px;">Admin Dashboard</h1>
        <p class="text-xl text-gray-400 mb-10">Overview of school enrollment applications.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <StatsCard
          v-for="(card, i) in statCards.slice(0,3)"
          :key="card.label"
          :value="card.value"
          :label="card.label"
          :sublabel="card.sublabel"
          :color="card.color"
          :icon-name="card.iconName"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <StatsCard
          v-for="(card, i) in statCards.slice(3,5)"
          :key="card.label"
          :value="card.value"
          :label="card.label"
          :sublabel="card.sublabel"
          :color="card.color"
          :icon-name="card.iconName"
        />
      </div>
      <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex-1">
          <WelcomeCard />
        </div>
        <div class="w-full lg:w-80">
          <QuickActions />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import StatsCard from '@/components/shared/StatsCard.vue'
import WelcomeCard from '@/components/shared/WelcomeCard.vue'
import QuickActions from '@/components/shared/QuickActions.vue'
import { useDashboardStore } from '@/store/dashboardStore'
const dashboardStore = useDashboardStore()
const statCards = dashboardStore.statCards
</script>

<style scoped>
.admin-dashboard {
  padding: 48px 32px 32px 32px;
  background: #fafbfc;
  min-height: 100vh;
}
.dashboard-header h1 {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>