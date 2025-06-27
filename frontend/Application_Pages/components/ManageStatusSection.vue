<template>
  <div class="status-card">
    <div class="status-title">Manage Application Status</div>
    <div class="status-desc">Update the student's application status.</div>
    <div class="status-row">
      <select v-model="selectedStatus" class="status-select">
        <option value="Pending">Pending</option>
        <option value="Waitlisted">Waitlisted</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button class="save-btn" @click="saveStatus">Save Status (Auto-saves on select)</button>
    </div>
    <button class="edit-btn" disabled>Edit Application Data (Future)</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  applicant: { type: Object, required: true }
})
const emit = defineEmits(['statusChange'])
const selectedStatus = ref(props.applicant.status)
watch(selectedStatus, (val) => emit('statusChange', val))
function saveStatus() {
  emit('statusChange', selectedStatus.value)
}
</script>

<style scoped>
.status-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  padding: 32px 40px 24px 40px;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.status-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.18rem;
  font-weight: 800;
  color: #222;
}
.status-desc {
  font-family: 'Inter', sans-serif;
  color: #888;
  font-size: 1.02rem;
  font-weight: 500;
  margin-bottom: 8px;
}
.status-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 8px;
}
.status-select {
  font-family: 'Inter', sans-serif;
  font-size: 1.08rem;
  border: 2px solid #f7a600;
  border-radius: 8px;
  padding: 8px 18px;
  color: #222;
  background: #fffbe6;
  font-weight: 600;
  outline: none;
  transition: border-color 0.18s;
}
.save-btn {
  font-family: 'Poppins', sans-serif;
  background: #f7a600;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 28px;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(247,166,0,0.10);
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
}
.save-btn:hover:not(:disabled), .save-btn:focus:not(:disabled) {
  background: #ffb300;
  color: #fff;
  box-shadow: 0 4px 16px 0 rgba(247,166,0,0.18);
}
.edit-btn {
  font-family: 'Poppins', sans-serif;
  background: #fff;
  color: #888;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px 28px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: not-allowed;
  margin-top: 8px;
}
@media (max-width: 900px) {
  .status-card { padding: 18px 8px 12px 8px; }
  .status-row { flex-direction: column; align-items: stretch; gap: 10px; }
}
</style> 