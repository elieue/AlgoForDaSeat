<template>
  <div class="header-row">
    <button class="back-btn" @click="$emit('back')">
      <span class="back-arrow">&#8592;</span> Back to List
    </button>
    <div class="header-main">
      <div class="header-info">
        <div class="lrn-row">
          <span class="lrn-label">LRN:</span>
          <span class="lrn-value">{{ applicant.lrn }}</span>
        </div>
        <div class="name-row">
          <span class="applicant-name">{{ applicant.fullName }}</span>
        </div>
        <div class="id-row">
          <span class="app-id">Application ID: {{ applicant.applicationId }}</span>
        </div>
        <div class="timestamp-row">
          <span class="timestamp">Submitted: {{ formatTimestamp(applicant.submissionTimestamp) }}</span>
        </div>
      </div>
      <div class="header-status">
        <span :class="['status-badge', applicant.status.toLowerCase()]">{{ applicant.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  applicant: { type: Object, required: true }
})
const emit = defineEmits(['back'])

function formatTimestamp(timestamp) {
  if (!timestamp || timestamp === 'N/A') return 'N/A'
  try {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  } catch (e) {
    return timestamp
  }
}
</script>

<style scoped>
.header-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fff;
  border-radius: 0 0 18px 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  padding: 32px 40px 18px 40px;
  margin-bottom: 12px;
}
.back-btn {
  background: none;
  border: none;
  color: #74512D;
  font-family: 'Poppins', sans-serif;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  transition: all 0.18s ease;
  padding: 8px 12px;
  border-radius: 8px;
}
.back-btn:hover { 
  color: #f7a600; 
  background: rgba(247, 166, 0, 0.1);
  transform: translateX(-2px);
}
.back-btn:active {
  transform: translateX(-1px);
}
.back-arrow { font-size: 1.2rem; margin-right: 2px; }
.header-main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}
.header-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.lrn-row {
  font-size: 1.02rem;
  color: #f7a600;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  margin-bottom: 2px;
}
.lrn-label { color: #888; font-weight: 500; margin-right: 2px; }
.lrn-value { color: #f7a600; font-weight: 700; }
.name-row .applicant-name {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #222;
}
.id-row .app-id {
  font-family: 'Inter', sans-serif;
  font-size: 1.08rem;
  color: #888;
  font-weight: 500;
}
.timestamp-row .timestamp {
  font-family: 'Inter', sans-serif;
  font-size: 0.98rem;
  color: #666;
  font-weight: 400;
}
.header-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}
.status-badge {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 16px;
  font-size: 1.02rem;
  font-weight: 700;
  border: 1.5px solid;
  text-transform: capitalize;
  background: #f5f5f5;
  transition: all 0.18s ease;
  cursor: default;
}
.status-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.status-badge.pending { background: #fff7e6; color: #f7a600; border-color: #ffe0a3; }
.status-badge.waitlisted { background: #e3f2fd; color: #1976d2; border-color: #90caf9; }
.status-badge.approved { background: #e8f5e9; color: #43a047; border-color: #a5d6a7; }
.status-badge.rejected { background: #ffebee; color: #e53935; border-color: #ffcdd2; }
@media (max-width: 700px) {
  .header-row { padding: 18px 8px 12px 8px; }
  .header-main { flex-direction: column; align-items: flex-start; gap: 12px; }
  .header-status { align-items: flex-start; }
}
</style> 