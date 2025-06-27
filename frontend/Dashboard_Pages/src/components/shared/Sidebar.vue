<template>
  <transition name="sidebar-slide">
    <div class="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col h-screen justify-between" role="navigation" aria-label="Sidebar Navigation">
      <div>
        <!-- Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center space-x-3">
            <div class="bg-yellow-500 p-2 rounded-lg">
              <svg class="text-white h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">AlgoForDaSeat</h1>
              <p class="text-sm text-gray-600">Admin Dashboard</p>
            </div>
          </div>
        </div>
        <!-- Navigation -->
        <nav aria-label="Main Navigation">
          <div class="mt-6 px-6">
            <router-link
              to="/"
              class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1"
              active-class="active"
              exact
              aria-label="Dashboard"
            >
              <component :is="getIcon('BarChart3')" class="mr-3 h-5 w-5" />
              <span class="font-medium">Dashboard</span>
            </router-link>
            <router-link
              to="/data-visualization"
              class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1"
              active-class="active"
              aria-label="Data Visualization"
            >
              <component :is="getIcon('PieChart')" class="mr-3 h-5 w-5" />
              <span class="font-medium">Data Visualization</span>
            </router-link>
            <div class="mt-6 mb-2 text-xs text-gray-400 font-semibold tracking-wider uppercase">Applications</div>
            <router-link to="#" class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1" aria-label="Pending Applications">
              <span class="mr-3">🕒</span> Pending Applications
            </router-link>
            <router-link to="#" class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1" aria-label="Waitlisted Applications">
              <span class="mr-3">⏳</span> Waitlisted Applications
            </router-link>
            <router-link to="#" class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1" aria-label="Approved Applications">
              <span class="mr-3">✅</span> Approved Applications
            </router-link>
            <router-link to="#" class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1" aria-label="Rejected Applications">
              <span class="mr-3">❌</span> Rejected Applications
            </router-link>
            <router-link to="#" class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1">
              <span class="mr-3">📊</span> Application Rankings
            </router-link>
          </div>
        </nav>
      </div>
      <div class="p-6">
        <button class="flex items-center gap-2 text-gray-500 hover:text-orange-600 text-sm font-medium w-full py-2 px-3 rounded-lg transition">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7"/></svg>
          Logout
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Sidebar',
  setup() {
    const getIcon = (iconName) => {
      const icons = {
        BarChart3: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`
        },
        PieChart: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>`
        },
        TrendingUp: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>`
        },
        FileText: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
        },
        Map: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>`
        }
      }
      return icons[iconName] || icons.BarChart3
    }

    return {
      getIcon
    }
  }
}
</script>

<style scoped>
.sidebar-item {
  transition: all 0.2s ease;
}
.sidebar-item.active {
  background-color: rgb(252, 228, 138);
  color: rgb(146, 64, 14);
  border-right: 4px solid rgb(245, 158, 11);
}
.sidebar-item:hover {
  background-color: rgb(254, 243, 199);
  color: rgb(146, 64, 14);
}
.sidebar-slide-enter-active, .sidebar-slide-leave-active { transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.sidebar-slide-enter-from, .sidebar-slide-leave-to { opacity: 0; transform: translateX(-40px); }
</style>