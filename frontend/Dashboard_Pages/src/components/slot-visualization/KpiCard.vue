<template>
  <transition name="fade">
    <div :class="['flex items-center justify-between bg-white rounded-xl shadow border p-6 w-full', small ? 'h-[90px]' : 'h-[120px]', 'kpi-animate']" role="status" :aria-label="label + ' KPI'">
      <div>
        <div :class="['font-extrabold', small ? 'text-2xl' : 'text-4xl', textColor]">
          <span aria-live="polite">{{ displayValue }}</span>
        </div>
        <div :class="['font-medium', small ? 'text-base' : 'text-lg', 'text-gray-600', 'mt-1']">{{ label }}</div>
      </div>
      <div :class="['flex items-center justify-center rounded-full', iconBgClass, small ? 'h-12 w-12' : 'h-16 w-16']">
        <component :is="iconComponent" aria-hidden="true" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  value: Number,
  label: String,
  icon: String,
  color: String,
  small: Boolean
})
const displayValue = ref(0)
const textColor = computed(() => {
  return {
    yellow: 'text-yellow-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
  }[props.color] || 'text-gray-700'
})
const iconBgClass = computed(() => {
  return {
    yellow: 'bg-yellow-50 text-yellow-500',
    green: 'bg-green-50 text-green-500',
    blue: 'bg-blue-50 text-blue-500',
  }[props.color] || 'bg-gray-100 text-gray-500'
})
const iconComponent = computed(() => {
  const icons = {
    BxBadge: { template: `<svg width='28' height='28' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' aria-hidden='true'><circle cx='12' cy='12' r='10'/><path d='M12 8v4l3 3'/></svg>` },
    BxCheckCircle: { template: `<svg width='28' height='28' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' aria-hidden='true'><circle cx='12' cy='12' r='10'/><path d='M9 12l2 2l4-4'/></svg>` },
    BxClipboard: { template: `<svg width='28' height='28' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' aria-hidden='true'><rect x='7' y='4' width='10' height='16' rx='2'/><path d='M9 2h6v4H9z'/></svg>` },
  }
  return icons[props.icon] || icons.BxBadge
})
let animationFrame
const animateCount = (start, end) => {
  const duration = 600
  const startTime = performance.now()
  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1)
    displayValue.value = Math.floor(start + (end - start) * progress)
    if (progress < 1) {
      animationFrame = requestAnimationFrame(step)
    } else {
      displayValue.value = end
    }
  }
  animationFrame = requestAnimationFrame(step)
}
onMounted(() => {
  animateCount(0, props.value)
})
watch(() => props.value, (newVal, oldVal) => {
  animateCount(oldVal, newVal)
})
onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.kpi-animate {
  animation: fadeInUp 1s ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style> 