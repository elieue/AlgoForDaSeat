<template>
  <div v-if="!data" class="space-y-4">
    <div v-for="i in 3" :key="i" class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div class="text-center">
        <p class="text-gray-500">No data available</p>
      </div>
    </div>
  </div>
  <div v-else class="space-y-4">
    <div 
      v-for="(stat, index) in statistics" 
      :key="stat.id"
      class="stat-card bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <div class="flex items-center justify-between">
        <div>
          <p :class="`text-3xl font-bold ${stat.color}`">
            {{ stat.value }}
          </p>
          <p class="text-sm text-gray-600 font-medium">
            {{ stat.label }}
          </p>
        </div>
        <div :class="`${stat.bgColor} p-3 rounded-full`">
          <component :is="getIcon(stat.icon)" :class="`${stat.color} text-xl h-6 w-6`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'KeyStatistics',
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const statistics = computed(() => {
      if (!props.data) return []
      
      return [
        {
          id: 'capacity',
          label: 'Total Capacity',
          value: props.data.totalSlots,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: 'Users'
        },
        {
          id: 'approved',
          label: 'Students Approved',
          value: props.data.filledSlots,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: 'CheckCircle'
        },
        {
          id: 'remaining',
          label: 'Slots Remaining',
          value: props.data.availableSlots,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: 'ClipboardList'
        }
      ]
    })

    const getIcon = (iconName) => {
      const icons = {
        Users: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>`
        },
        CheckCircle: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        },
        ClipboardList: {
          template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>`
        }
      }
      return icons[iconName] || icons.Users
    }

    return {
      statistics,
      getIcon
    }
  }
}
</script>

<style scoped>
.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
</style>