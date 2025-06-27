import { createRouter, createWebHistory } from 'vue-router'

import AdminDashboard from '@/views/AdminDashboard.vue'
import DataVisualization from '@/views/DataVisualization.vue'
import SetAllocationChart from '@/views/SetAllocationChart.vue'
import SocioEconomicChart from '@/views/SocioEconomicChart.vue'
import ExamResultsChart from '@/views/ExamResultsChart.vue'
import ApplicationsView from '@/views/ApplicationsView.vue'

const routes = [
  { path: '/', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/data-visualization', name: 'DataVisualization', component: DataVisualization },
  { path: '/set-allocation', name: 'SetAllocationChart', component: SetAllocationChart },
  { path: '/socio-economic', name: 'SocioEconomicChart', component: SocioEconomicChart },
  { path: '/exam-results', name: 'ExamResultsChart', component: ExamResultsChart },
  
  // Application routes
  { path: '/applications/pending', name: 'PendingApplications', component: ApplicationsView },
  { path: '/applications/waitlisted', name: 'WaitlistedApplications', component: ApplicationsView },
  { path: '/applications/approved', name: 'ApprovedApplications', component: ApplicationsView },
  { path: '/applications/rejected', name: 'RejectedApplications', component: ApplicationsView },
  { path: '/applications/rankings', name: 'ApplicationRankings', component: ApplicationsView },
  
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 