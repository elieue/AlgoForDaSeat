<template>
  <div class="info-card">
    <div class="info-title-row">
      <span class="info-title">Application Details</span>
      <span class="info-sub">Submitted on: {{ formatTimestamp(applicant.submissionTimestamp) }}</span>
    </div>
    <div class="info-grid">
      <div v-for="item in infoItems" :key="item.label" class="info-item">
        <img :src="item.icon" class="info-icon" :alt="item.label + ' icon'" />
        <span class="info-label">{{ item.label }}</span>
        <span class="info-value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import emailIcon from '../../Assets/email-icon.svg'
import ageIcon from '../../Assets/age-logo.svg'
import genderIcon from '../../Assets/gender-logo.svg'
import ethnicityIcon from '../../Assets/ethnicity-logo.svg'
import addressIcon from '../../Assets/address-logo.svg'
import schoolIcon from '../../Assets/school-attended-logo.svg'
import gradesIcon from '../../Assets/grades-logo.svg'
import examIcon from '../../Assets/entrance-exam-logo.svg'
import motherIcon from '../../Assets/person-logo.svg'
import fatherIcon from '../../Assets/person-logo.svg'
import economicStatusIcon from '../../Assets/economic-status-logo.svg'
import proximityIcon from '../../Assets/proximity-logo.svg'
import incomeIcon from '../../Assets/monthly-income-logo.svg'
import docsIcon from '../../Assets/supporting-documents-logo.svg'

const props = defineProps({
  applicant: { type: Object, required: true }
})

const infoItems = computed(() => [
  { label: 'Full Name', value: props.applicant.fullName || 'N/A', icon: personIcon },
  { label: 'Email', value: props.applicant.email || 'N/A', icon: emailIcon },
  { label: 'Age', value: props.applicant.age || 'N/A', icon: ageIcon },
  { label: 'Gender', value: props.applicant.gender || 'N/A', icon: genderIcon },
  { label: 'Ethnicity', value: props.applicant.ethnicity || 'N/A', icon: ethnicityIcon },
  { label: 'Address', value: props.applicant.address || 'N/A', icon: addressIcon },
  { label: 'School Attended', value: props.applicant.schoolAttended || 'N/A', icon: schoolIcon },
  { label: 'Grades/GPA', value: props.applicant.grades || 'N/A', icon: gradesIcon },
  { label: 'Entrance Exam Score', value: props.applicant.examScore || 'N/A', icon: examIcon },
  { label: "Mother's Name", value: props.applicant.motherName || 'N/A', icon: motherIcon },
  { label: "Father's Name", value: props.applicant.fatherName || 'Unknown', icon: fatherIcon },
  { label: 'Economic Status', value: props.applicant.economicStatus || 'N/A', icon: economicStatusIcon },
  { label: 'Proximity to School (km)', value: props.applicant.proximity || 'N/A', icon: proximityIcon },
  { label: 'Household Monthly Income', value: formatIncome(props.applicant.monthlyIncome), icon: incomeIcon },
  { label: 'Supporting Documents', value: formatDocuments(props.applicant.supportingDocuments), icon: docsIcon },
])

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
</script>

<style scoped>
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
  transition: all 0.18s ease;
}
.info-item:hover {
  background: rgba(247, 166, 0, 0.05);
  transform: translateX(2px);
}
.info-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: inline-block;
}
.info-item:hover .info-icon {
  transform: scale(1.1);
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
@media (max-width: 900px) {
  .info-card { padding: 18px 8px 12px 8px; }
  .info-grid { grid-template-columns: 1fr; gap: 12px 0; }
}
</style> 