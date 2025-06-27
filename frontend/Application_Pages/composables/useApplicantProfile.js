import { ref } from 'vue'
import { useApplicationsStore } from '../store/applications'

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
      // Simulate API delay
      await new Promise(r => setTimeout(r, 800))
      
      const store = useApplicationsStore()
      
      // Combine all arrays and search by both LRN and ID
      const all = [
        ...store.pending,
        ...store.waitlisted,
        ...store.approved,
        ...store.rejected
      ]
      
      // Try to find by LRN first, then by ID (always compare as strings)
      const found = all.find(a => String(a.lrn) === String(applicantId) || String(a.id) === String(applicantId))
      
      if (found) {
        // Return a copy of the found applicant with all enhanced data
        applicant.value = { 
          ...found,
          // Ensure all required fields are present with defaults if missing
          age: found.age || 'N/A',
          gender: found.gender || 'N/A',
          address: found.address || 'N/A',
          contactNumber: found.contactNumber || 'N/A',
          email: found.email || 'N/A',
          schoolAttended: found.schoolAttended || 'N/A',
          saceStatus: found.saceStatus || 'N/A',
          academicExcellence: found.academicExcellence || 'N/A',
          entranceExam: found.entranceExam || 'N/A',
          grades: found.grades || 'N/A',
          monthlyIncome: found.monthlyIncome || 'N/A',
          socioeconomicEquity: found.socioeconomicEquity || 'N/A',
          supportingDocuments: found.supportingDocuments || [],
          applicationId: found.applicationId || found.id || 'N/A',
          photoUrl: found.photoUrl || '/api/photos/default.jpg',
          submissionTimestamp: found.submissionTimestamp || found.submissionDate || 'N/A'
        }
      } else {
        error.value = `Applicant with ID "${applicantId}" not found`
      }
    } catch (err) {
      error.value = 'Failed to load applicant data'
    } finally {
      loading.value = false
    }
  }

  return { applicant, loading, error, fetchApplicant }
} 