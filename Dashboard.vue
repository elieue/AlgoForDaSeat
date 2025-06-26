<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <Sidebar />
    
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Slot Visualization</h2>
            <p class="text-gray-600 mt-1">Real-time overview of school slot allocation</p>
          </div>
          <div class="flex items-center space-x-4">
            <select 
              v-model="selectedChart" 
              class="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="all">All Charts</option>
              <option value="slot">Slot Allocation</option>
              <option value="density">Application Density</option>
              <option value="socio">Socioeconomic Distribution</option>
              <option value="exam">Entrance Exam Results</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Main Dashboard Content - Scrollable -->
      <div class="flex-1 overflow-y-auto overflow-x-hidden">
        <div class="p-8 min-h-full">
          <!-- Slot Allocation Section -->
          <div v-if="selectedChart === 'all' || selectedChart === 'slot'" 
               class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 animate-fade-in-up">
            <div class="lg:col-span-2">
              <div v-if="isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="animate-pulse">
                  <div class="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                  <div class="h-4 w-64 bg-gray-200 rounded mb-6"></div>
                  <div class="h-72 bg-gray-200 rounded"></div>
                </div>
              </div>
              <SlotAllocationChart v-else :data="stats?.slotAllocation" />
            </div>
            
            <div class="space-y-4">
              <div v-if="isLoading" class="space-y-4">
                <div v-for="i in 3" :key="i" class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div class="animate-pulse">
                    <div class="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              <KeyStatistics v-else :data="stats?.slotAllocation" />
            </div>
          </div>

          <!-- Data Visualization Section -->
          <div v-if="selectedChart === 'all' || selectedChart === 'density' || selectedChart === 'socio'" 
               class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fade-in-up">
            <!-- Interactive Map -->
            <div v-if="selectedChart === 'all' || selectedChart === 'density'" class="animate-slide-in-left">
              <div v-if="cityLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="animate-pulse">
                  <div class="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                  <div class="h-4 w-64 bg-gray-200 rounded mb-6"></div>
                  <div class="h-96 bg-gray-200 rounded"></div>
                </div>
              </div>
              <InteractiveMap v-else :city-data="cityData" />
            </div>

            <!-- Socioeconomic Distribution -->
            <div v-if="selectedChart === 'all' || selectedChart === 'socio'" class="animate-slide-in-left">
              <div v-if="isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="animate-pulse">
                  <div class="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                  <div class="h-4 w-64 bg-gray-200 rounded mb-6"></div>
                  <div class="h-72 bg-gray-200 rounded"></div>
                </div>
              </div>
              <SocioeconomicChart v-else :data="stats?.socioeconomicDistribution" />
            </div>
          </div>

          <!-- Entrance Exam Results -->
          <div v-if="selectedChart === 'all' || selectedChart === 'exam'" class="animate-fade-in-up">
            <div v-if="isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="animate-pulse">
                <div class="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                <div class="h-4 w-64 bg-gray-200 rounded mb-6"></div>
                <div class="h-72 bg-gray-200 rounded"></div>
              </div>
            </div>
            <ExamResultsChart v-else :data="stats?.examResults" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Sidebar from '../components/Sidebar.vue'
import SlotAllocationChart from '../components/SlotAllocationChart.vue'
import InteractiveMap from '../components/InteractiveMap.vue'
import SocioeconomicChart from '../components/SocioeconomicChart.vue'
import ExamResultsChart from '../components/ExamResultsChart.vue'
import KeyStatistics from '../components/KeyStatistics.vue'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    SlotAllocationChart,
    InteractiveMap,
    SocioeconomicChart,
    ExamResultsChart,
    KeyStatistics
  },
  setup() {
    const selectedChart = ref('all')
    const stats = ref(null)
    const cityData = ref(null)
    const isLoading = ref(true)
    const cityLoading = ref(true)
    const error = ref(null)

    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/stats')
        stats.value = response.data
        isLoading.value = false
      } catch (err) {
        error.value = err
        isLoading.value = false
      }
    }

    const fetchCityData = async () => {
      try {
        const response = await axios.get('/api/cities')
        cityData.value = response.data
        cityLoading.value = false
      } catch (err) {
        cityLoading.value = false
      }
    }

    onMounted(() => {
      fetchDashboardStats()
      fetchCityData()
    })

    return {
      selectedChart,
      stats,
      cityData,
      isLoading,
      cityLoading,
      error
    }
  }
}
</script>

<style scoped>
/* Component-specific styles */
</style>