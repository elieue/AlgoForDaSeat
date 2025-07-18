<template>
  <div class="table-wrapper">
    <table class="waitlisted-table">
      <thead>
        <tr>
          <th>LRN</th>
          <th>Full Name</th>
          <th>GPA</th>
          <th>Exam Score</th>
          <th>Submission Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <transition-group name="row-fade" tag="tbody">
        <tr v-for="app in applications" :key="app.lrn || app.id">
          <td>{{ app.lrn || 'N/A' }}</td>
          <td>{{ app.fullName || 'N/A' }}</td>
          <td>{{ app.grades || 'N/A' }}</td>
          <td>{{ app.examScore || 'N/A' }}</td>
          <td>{{ formatDate(app.submissionTimestamp) }}</td>
          <td>
            <slot name="status" :status="app.status">
              <StatusBadge :status="app.status || 'waitlisted'" />
            </slot>
          </td>
          <td>
            <slot name="actions" :application="app">
              <ViewButton @click="$emit('view', app)" />
            </slot>
          </td>
        </tr>
      </transition-group>
    </table>
    <div v-if="applications.length === 0" class="empty-state">
      Showing 0 waitlisted application(s).
    </div>
    <div v-else class="footer">
      Showing {{ applications.length }} waitlisted application(s).
    </div>
  </div>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue';
import ViewButton from './ViewButton.vue';
const props = defineProps({
  applications: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['view']);

function formatDate(ts) {
  if (!ts) return 'N/A';
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
</script>

<style scoped>
.table-wrapper {
  padding: 0 32px 12px 32px;
}
.waitlisted-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
  background: #fff;
  font-size: 1.05rem;
}
.waitlisted-table th {
  font-family: 'Inter', sans-serif;
  text-align: left;
  color: #888;
  font-weight: 600;
  padding: 12px 8px 8px 0;
  border-bottom: 2px solid #f5f5f5;
}
.waitlisted-table td {
  font-family: 'Inter', sans-serif;
  padding: 14px 8px 14px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #222;
  vertical-align: middle;
  font-weight: 400;
  font-size: 1.05rem;
}
.empty-state {
  font-family: 'Inter', sans-serif;
  color: #aaa;
  padding: 18px 0 0 0;
  text-align: center;
}
.footer {
  font-family: 'Inter', sans-serif;
  color: #888;
  font-size: 0.98rem;
  padding: 10px 0 0 0;
  text-align: left;
}
.row-fade-enter-active, .row-fade-leave-active {
  transition: all 0.4s cubic-bezier(.4,0,.2,1);
}
.row-fade-enter-from, .row-fade-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
.row-fade-enter-to, .row-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style> 