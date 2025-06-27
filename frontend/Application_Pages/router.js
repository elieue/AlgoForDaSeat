import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from './dashboard/DashboardView.vue';
import PendingApplicationsView from './applications/PendingApplicationsView.vue';
import WaitlistedApplicationsView from './applications/WaitlistedApplicationsView.vue';
import ApprovedApplicationsView from './applications/ApprovedApplicationsView.vue';
import RejectedApplicationsView from './applications/RejectedApplicationsView.vue';
import ApplicationRankingsView from './applications/ApplicationRankingsView.vue';
import ApplicantProfile from './ApplicantProfile.vue';
import DataVisualization from './dashboard/DataVisualization.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardView },
  { path: '/dashboard/data-visualization', component: DataVisualization },
  { path: '/slot-visualization', component: DashboardView }, // Using dashboard as placeholder
  { path: '/applications/pending', component: PendingApplicationsView },
  { path: '/applications/waitlisted', component: WaitlistedApplicationsView },
  { path: '/applications/approved', component: ApprovedApplicationsView },
  { path: '/applications/rejected', component: RejectedApplicationsView },
  { path: '/applications/rankings', component: ApplicationRankingsView },
  { path: '/admin/applicant-profile/:applicantId', component: ApplicantProfile },
  // Catch-all route for 404
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: () => import('./components/NotFound.vue') // We'll create this component
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
}); 