<template>
  <div class="table-wrapper">
    <table class="rankings-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Full Name</th>
          <th>GPA</th>
          <th>Exam Score</th>
          <th>Proximity (km)</th>
          <th>Income (PHP)</th>
          <th>Eligibility for Slots</th>
          <th>Actions</th>
        </tr>
      </thead>
      <transition-group name="row-fade" tag="tbody">
        <tr v-for="app in applications" :key="app.lrn || app.id">
          <td class="rank-cell">{{ app.rank || 'N/A' }}</td>
          <td>{{ app.fullName || 'N/A' }}</td>
          <td>{{ app.grades || 'N/A' }}</td>
          <td>{{ app.examScore || 'N/A' }}</td>
          <td>{{ app.proximity ? app.proximity + ' km' : 'N/A' }}</td>
          <td>{{ app.monthlyIncome ? '\u20b1' + app.monthlyIncome.toLocaleString() : 'N/A' }}</td>
          <td>
            <span :class="['eligibility-badge', eligibilityClass(app.eligibility)]">
              {{ app.eligibility || '—' }}
            </span>
          </td>
          <td>
            <ViewButton @click="$emit('view', app)" />
          </td>
        </tr>
      </transition-group>
    </table>
    <div v-if="applications.length === 0" class="empty-state">
      No ranked applications to display.
    </div>
  </div>
</template>

<script setup>
import ViewButton from './ViewButton.vue';
const props = defineProps({
  applications: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['view']);
function eligibilityClass(eligibility) {
  switch ((eligibility || '').toLowerCase()) {
    case 'high priority': return 'high';
    case 'moderate priority': return 'moderate';
    case 'low priority': return 'low';
    default: return '';
  }
}
</script>

<style scoped>
.table-wrapper {
  padding: 0 32px 12px 32px;
}
.rankings-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 18px; /* Figma: more space from card header */
  background: #fff;
  font-size: 1.05rem;
  min-width: 900px;
}
.rankings-table th {
  font-family: 'Inter', sans-serif;
  text-align: left;
  color: #222; /* Figma: black */
  font-weight: 700;
  font-size: 1.05rem;
  background: none;
  border-bottom: none;
  padding: 24px 24px 20px 0; /* Figma: more horizontal padding */
}
.rankings-table th:first-child {
  padding-left: 0;
  padding-right: 16px;
}
.rankings-table th:last-child {
  padding-right: 0;
}
.rankings-table td {
  font-family: 'Inter', sans-serif;
  padding: 24px 24px 20px 0; /* Figma: more horizontal padding */
  border-bottom: 1px solid #f0f0f0;
  color: #222; /* Figma: black */
  vertical-align: middle;
  font-weight: 400;
  font-size: 1.05rem;
  background: none;
  line-height: 1.6;
}
.rankings-table td:first-child {
  padding-left: 0;
  padding-right: 16px;
}
.rankings-table td:last-child {
  padding-right: 0;
}
.rankings-table td:nth-child(2) {
  font-weight: 700; /* Figma: bold for name */
}
.rank-cell {
  font-weight: 700;
  color: #F7A600; /* Figma: orange */
  font-size: 1.15rem;
}
.eligibility-badge {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 16px;
  font-size: 0.98rem;
  font-weight: 700;
  border: 1.5px solid;
  text-transform: capitalize;
  background: #f5f5f5;
}
.eligibility-badge.high {
  background: #E8F5E9;
  color: #218838;
  border: 1.5px solid #43A047;
  font-weight: 700;
}
.eligibility-badge.moderate {
  background: #fffde7;
  color: #bfa600;
  border-color: #ffe082;
}
.eligibility-badge.low {
  background: #ffebee;
  color: #b71c1c;
  border-color: #ffcdd2;
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