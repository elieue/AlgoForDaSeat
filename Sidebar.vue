<template>
  <div class="w-64 bg-white shadow-lg border-r border-gray-200">
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
    <nav class="mt-6">
      <div class="px-3">
        <div
          v-for="item in sidebarItems"
          :key="item.id"
          class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1"
          :class="{ 'active': activeItem === item.id }"
          @click="setActiveItem(item.id)"
        >
          <component :is="getIcon(item.icon)" class="mr-3 h-5 w-5" />
          <span class="font-medium">{{ item.label }}</span>
        </div>
      </div>
      
      <!-- Applications Section -->
      <div class="mt-8 px-6">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Applications
        </h3>
        <div class="space-y-1">
          <div
            v-for="item in applicationItems"
            :key="item.id"
            class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors"
            @click="setActiveItem(item.id)"
          >
            <component :is="getIcon(item.icon)" :class="`mr-3 h-4 w-4 ${item.color}`" />
            <span class="text-sm">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Sidebar',
  setup() {
    const activeItem = ref('dashboard')

    const sidebarItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'BarChart3',
        active: true
      },
      {
        id: 'data-viz',
        label: 'Data Visualization',
        icon: 'FileText',
        active: false
      }
    ]

    const applicationItems = [
      {
        id: 'pending',
        label: 'Pending Applications',
        icon: 'Clock',
        color: 'text-yellow-600'
      },
      {
        id: 'waitlisted',
        label: 'Waitlisted Applications',
        icon: 'List',
        color: 'text-blue-600'
      },
      {
        id: 'approved',
        label: 'Approved Applications',
        icon: 'CheckCircle',
        color: 'text-green-600'
      },
      {
        id: 'rejected',
        label: 'Rejected Applications',
        icon: 'XCircle',
        color: 'text-red-600'
      },
      {
        id: 'rankings',
        label: 'Application Rankings',
        icon: 'Trophy',
        color: 'text-yellow-600'
      }
    ]

    const setActiveItem = (id) => {
      activeItem.value = id
    }

    const getIcon = (iconName) => {
      const icons = {
        BarChart3: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`
        },
        FileText: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
        },
        Clock: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        },
        List: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>`
        },
        CheckCircle: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        },
        XCircle: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        },
        Trophy: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>`
        }
      }
      return icons[iconName] || icons.BarChart3
    }

    return {
      activeItem,
      sidebarItems,
      applicationItems,
      setActiveItem,
      getIcon
    }
  }
}
</script>

<style scoped>
.sidebar-item {
  transition: all 0.2s ease;
}

.sidebar-item:hover {
  background-color: rgb(254, 243, 199);
  color: rgb(146, 64, 14);
}

.sidebar-item.active {
  background-color: rgb(252, 228, 138);
  color: rgb(146, 64, 14);
  border-right: 3px solid rgb(245, 158, 11);
}
</style>