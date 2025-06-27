import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import dashboardAPI from '@/api/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const stats = ref({
    total: 0,
    admitted: 0,
    rejected: 0,
    waitlisted: 0,
    pending: 0
  })
  
  const applications = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Computed properties for stat cards
  const statCards = computed(() => [
    {
      value: 50, // Total available slots (hardcoded for now)
      label: 'Total Available Slots',
      sublabel: `${stats.value.admitted} slots filled`,
      color: 'blue',
      iconName: 'Clock'
    },
    {
      value: stats.value.admitted,
      label: 'Approved Students',
      sublabel: `${stats.value.admitted > 0 ? Math.round((stats.value.admitted / 50) * 100) : 0}% of total slots`,
      color: 'green',
      iconName: 'Check'
    },
    {
      value: stats.value.pending,
      label: 'Pending Applications',
      sublabel: 'Awaiting review and ranking',
      color: 'yellow',
      iconName: 'Clock'
    },
    {
      value: stats.value.waitlisted,
      label: 'Waitlisted Applications',
      sublabel: 'Awaiting slot availability',
      color: 'blue',
      iconName: 'Pause'
    },
    {
      value: stats.value.rejected,
      label: 'Rejected Applications',
      sublabel: 'Did not meet criteria',
      color: 'red',
      iconName: 'X'
    }
  ])

  // Actions
  const fetchStats = async () => {
    try {
      loading.value = true
      error.value = null
      const data = await dashboardAPI.getApplicationStats()
      stats.value = data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching stats:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchAllApplications = async () => {
    try {
      loading.value = true
      error.value = null
      const data = await dashboardAPI.getAllApplications()
      applications.value = data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching applications:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchApplicationsByStatus = async (status) => {
    try {
      loading.value = true
      error.value = null
      const data = await dashboardAPI.getApplicationsByStatus(status)
      applications.value = data
    } catch (err) {
      error.value = err.message
      console.error(`Error fetching ${status} applications:`, err)
    } finally {
      loading.value = false
    }
  }

  const allocateSlots = async () => {
    try {
      loading.value = true
      error.value = null
      const result = await dashboardAPI.allocateSlots()
      // Refresh stats after allocation
      await fetchStats()
      return result
    } catch (err) {
      error.value = err.message
      console.error('Error allocating slots:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getDebugInfo = async () => {
    try {
      const data = await dashboardAPI.getDebugInfo()
      return data
    } catch (err) {
      console.error('Error fetching debug info:', err)
      throw err
    }
  }

  return {
    // State
    stats,
    applications,
    loading,
    error,
    
    // Computed
    statCards,
    
    // Actions
    fetchStats,
    fetchAllApplications,
    fetchApplicationsByStatus,
    allocateSlots,
    getDebugInfo
  }
}) 