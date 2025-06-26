

// Dashboard data state
let dashboardData = {
  stats: null,
  cityData: null,
  isLoading: true,
  selectedChart: 'all'
}

// Chart instances
let chartInstances = {
  slotAllocation: null,
  socioeconomic: null,
  examResults: null
}

document.getElementById('root').innerHTML = `
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">AlgoForDaSeat Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold mb-2">Slot Allocation</h2>
        <canvas id="slotAllocationChart" height="300"></canvas>
      </div>
      <!-- Add more sections/charts as needed -->
    </div>
  </div>
`
// Map instance
let mapInstance = null

// Fetch dashboard statistics (mocked)
async function fetchDashboardStats() {
  // Mock data
  dashboardData.stats = {
    slotAllocation: {
      totalSlots: 100,
      filledSlots: 65,
      availableSlots: 35
    },
    socioeconomicDistribution: {
      lower: 40,
      middle: 45,
      upper: 15
    },
    examResults: {
      passed: 70,
      failed: 30,
      passedCount: 70,
      failedCount: 30
    }
  }
  updateCharts()
}

// Fetch city data (mocked)
async function fetchCityData() {
  // Mock data
  dashboardData.cityData = [
    {
      cityName: 'Pasay',
      coordinates: '[[[120.9842,14.5995],[120.9850,14.6000],[120.9860,14.5990],[120.9842,14.5995]]]',
      proximityFromManila: 5,
      totalApplicants: 100,
      approvedApplicants: 60,
      pendingApplicants: 20,
      waitlistedApplicants: 10,
      rejectedApplicants: 10
    }
    // Add more mock cities if needed
  ]
  initializeMap()
}

// Initialize slot allocation chart
function createSlotAllocationChart() {
  const canvas = document.getElementById('slotAllocationChart')
  if (!canvas || !dashboardData.stats?.slotAllocation || !window.Chart) return

  if (chartInstances.slotAllocation) {
    chartInstances.slotAllocation.destroy()
  }

  const ctx = canvas.getContext('2d')
  const data = dashboardData.stats.slotAllocation
  const filledPercentage = Math.round((data.filledSlots / data.totalSlots) * 100)
  const availablePercentage = 100 - filledPercentage

  chartInstances.slotAllocation = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Filled Slots', 'Available Slots'],
      datasets: [{
        data: [filledPercentage, availablePercentage],
        backgroundColor: ['#F59E0B', '#E5E7EB'],
        borderWidth: 0,
        cutout: '70%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: { family: 'Inter', size: 12 }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || ''
              const value = context.parsed
              const actualValue = label === 'Filled Slots' ? data.filledSlots : data.availableSlots
              return `${label}: ${value}% (${actualValue} slots)`
            }
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    }
  })
}

// Initialize socioeconomic chart
function createSocioeconomicChart() {
  const canvas = document.getElementById('socioeconomicChart')
  if (!canvas || !dashboardData.stats?.socioeconomicDistribution || !window.Chart) return

  if (chartInstances.socioeconomic) {
    chartInstances.socioeconomic.destroy()
  }

  const ctx = canvas.getContext('2d')
  const data = dashboardData.stats.socioeconomicDistribution

  chartInstances.socioeconomic = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Lower Class', 'Middle Class', 'Upper Class'],
      datasets: [{
        data: [data.lower, data.middle, data.upper],
        backgroundColor: ['#F59E0B', '#10B981', '#EF4444'],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}%`
            }
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    }
  })
}

// Initialize exam results chart
function createExamResultsChart() {
  const canvas = document.getElementById('examResultsChart')
  if (!canvas || !dashboardData.stats?.examResults || !window.Chart) return

  if (chartInstances.examResults) {
    chartInstances.examResults.destroy()
  }

  const ctx = canvas.getContext('2d')
  const data = dashboardData.stats.examResults

  chartInstances.examResults = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Passed', 'Failed'],
      datasets: [{
        data: [data.passed, data.failed],
        backgroundColor: ['#10B981', '#EF4444'],
        borderRadius: 4,
        barThickness: 40
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: function(value) { return value + '%' } },
          grid: { display: true }
        },
        y: { grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              if (context.label === 'Passed') {
                return `${data.passedCount} student(s)\n(${data.passed}% of total)`
              } else {
                return `${data.failedCount} student(s)\n(${data.failed}% of total)`
              }
            }
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    }
  })
}

// Initialize interactive map
function initializeMap() {
  const mapContainer = document.getElementById('mapContainer')
  if (!mapContainer || !window.L || !dashboardData.cityData) return

  if (!mapInstance) {
    mapInstance = L.map(mapContainer).setView([14.5995, 120.9842], 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance)
  }

  // Clear existing layers (except tile layer)
  mapInstance.eachLayer((layer) => {
    if (layer.options && !layer.options.attribution) {
      mapInstance.removeLayer(layer)
    }
  })

  dashboardData.cityData.forEach((city) => {
    if (city.cityName === 'Pasay') {
      try {
        const coordinates = JSON.parse(city.coordinates)
        const polygon = L.polygon(coordinates, {
          color: '#10B981',
          fillColor: '#10B981',
          fillOpacity: 0.7,
          weight: 2
        }).addTo(mapInstance)

        const popupContent = `
          <div class="p-4 font-inter">
            <h3 class="text-lg font-bold text-yellow-600 mb-2">${city.cityName}</h3>
            <p class="text-gray-600 mb-3">Proximity from Manila: ${city.proximityFromManila} km</p>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="font-semibold">Total Applicants:</span>
                <span class="font-bold">${city.totalApplicants}</span>
              </div>
              <div class="flex justify-between text-green-600">
                <span>Approved:</span>
                <span class="font-bold">${city.approvedApplicants}</span>
              </div>
              <div class="flex justify-between text-yellow-600">
                <span>Pending:</span>
                <span class="font-bold">${city.pendingApplicants}</span>
              </div>
              <div class="flex justify-between text-blue-600">
                <span>Waitlisted:</span>
                <span class="font-bold">${city.waitlistedApplicants}</span>
              </div>
              <div class="flex justify-between text-red-600">
                <span>Rejected:</span>
                <span class="font-bold">${city.rejectedApplicants}</span>
              </div>
            </div>
          </div>
        `
        polygon.bindPopup(popupContent)
        const markerLatLng = coordinates[0][0].slice().reverse()
        const marker = L.marker(markerLatLng).addTo(mapInstance)
        marker.bindPopup(popupContent)
      } catch (e) {
        console.error('Error parsing coordinates or creating map elements:', e)
      }
    }
  })
}

// Update all charts
function updateCharts() {
  createSlotAllocationChart()
  createSocioeconomicChart()
  createExamResultsChart()
  updateKeyStatistics()
}

// Update key statistics
function updateKeyStatistics() {
  if (!dashboardData.stats?.slotAllocation) return

  const data = dashboardData.stats.slotAllocation
  document.getElementById('totalCapacity').textContent = data.totalSlots
  document.getElementById('studentsApproved').textContent = data.filledSlots
  document.getElementById('slotsRemaining').textContent = data.availableSlots
  
  // Update header display as well
  document.getElementById('totalSlotsDisplay').textContent = data.totalSlots
  document.getElementById('filledSlotsDisplay').textContent = data.filledSlots
  document.getElementById('availableSlotsDisplay').textContent = data.availableSlots
}

// Handle chart selection
function handleChartSelection(value) {
  dashboardData.selectedChart = value
  const sections = document.querySelectorAll('[data-chart-section]')
  
  sections.forEach(section => {
    const sectionType = section.getAttribute('data-chart-section')
    if (value === 'all' || value === sectionType) {
      section.style.display = 'block'
    } else {
      section.style.display = 'none'
    }
  })
}

// Render the dashboard HTML
function renderDashboard() {
  document.getElementById('root').innerHTML = `
    <div class="flex h-screen bg-gray-50 overflow-hidden">
      <!-- Sidebar -->
      <div class="w-64 bg-white shadow-lg border-r border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center space-x-3">
            <div class="bg-yellow-500 p-2 rounded-lg">
              <svg class="text-white h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">AlgoForDaSeat</h1>
              <p class="text-sm text-gray-600">Admin Dashboard</p>
            </div>
          </div>
        </div>
        
        <nav class="mt-6">
          <div class="px-3">
            <div class="sidebar-item flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors mb-1 active">
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span class="font-medium">Dashboard</span>
            </div>
          </div>
        </nav>
      </div>
      
      <!-- Main Content -->
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
                id="chartSelector"
                class="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                onchange="handleChartSelection(this.value)"
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
            <div data-chart-section="slot" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 animate-fade-in-up">
              <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
                  <div class="flex justify-between items-center mb-6">
                    <div>
                      <h3 class="text-xl font-semibold text-gray-900">Slot Allocation Status</h3>
                      <p class="text-gray-600 text-sm mt-1">
                        Total Slots: <span class="font-medium" id="totalSlotsDisplay">-</span> | 
                        Filled Slots: <span class="font-medium" id="filledSlotsDisplay">-</span> | 
                        Available Slots: <span class="font-medium" id="availableSlotsDisplay">-</span>
                      </p>
                    </div>
                  </div>
                  <div class="chart-container">
                    <canvas id="slotAllocationChart"></canvas>
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <!-- Key Statistics Cards -->
                <div class="stat-card bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-3xl font-bold text-yellow-600" id="totalCapacity">-</p>
                      <p class="text-sm text-gray-600 font-medium">Total Capacity</p>
                    </div>
                    <div class="bg-yellow-100 p-3 rounded-full">
                      <svg class="text-yellow-600 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div class="stat-card bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-3xl font-bold text-green-600" id="studentsApproved">-</p>
                      <p class="text-sm text-gray-600 font-medium">Students Approved</p>
                    </div>
                    <div class="bg-green-100 p-3 rounded-full">
                      <svg class="text-green-600 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div class="stat-card bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-3xl font-bold text-blue-600" id="slotsRemaining">-</p>
                      <p class="text-sm text-gray-600 font-medium">Slots Remaining</p>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-full">
                      <svg class="text-blue-600 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Data Visualization Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fade-in-up">
            <!-- Interactive Map -->
            <div data-chart-section="density" class="animate-slide-in-left">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
            <div class="mb-6">
             <h3 class="text-xl font-semibold text-gray-900">Application Density by City</h3>
             <p class="text-gray-600 text-sm mt-1">
             A heatmap of Metro Manila showing application density. Darker shades indicate more applicants. Hover over a city for details.
              </p>
            </div>
         <div id="mapContainer" class="h-96 rounded-lg border border-gray-200" style="height: 400px"></div>
        </div>
           </div>
              <!-- Socioeconomic Distribution -->
              <div data-chart-section="socio" class="animate-slide-in-left">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
                  <div class="mb-6">
                    <h3 class="text-xl font-semibold text-gray-900">Socioeconomic Distribution</h3>
                    <p class="text-gray-600 text-sm mt-1">
                      A breakdown of applicant households by monthly income.
                    </p>
                  </div>
                  <div class="chart-container">
                    <canvas id="socioeconomicChart"></canvas>
                  </div>
                  <div class="flex justify-center mt-4 space-x-6">
                    <div class="flex items-center">
                      <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span class="text-sm text-gray-600">Lower Class</span>
                    </div>
                    <div class="flex items-center">
                      <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span class="text-sm text-gray-600">Middle Class</span>
                    </div>
                    <div class="flex items-center">
                      <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span class="text-sm text-gray-600">Upper Class</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Entrance Exam Results -->
            <div data-chart-section="exam" class="animate-fade-in-up">
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
                <div class="mb-6">
                  <h3 class="text-xl font-semibold text-gray-900">Entrance Exam Results</h3>
                  <p class="text-gray-600 text-sm mt-1">
                    Percentage of applicants who passed or failed the entrance exam (Passing Score: 75).
                  </p>
                </div>
                <div class="chart-container">
                  <canvas id="examResultsChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Initialize the application
function initializeApp() {
  renderDashboard()
  
  // Wait for external libraries to load
  const initCharts = () => {
    if (window.Chart && window.L) {
      fetchDashboardStats()
      fetchCityData()
    } else {
      setTimeout(initCharts, 100)
    }
  }
  
  initCharts()
}

// Make functions globally available
window.handleChartSelection = handleChartSelection

// Start the application
document.addEventListener('DOMContentLoaded', initializeApp)