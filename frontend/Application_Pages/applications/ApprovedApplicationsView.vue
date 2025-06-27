<template>
  <div class="page-container">
    <h1 class="page-title">Approved Applications</h1>
    <p class="page-desc">Students who have been approved for enrollment.</p>
    <div v-if="approved.length === 0" class="empty-state">
      <img src="../../Assets/approved-applications-logo.svg" class="empty-icon" alt="No Approved" />
      <h2 class="empty-title">No Approved Applications</h2>
      <p class="empty-desc">No applications have been approved yet. Review pending applications to approve them.</p>
    </div>
    <div v-else class="card">
      <div class="card-header">
        <span class="card-title">
          <img src="../../Assets/approved-applications-logo.svg" class="card-icon" alt="Approved" />
          Approved <span class="count">({{ approvedCount }})</span>
        </span>
        <span class="card-sub">These students have successfully secured a slot.</span>
      </div>
      <ApprovedApplicationsTable :applications="approved" @view="goToApplicantProfile" />
    </div>
  </div>
</template>

<script setup>
import ApprovedApplicationsTable from './components/ApprovedApplicationsTable.vue';
import { storeToRefs } from 'pinia';
import { useApplicationsStore } from '../store/applications';
import { useRouter } from 'vue-router';

const store = useApplicationsStore();
const { approved, approvedCount } = storeToRefs(store);
const router = useRouter();
function goToApplicantProfile(app) {
  router.push(`/admin/applicant-profile/${app.id || app.lrn}`);
}
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
  color: #43a047;
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
</style> 