<template>
  <div class="page-container">
    <h1 class="page-title">Waitlisted Applications</h1>
    <p class="page-desc">Applications awaiting slot availability.</p>
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading waitlisted applications...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p class="error-message">{{ error }}</p>
      <button @click="loadData" class="retry-btn">Retry</button>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="waitlisted.length === 0" class="empty-state">
      <img src="../../Assets/waitlisted-applications-logo.svg" class="empty-icon" alt="No Waitlisted" />
      <h2 class="empty-title">No Waitlisted Applications</h2>
      <p class="empty-desc">No applications are currently on the waitlist.</p>
    </div>
    
    <!-- Data State -->
    <div v-else class="card">
      <div class="card-header">
        <span class="card-title">
          <img src="../../Assets/waitlisted-applications-logo.svg" class="card-icon" alt="Waitlisted" />
          Waitlisted <span class="count">({{ waitlistedCount }})</span>
        </span>
        <span class="card-sub">These applications are qualified but are currently on the waitlist due to slot limitations.</span>
      </div>
      <WaitlistedApplicationsTable :applications="waitlisted" @view="goToApplicantProfile" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import WaitlistedApplicationsTable from './components/WaitlistedApplicationsTable.vue';
import { storeToRefs } from 'pinia';
import { useApplicationsStore } from '../store/applications';
import { useRouter } from 'vue-router';

const store = useApplicationsStore();
const { waitlisted, waitlistedCount, loading, error } = storeToRefs(store);
const router = useRouter();

function goToApplicantProfile(app) {
  router.push(`/admin/applicant-profile/${app.id || app.lrn}`);
}

async function loadData() {
  await store.loadWaitlistedApplications();
}

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.page-container {
  padding: 32px 40px;
}
.page-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: #f7a600;
  margin-bottom: 4px;
}
.page-desc {
  font-family: 'Inter', sans-serif;
  color: #888;
  margin-bottom: 28px;
  font-size: 1.1rem;
}
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  padding: 0 0 18px 0;
  margin-top: 8px;
}
.card-header {
  padding: 24px 32px 8px 32px;
}
.card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #222;
  display: flex;
  align-items: center;
  gap: 10px;
}
.card-icon {
  width: 24px;
  height: 24px;
}
.count {
  font-family: 'Poppins', sans-serif;
  color: #1976d2;
  font-weight: 700;
}
.card-sub {
  font-family: 'Inter', sans-serif;
  display: block;
  color: #888;
  font-size: 1rem;
  margin-top: 2px;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 2px dashed #f0f0f0;
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
}
.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
}
.empty-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #888;
  margin-bottom: 8px;
}
.empty-desc {
  font-family: 'Inter', sans-serif;
  color: #aaa;
  font-size: 1rem;
  max-width: 400px;
}
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
}
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f7a600;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 2px dashed #ffcdd2;
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
}
.error-message {
  font-family: 'Inter', sans-serif;
  color: #d32f2f;
  font-size: 1rem;
  margin-bottom: 16px;
}
.retry-btn {
  background: #f7a600;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.retry-btn:hover {
  background: #e69500;
}
</style> 