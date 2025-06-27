<template>
  <div :class="['relative rounded-2xl border p-8 shadow-lg flex flex-col justify-between min-w-[300px] min-h-[170px]', cardClass]">
    <div class="absolute top-6 right-6 text-2xl text-gray-400">
      <component :is="iconComponent" />
    </div>
    <div>
      <div class="text-lg font-medium text-gray-500 mb-2">{{ label }}</div>
      <div class="flex items-end gap-2 mb-1">
        <span class="text-4xl font-extrabold text-orange-400">{{ value }}</span>
      </div>
      <div v-if="sublabel" class="text-base text-gray-400">{{ sublabel }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: [String, Number],
  label: String,
  sublabel: String,
  color: { type: String, default: 'yellow' },
  iconName: String
})

const cardClass = computed(() => {
  const map = {
    yellow: 'border-yellow-200 bg-yellow-50',
    green: 'border-green-200 bg-green-50',
    red: 'border-red-200 bg-red-50',
    blue: 'border-blue-200 bg-blue-50',
    purple: 'border-purple-200 bg-purple-50'
  }
  return map[props.color] || 'border-gray-200 bg-white'
})

const iconComponent = computed(() => {
  const icons = {
    BarChart: {
      template: `<svg width='28' height='28' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><rect x='3' y='12' width='4' height='8' rx='2'/><rect x='9' y='8' width='4' height='12' rx='2'/><rect x='15' y='4' width='4' height='16' rx='2'/></svg>`
    },
    CheckCircle: {
      template: `<svg width='28' height='28' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M9 12l2 2l4-4'/></svg>`
    },
    Clock: {
      template: `<svg width='28' height='28' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M12 6v6l4 2'/></svg>`
    },
    Hourglass: {
      template: `<svg width='28' height='28' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M6 2h12M6 22h12M6 2c0 6 6 6 6 12s-6 6-6 12M18 2c0 6-6 6-6 12s6 6 6 12'/></svg>`
    },
    XCircle: {
      template: `<svg width='28' height='28' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M15 9l-6 6M9 9l6 6'/></svg>`
    }
  }
  return icons[props.iconName] || icons.BarChart
})
</script>

<style scoped>
</style> 