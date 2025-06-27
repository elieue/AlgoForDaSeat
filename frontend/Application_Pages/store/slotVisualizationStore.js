import { defineStore } from 'pinia'
import { computed } from 'vue'
import applicationsAPI from '../api/applications'

// Metro Manila city coordinates (simplified polygons)
const cityCoordinates = {
  'Manila': [
    [14.5995, 120.9842], [14.5995, 120.9942], [14.5895, 120.9942], [14.5895, 120.9842]
  ],
  'Quezon City': [
    [14.6760, 121.0437], [14.6760, 121.0537], [14.6660, 121.0537], [14.6660, 121.0437]
  ],
  'Caloocan': [
    [14.6495, 120.9842], [14.6495, 120.9942], [14.6395, 120.9942], [14.6395, 120.9842]
  ],
  'Las Piñas': [
    [14.4500, 120.9800], [14.4500, 120.9900], [14.4400, 120.9900], [14.4400, 120.9800]
  ],
  'Makati': [
    [14.5547, 121.0244], [14.5547, 121.0344], [14.5447, 121.0344], [14.5447, 121.0244]
  ],
  'Malabon': [
    [14.6683, 120.9561], [14.6683, 120.9661], [14.6583, 120.9661], [14.6583, 120.9561]
  ],
  'Mandaluyong': [
    [14.5832, 121.0332], [14.5832, 121.0432], [14.5732, 121.0432], [14.5732, 121.0332]
  ],
  'Marikina': [
    [14.6507, 121.1029], [14.6507, 121.1129], [14.6407, 121.1129], [14.6407, 121.1029]
  ],
  'Muntinlupa': [
    [14.3816, 121.0492], [14.3816, 121.0592], [14.3716, 121.0592], [14.3716, 121.0492]
  ],
  'Navotas': [
    [14.6667, 120.9417], [14.6667, 120.9517], [14.6567, 120.9517], [14.6567, 120.9417]
  ],
  'Parañaque': [
    [14.4667, 121.0167], [14.4667, 121.0267], [14.4567, 121.0267], [14.4567, 121.0167]
  ],
  'Pasay': [
    [14.5378, 121.0014], [14.5378, 121.0114], [14.5278, 121.0114], [14.5278, 121.0014]
  ],
  'Pasig': [
    [14.5764, 121.0851], [14.5764, 121.0951], [14.5664, 121.0951], [14.5664, 121.0851]
  ],
  'San Juan': [
    [14.6042, 121.0306], [14.6042, 121.0406], [14.5942, 121.0406], [14.5942, 121.0306]
  ],
  'Taguig': [
    [14.5176, 121.0509], [14.5176, 121.0609], [14.5076, 121.0609], [14.5076, 121.0509]
  ],
  'Valenzuela': [
    [14.7011, 120.9830], [14.7011, 120.9930], [14.6911, 120.9930], [14.6911, 120.9830]
  ],
  'Pateros': [
    [14.54915, 121.06285], [14.54915, 121.07285], [14.53915, 121.07285], [14.53915, 121.06285]
  ]
}

export const useSlotVisualizationStore = defineStore('slotVisualization', {
  state: () => ({
    applications: [],
    loading: false,
    error: null,
  }),
  getters: {
    // Slot allocation stats
    slotAllocation(state) {
      const admitted = state.applications.filter(app => (app.status || app.final_status || '').toLowerCase() === 'admitted').length;
      const waitlisted = state.applications.filter(app => (app.status || app.final_status || '').toLowerCase() === 'waitlisted').length;
      const rejected = state.applications.filter(app => (app.status || app.final_status || '').toLowerCase() === 'rejected').length;
      const total = admitted + waitlisted + rejected;
      return {
        admitted,
        waitlisted,
        rejected,
        total,
      };
    },
    // Socioeconomic stats
    socioeconomic(state) {
      let lower = 0, middle = 0, upper = 0
      state.applications.forEach(app => {
        const status = (app.economic_status || '').toLowerCase()
        if (status === 'lower') lower++
        else if (status === 'middle') middle++
        else if (status === 'upper') upper++
      })
      return { lower, middle, upper }
    },
    // Exam results stats
    examResults(state) {
      let passed = 0, failed = 0
      state.applications.forEach(app => {
        const score = Number(app.entrance_exam_score)
        if (!isNaN(score)) {
          if (score >= 75) passed++
          else failed++
        }
      })
      return { passed, failed }
    },
    // KPIs
    kpis(state) {
      const slot = this.slotAllocation
      return [
        { value: slot.totalSlots, label: 'Total Capacity', icon: 'BxBadge', color: 'yellow' },
        { value: slot.filledSlots, label: 'Students Approved', icon: 'BxCheckCircle', color: 'green' },
        { value: slot.availableSlots, label: 'Slots Remaining', icon: 'BxClipboard', color: 'blue' },
      ]
    },
    // Application density by city with coordinates
    applicationDensity(state) {
      const cityMap = {}
      
      // Initialize all Metro Manila cities with coordinates
      Object.keys(cityCoordinates).forEach(cityName => {
        cityMap[cityName] = {
          cityName: cityName,
          totalApplicants: 0,
          approvedApplicants: 0,
          pendingApplicants: 0,
          waitlistedApplicants: 0,
          rejectedApplicants: 0,
          coordinates: [cityCoordinates[cityName]], // Wrap in array for GeoJSON polygon format
        }
      })
      
      // Process applications and match to cities
      state.applications.forEach(app => {
        if (app.address) {
          const parts = app.address.split(',')
          const cityFromAddress = parts.length > 1 ? parts[parts.length - 1].trim() : 'Unknown'
          
          // Try to match city name
          let matchedCity = null
          for (const cityName in cityMap) {
            if (cityFromAddress.toLowerCase().includes(cityName.toLowerCase()) ||
                cityName.toLowerCase().includes(cityFromAddress.toLowerCase())) {
              matchedCity = cityName
              break
            }
          }
          
          // If no match found, create entry for unknown city
          if (!matchedCity) {
            if (!cityMap[cityFromAddress]) {
              cityMap[cityFromAddress] = {
                cityName: cityFromAddress,
                totalApplicants: 0,
                approvedApplicants: 0,
                pendingApplicants: 0,
                waitlistedApplicants: 0,
                rejectedApplicants: 0,
                coordinates: [],
              }
            }
            matchedCity = cityFromAddress
          }
          
          // Update counts
          cityMap[matchedCity].totalApplicants++
          const status = (app.status || app.final_status || '').toLowerCase()
          if (status === 'admitted' || status === 'approved') cityMap[matchedCity].approvedApplicants++
          else if (status === 'pending') cityMap[matchedCity].pendingApplicants++
          else if (status === 'waitlisted') cityMap[matchedCity].waitlistedApplicants++
          else if (status === 'rejected') cityMap[matchedCity].rejectedApplicants++
        }
      })
      
      return Object.values(cityMap)
    },
  },
  actions: {
    async fetchDashboardData() {
      this.loading = true
      this.error = null
      try {
        this.applications = await applicationsAPI.getAllApplications()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
  },
}) 