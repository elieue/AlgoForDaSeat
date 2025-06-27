<template>
  <transition name="fade">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-900">Application Density by City</h3>
        <p class="text-gray-600 text-sm mt-1">
          A choropleth map of Metro Manila showing application density. Darker shades indicate more applicants. Hover over a city for details.
        </p>
      </div>
      <div v-if="store.loading" class="flex items-center justify-center min-h-[300px] h-[40vw] max-h-[400px]" aria-live="polite">Loading map...</div>
      <div v-else-if="error" class="flex items-center justify-center min-h-[300px] h-[40vw] max-h-[400px] text-red-500" aria-live="polite">Failed to load map.</div>
      <div v-else
        ref="mapContainer"
        class="map-container"
        role="region"
        aria-label="Metro Manila Application Density Map"
        tabindex="0">
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import L from 'leaflet'
window.L = L
import { useSlotVisualizationStore } from '../../store/slotVisualizationStore'
const store = useSlotVisualizationStore()
const cityData = computed(() => store.applicationDensity)
const mapContainer = ref(null)
const mapInstance = ref(null)
const error = ref(false)
let cityPolygons = []

// Metro Manila cities with their OSM relation IDs
const metroManilaCities = {
  'Manila': 103703,
  'Quezon City': 103704,
  'Caloocan': 103705,
  'Las Piñas': 103706,
  'Makati': 103707,
  'Malabon': 103708,
  'Mandaluyong': 103709,
  'Marikina': 103710,
  'Muntinlupa': 103711,
  'Navotas': 103712,
  'Parañaque': 103713,
  'Pasay': 103714,
  'Pasig': 103715,
  'San Juan': 103716,
  'Taguig': 103717,
  'Valenzuela': 103718,
  'Pateros': 103719
}

// Color scale for applicant density
const getColor = (density) => {
  return density > 100 ? '#800026' :
         density > 50  ? '#BD0026' :
         density > 20  ? '#E31A1C' :
         density > 10  ? '#FC4E2A' :
         density > 5   ? '#FD8D3C' :
         density > 2   ? '#FEB24C' :
         density > 0   ? '#FED976' :
                        '#FFEDA0'
}

// Style function for polygons
const style = (feature) => {
  const cityName = feature.properties.name
  const cityData = store.applicationDensity.find(city => 
    city.cityName.toLowerCase().includes(cityName.toLowerCase()) ||
    cityName.toLowerCase().includes(city.cityName.toLowerCase())
  )
  const density = cityData ? cityData.totalApplicants : 0
  
  return {
    fillColor: getColor(density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  }
}

// Highlight function
const highlightFeature = (e) => {
  const layer = e.target
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  })
  layer.bringToFront()
}

// Reset highlight function
const resetHighlight = (e) => {
  cityPolygons.resetStyle(e.target)
}

// Zoom to feature function
const zoomToFeature = (e) => {
  mapInstance.value.fitBounds(e.target.getBounds())
}

// On each feature function
const onEachFeature = (feature, layer) => {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  })
  
  // Add popup using feature properties
  const properties = feature.properties
  if (properties && properties.name) {
    const popupContent = `
      <div class="p-4 font-inter" style="font-family: 'Poppins', 'Inter', sans-serif;">
        <h3 class="text-lg font-bold text-yellow-600 mb-2">${properties.name}</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="font-semibold">Total Applicants:</span>
            <span class="font-bold">${properties.density || 0}</span>
          </div>
          <div class="flex justify-between text-green-600">
            <span>Approved:</span>
            <span class="font-bold">${properties.approved || 0}</span>
          </div>
          <div class="flex justify-between text-yellow-600">
            <span>Pending:</span>
            <span class="font-bold">${properties.pending || 0}</span>
          </div>
          <div class="flex justify-between text-blue-600">
            <span>Waitlisted:</span>
            <span class="font-bold">${properties.waitlisted || 0}</span>
          </div>
          <div class="flex justify-between text-red-600">
            <span>Rejected:</span>
            <span class="font-bold">${properties.rejected || 0}</span>
          </div>
        </div>
      </div>
    `
    layer.bindPopup(popupContent)
  } else {
    layer.bindPopup(`
      <div class="p-4 font-inter" style="font-family: 'Poppins', 'Inter', sans-serif;">
        <h3 class="text-lg font-bold text-gray-600 mb-2">Unknown City</h3>
        <p class="text-gray-500">No application data available</p>
      </div>
    `)
  }
}

const initializeMap = async () => {
  await nextTick()
  if (!mapContainer.value || !window.L) return
  
  if (mapInstance.value) {
    mapInstance.value.remove()
    mapInstance.value = null
  }
  
  mapInstance.value = window.L.map(mapContainer.value, {
    center: [14.5995, 120.9842],
    zoom: 10,
    zoomControl: true,
    attributionControl: true,
  })
  
  // Add tile layer
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '\u00a9 OpenStreetMap contributors'
  }).addTo(mapInstance.value)
  
  // Create GeoJSON from store data
  const geojsonData = {
    type: 'FeatureCollection',
    features: cityData.value
      .filter(city => city.coordinates && city.coordinates.length > 0)
      .map(city => ({
        type: 'Feature',
        properties: {
          name: city.cityName,
          density: city.totalApplicants,
          approved: city.approvedApplicants,
          pending: city.pendingApplicants,
          waitlisted: city.waitlistedApplicants,
          rejected: city.rejectedApplicants
        },
        geometry: {
          type: 'Polygon',
          coordinates: city.coordinates
        }
      }))
  }
  
  // Add GeoJSON layer
  cityPolygons = window.L.geoJSON(geojsonData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(mapInstance.value)
  
  // Add legend
  const legend = window.L.control({ position: 'bottomright' })
  legend.onAdd = function (map) {
    const div = window.L.DomUtil.create('div', 'info legend')
    const grades = [0, 2, 5, 10, 20, 50, 100]
    
    div.innerHTML = '<h4>Applicants</h4>'
    
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+')
    }
    
    return div
  }
  legend.addTo(mapInstance.value)
  
  // If no polygons were created, fallback to markers
  if (geojsonData.features.length === 0) {
    addCityMarkers()
  }
}

// Fallback function to add city markers
const addCityMarkers = () => {
  const cityCenters = {
    'Caloocan City': [14.6495, 120.9842],
    'Las Piñas City': [14.4500, 120.9800],
    'Makati City': [14.5547, 121.0244],
    'Malabon City': [14.6683, 120.9561],
    'Mandaluyong City': [14.5832, 121.0332],
    'Manila': [14.5995, 120.9842],
    'Marikina City': [14.6507, 121.1029],
    'Muntinlupa City': [14.3816, 121.0492],
    'Navotas City': [14.6667, 120.9417],
    'Parañaque City': [14.4667, 121.0167],
    'Pasay City': [14.5378, 121.0014],
    'Pasig City': [14.5764, 121.0851],
    'Quezon City': [14.6760, 121.0437],
    'San Juan City': [14.6042, 121.0306],
    'Taguig City': [14.5176, 121.0509],
    'Valenzuela City': [14.7011, 120.9830],
  }
  
  cityData.value.forEach((city) => {
    const center = cityCenters[city.cityName]
    if (center) {
      const density = city.totalApplicants
      const marker = window.L.circleMarker(center, {
        radius: Math.max(8, Math.min(20, density / 2)),
        fillColor: getColor(density),
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapInstance.value)
      
      // Create popup content for marker
      const popupContent = `
        <div class="p-4 font-inter" style="font-family: 'Poppins', 'Inter', sans-serif;">
          <h3 class="text-lg font-bold text-yellow-600 mb-2">${city.cityName}</h3>
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
      marker.bindPopup(popupContent)
    }
  })
}

watch(() => cityData.value, () => {
  if (!store.loading && cityData.value.length > 0) {
    initializeMap()
  }
}, { deep: true })

onMounted(() => {
  watch(() => store.loading, (isLoading) => {
    if (!isLoading && cityData.value.length > 0) {
      initializeMap()
    }
  }, { immediate: true })
})

onUnmounted(() => {
  if (mapInstance.value) {
    mapInstance.value.remove()
    mapInstance.value = null
  }
  cityPolygons = []
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
  min-height: 300px;
  max-height: 400px;
  border-radius: 12px;
  overflow: hidden;
}

/* Force font for all map and popup elements */
:deep(.leaflet-container),
:deep(.leaflet-popup-content),
:deep(.leaflet-popup-content-wrapper),
:deep(.leaflet-popup-tip) {
  font-family: 'Poppins', sans-serif !important;
}

/* Legend styles */
:deep(.legend) {
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: 'Poppins', sans-serif !important;
}

:deep(.legend h4) {
  margin: 0 0 10px 0;
  font-weight: 600;
  color: #374151;
}

:deep(.legend i) {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
  border-radius: 2px;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.chart-animate {
  animation: fadeInUp 1s ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 