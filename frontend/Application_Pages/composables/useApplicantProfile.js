import { ref } from 'vue'
import applicationsAPI from '../api/applications.js'

export default function useApplicantProfile() {
  const applicant = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchApplicant(applicantId) {
    if (!applicantId) {
      error.value = 'No applicant ID provided'
      return
    }

    loading.value = true
    error.value = null
    applicant.value = null
    
    try {
      // Fetch applicant data from API
      const applicantData = await applicationsAPI.getApplicationById(applicantId)
      
      if (applicantData) {
        // Return a copy of the found applicant with all enhanced data
        applicant.value = { 
          ...applicantData,
          // Ensure all required fields are present with defaults if missing
          age: applicantData.age || 'N/A',
          gender: applicantData.gender || 'N/A',
          address: applicantData.address || 'N/A',
          contactNumber: applicantData.contactNumber || 'N/A',
          email: applicantData.email || 'N/A',
          schoolAttended: applicantData.schoolAttended || 'N/A',
          saceStatus: applicantData.saceStatus || 'N/A',
          academicExcellence: applicantData.academicExcellence || 'N/A',
          entranceExam: applicantData.entranceExam || 'N/A',
          grades: applicantData.grades || 'N/A',
          monthlyIncome: applicantData.monthlyIncome || 'N/A',
          socioeconomicEquity: applicantData.socioeconomicEquity || 'N/A',
          supportingDocuments: applicantData.supportingDocuments || [],
          applicationId: applicantData.applicationId || applicantData.id || 'N/A',
          photoUrl: applicantData.photoUrl || '/api/photos/default.jpg',
          submissionTimestamp: applicantData.submissionTimestamp || applicantData.submissionDate || 'N/A'
        }
      } else {
        error.value = `Applicant with ID "${applicantId}" not found`
      }
    } catch (err) {
      console.error('Error fetching applicant:', err)
      error.value = 'Failed to load applicant data'
    } finally {
      loading.value = false
    }
  }

  return { applicant, loading, error, fetchApplicant }
} 