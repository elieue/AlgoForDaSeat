<template>
  <span :class="['status-badge', statusClass]">{{ label }}</span>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});
const statusClass = computed(() => {
  switch ((props.status || '').toLowerCase()) {
    case 'approved': return 'approved';
    case 'waitlisted': return 'waitlisted';
    case 'rejected': return 'rejected';
    case 'pending': return 'pending';
    default: return 'pending';
  }
});
const label = computed(() => {
  const s = (props.status || '').toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
});
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 16px;
  font-size: 0.98rem;
  font-weight: 600;
  border: 1px solid;
  text-transform: capitalize;
}
.status-badge.approved {
  background: #e8f5e9;
  color: #43a047;
  border-color: #a5d6a7;
}
.status-badge.waitlisted {
  background: #e3f2fd;
  color: #1976d2;
  border-color: #90caf9;
}
.status-badge.rejected {
  background: #ffebee;
  color: #e53935;
  border-color: #ffcdd2;
}
.status-badge.pending {
  background: #fff7e6;
  color: #f7a600;
  border-color: #ffe0a3;
}
</style> 