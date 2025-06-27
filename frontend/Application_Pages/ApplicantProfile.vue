<template>
  <transition name="page-fade-slide">
    <div v-if="!loading && applicant" class="profile-page">
      <div class="header-row">
        <button class="back-btn" @click="goBack">
          <img :src="backArrow" alt="Back" class="back-arrow-svg" />
          Back to List
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
          </div>
          <div class="header-status">
            <span :class="['status-badge', applicant.status.toLowerCase()]">{{ applicant.status }}</span>
          </div>
        </div>
      </div>
      <div class="info-card">
        <div class="info-title-row">
          <span class="info-title">Application Details</span>
          <span class="info-sub">Submitted on: {{ formatTimestamp(applicant.submissionTimestamp) }}</span>
        </div>
        <div class="info-grid">
          <div class="info-item" v-for="item in infoItems" :key="item.label">
            <img :src="item.icon" class="info-icon" :alt="item.label + ' icon'" />
            <span class="info-label">{{ item.label }}</span>
            <span class="info-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class="status-card">
        <div class="status-title">Manage Application Status</div>
        <div class="status-desc">Update the student's application status.</div>
        <div class="status-row">
          <select v-model="selectedStatus" class="status-select">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="waitlisted">Waitlisted</option>
          </select>
          <button class="save-btn" @click="saveStatus">Save Status (Auto-saves on select)</button>
        </div>
      </div>
      <!-- Success notification -->
      <transition name="notification">
        <div v-if="showSuccess" class="success-notification">
          Status updated successfully!
        </div>
      </transition>
    </div>
    <SkeletonLoader v-else-if="loading" />
    <div v-else-if="!loading && error" class="error-state">Applicant not found or error loading profile.</div>
  </transition>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch, computed } from 'vue'
import SkeletonLoader from './components/SkeletonLoader.vue'
import useApplicantProfile from './composables/useApplicantProfile'
import backArrow from '../Assets/back-arrow.svg'
import personIcon from '../Assets/person-logo.svg'
import emailIcon from '../Assets/email-icon.svg'
import ageIcon from '../Assets/age-logo.svg'
import genderIcon from '../Assets/gender-logo.svg'
import ethnicityIcon from '../Assets/ethnicity-logo.svg'
import addressIcon from '../Assets/address-logo.svg'
import schoolIcon from '../Assets/school-attended-logo.svg'
import gradesIcon from '../Assets/grades-logo.svg'
import examIcon from '../Assets/entrance-exam-logo.svg'
import economicStatusIcon from '../Assets/economic-status-logo.svg'
import proximityIcon from '../Assets/proximity-logo.svg'
import incomeIcon from '../Assets/monthly-income-logo.svg'
import docsIcon from '../Assets/supporting-documents-logo.svg'
import editIcon from '../Assets/edit-application-logo.svg'
import caretDownIcon from '../Assets/chevron-down-solid.svg'
import { useApplicationsStore } from './store/applications'

const route = useRoute()
const router = useRouter()
const applicantId = route.params.applicantId
const { applicant, loading, error, fetchApplicant } = useApplicantProfile()
const showSuccess = ref(false)
const selectedStatus = ref('')

const infoItems = computed(() => [
  { label: 'Full Name', value: applicant.value.fullName || 'N/A', icon: personIcon },
  { label: 'Email', value: applicant.value.email || 'N/A', icon: emailIcon },
  { label: 'Age', value: applicant.value.age || 'N/A', icon: ageIcon },
  { label: 'Gender', value: applicant.value.gender || 'N/A', icon: genderIcon },
  { label: 'Ethnicity', value: applicant.value.ethnicity || 'N/A', icon: ethnicityIcon },
  { label: 'Address', value: applicant.value.address || 'N/A', icon: addressIcon },
  { label: 'School Attended', value: applicant.value.schoolAttended || 'N/A', icon: schoolIcon },
  { label: 'Grades/GPA', value: applicant.value.grades || 'N/A', icon: gradesIcon },
  { label: 'Entrance Exam Score', value: applicant.value.examScore || 'N/A', icon: examIcon },
  { label: "Mother's Name", value: applicant.value.motherName || 'N/A', icon: personIcon },
  { label: "Father's Name", value: applicant.value.fatherName || 'Unknown', icon: personIcon },
  { label: 'Economic Status', value: applicant.value.economicStatus || 'N/A', icon: economicStatusIcon },
  { label: 'Proximity to School (km)', value: applicant.value.proximity || 'N/A', icon: proximityIcon },
  { label: 'Household Monthly Income', value: formatIncome(applicant.value.monthlyIncome), icon: incomeIcon },
  { label: 'Supporting Documents', value: formatDocuments(applicant.value.supportingDocuments), icon: docsIcon },
])

function goBack() {
  router.back()
}
function saveStatus() {
  if (applicant.value && selectedStatus.value) {
    try {
      // Update the store
      const store = useApplicationsStore();
      store.updateApplicantStatus(applicant.value.id, selectedStatus.value);
      
      // Update local state
      applicant.value.status = selectedStatus.value;
      
      // Show success notification
      showSuccess.value = true;
      setTimeout(() => { showSuccess.value = false }, 2000);
    } catch (error) {
      // Could add error notification here
    }
  }
}
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
function formatIncome(income) {
  if (!income || income === 'N/A') return 'N/A'
  return `$${Number(income).toLocaleString()}`
}
function formatDocuments(documents) {
  if (!documents || !Array.isArray(documents) || documents.length === 0) return 'N/A'
  return documents.join(', ')
}
onMounted(() => {
  fetchApplicant(applicantId)
  watch(applicant, (val) => {
    if (val) selectedStatus.value = val.status
  }, { immediate: true })
})
watch(() => route.params.applicantId, (newId) => {
  if (newId) fetchApplicant(newId)
})
</script>

<style scoped>
.profile-page {
  padding: 0 0 32px 0;
  background: var(--color-bg);
  min-height: 100vh;
  animation: fadein 0.5s;
  position: relative;
}
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
.back-arrow-svg {
  width: 20px;
  height: 20px;
  margin-right: 6px;
}
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
.status-badge.pending { background: #fff7e6; color: #f7a600; border-color: #ffe0a3; }
.status-badge.approved { background: #e8f5e9; color: #43a047; border-color: #a5d6a7; }
.status-badge.rejected { background: #ffebee; color: #e53935; border-color: #ffcdd2; }
.info-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  padding: 32px 40px 24px 40px;
  margin-bottom: 0;
}
.info-title-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 18px;
}
.info-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: #222;
}
.info-sub {
  font-family: 'Inter', sans-serif;
  color: #888;
  font-size: 1.02rem;
  font-weight: 500;
}
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px 32px;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 1.08rem;
  color: #222;
  padding: 8px 12px;
  border-radius: 8px;
}
.info-label {
  font-weight: 600;
  color: #888;
  min-width: 120px;
}
.info-value {
  font-weight: 700;
  color: #222;
}
.info-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: inline-block;
}
.status-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  padding: 32px 40px 24px 40px;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 32px;
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
.success-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  z-index: 1000;
}
.error-state {
  color: #b71c1c;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 80px;
}
@media (max-width: 900px) {
  .profile-content {
    padding: 0 8px;
  }
  .info-card, .status-card { padding: 18px 8px 12px 8px; }
  .info-grid { grid-template-columns: 1fr; gap: 12px 0; }
}
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
.notification-enter-active, .notification-leave-active {
  transition: all 0.3s ease;
}
.notification-enter-from, .notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.notification-enter-to, .notification-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style> 