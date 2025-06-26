<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-900">Application Density by City</h3>
      <p class="text-gray-600 text-sm mt-1">
        A heatmap of Metro Manila showing application density. Darker shades indicate more applicants. Hover over a city for details.
      </p>
    </div>
    <div 
      ref="mapContainer" 
      class="h-96 rounded-lg border border-gray-200"
      style="height: 400px"
    />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'InteractiveMap',
  props: {
    cityData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const mapContainer = ref(null)
    const mapInstance = ref(null)

    const initializeMap = () => {
      if (!mapContainer.value || !window.L || !props.cityData) return

      // Initialize map only once
      if (!mapInstance.value) {
        mapInstance.value = window.L.map(mapContainer.value).setView([14.5995, 120.9842], 11)
        
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance.value)
      }

      // Clear existing layers 
      mapInstance.value.eachLayer((layer) => {
        if (layer.options && !layer.options.attribution) {
          mapInstance.value.removeLayer(layer)
        }
      })

      // Add city data to map
      props.cityData.forEach((city) => {
        if (city.cityName === 'Pasay') {
          try {
            const coordinates = JSON.parse(city.coordinates)
            
            // Create Pasay polygon
            const polygon = window.L.polygon(coordinates, {
              color: '#10B981',
              fillColor: '#10B981',
              fillOpacity: 0.7,
              weight: 2
            }).addTo(mapInstance.value)

            // Create popup content
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
          } catch (error) {
            console.error('Error parsing coordinates for', city.cityName, error)
          }
        }
      })
    }

    watch(() => props.cityData, () => {
      if (props.cityData && props.cityData.length > 0) {
        // Wait a bit for Leaflet to be available
        setTimeout(initializeMap, 100)
      }
    }, { deep: true })

    onMounted(() => {
      // Wait for Leaflet to be available
      if (window.L) {
        initializeMap()
      } else {
        // Wait a bit for Leaflet to load
        setTimeout(initializeMap, 200)
      }
    })

    onUnmounted(() => {
      if (mapInstance.value) {
        mapInstance.value.remove()
        mapInstance.value = null
      }
    })

    return {
      mapContainer
    }
  }
}
</script>

<style scoped>
.chart-animate {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>