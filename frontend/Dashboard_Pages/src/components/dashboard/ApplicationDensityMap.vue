<template>
  <transition name="fade">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 chart-animate">
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-900">Application Density by City</h3>
        <p class="text-gray-600 text-sm mt-1">
          A heatmap of Metro Manila showing application density. Darker shades indicate more applicants. Hover over a city for details.
        </p>
      </div>
      <div v-if="loading" class="flex items-center justify-center min-h-[300px] h-[40vw] max-h-[400px]" aria-live="polite">Loading map...</div>
      <div v-else-if="error" class="flex items-center justify-center min-h-[300px] h-[40vw] max-h-[400px] text-red-500" aria-live="polite">Failed to load map.</div>
      <div v-else
        ref="mapContainer"
        class="rounded-lg border border-gray-200 min-h-[300px] h-[40vw] max-h-[400px]"
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
import { useSlotVisualizationStore } from '@/store/slotVisualizationStore'
const store = useSlotVisualizationStore()
const fallbackData = [
  {
    cityName: 'Manila',
    proximityFromManila: 0,
    totalApplicants: 100,
    approvedApplicants: 60,
    pendingApplicants: 20,
    waitlistedApplicants: 10,
    rejectedApplicants: 10,
    coordinates: [
      [
        [120.966, 14.599], [120.986, 14.599], [120.986, 14.609], [120.966, 14.609], [120.966, 14.599]
      ]
    ]
  }
]
const cityData = computed(() => (store.applicationDensity && store.applicationDensity.length > 0) ? store.applicationDensity : fallbackData)
const mapContainer = ref(null)
const mapInstance = ref(null)
const loading = ref(true)
const error = ref(false)
let redrawTimeout = null
const initializeMap = async () => {
  try {
    await nextTick()
    console.log('mapContainer:', mapContainer.value)
    console.log('window.L:', window.L)
    console.log('cityData:', cityData.value)
    if (!mapContainer.value || !window.L || !cityData.value) throw new Error('Map or data not ready')
    if (mapInstance.value) {
      mapInstance.value.remove()
      mapInstance.value = null
    }
    mapInstance.value = window.L.map(mapContainer.value).setView([14.5995, 120.9842], 11)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '\u00a9 OpenStreetMap contributors'
    }).addTo(mapInstance.value)
    cityData.value.forEach((city) => {
      try {
        const polygon = window.L.polygon(
          city.coordinates.map(ring => ring.map(([lng, lat]) => [lat, lng])),
          {
            color: '#10B981',
            fillColor: '#10B981',
            fillOpacity: 0.0,
            weight: 2
          }
        ).addTo(mapInstance.value)
        setTimeout(() => polygon.setStyle({ fillOpacity: 0.7 }), 100)
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
        // skip
      }
    })
    error.value = false
  } catch (e) {
    error.value = true
    console.error('Map initialization error:', e)
  }
}
const debouncedInitializeMap = () => {
  if (redrawTimeout) clearTimeout(redrawTimeout)
  redrawTimeout = setTimeout(() => {
    initializeMap()
  }, 150)
}
watch(() => cityData.value, () => { if (cityData.value && cityData.value.length > 0) setTimeout(debouncedInitializeMap, 100) }, { deep: true })
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 100);
});

watch([
  () => loading.value,
  () => mapContainer.value
], ([isLoading, container]) => {
  console.log('Watcher fired: loading', isLoading, 'container', container);
  if (!isLoading && container && window.L) {
    setTimeout(debouncedInitializeMap, 100);
  }
});

onUnmounted(() => { if (mapInstance.value) { mapInstance.value.remove(); mapInstance.value = null } if (redrawTimeout) clearTimeout(redrawTimeout) })
</script>

<style scoped>
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