<template>
  <div class="app-shell">
    <Sidebar :routes="routes" />
    <div class="main-content">
      <transition name="page-fade-slide" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import dashboardIcon from '../../Assets/dashboard-icon.svg';
import viewDetailsIcon from '../../Assets/view-details-logo.svg';
import waitlistedIcon from '../../Assets/waitlisted-applications-logo.svg';
import approvedIcon from '../../Assets/approved-applications-logo.svg';
import rejectedIcon from '../../Assets/rejected-applications-logo.svg';
import rankingsIcon from '../../Assets/application-ranking-logo.svg';

const routes = [
  { name: 'Dashboard', path: '/dashboard', icon: dashboardIcon },
  { name: 'Pending Applications', path: '/applications/pending', icon: viewDetailsIcon },
  { name: 'Waitlisted Applications', path: '/applications/waitlisted', icon: waitlistedIcon },
  { name: 'Approved Applications', path: '/applications/approved', icon: approvedIcon },
  { name: 'Rejected Applications', path: '/applications/rejected', icon: rejectedIcon },
  { name: 'Application Rankings', path: '/applications/rankings', icon: rankingsIcon },
];
</script>

<style scoped>
.app-shell {
  display: flex;
  height: 100vh;
  background: #faf9f6;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 260px;

}
/* Page transition animation */
.page-fade-slide-enter-active, .page-fade-slide-leave-active {
  transition: opacity 0.45s cubic-bezier(.4,0,.2,1), transform 0.45s cubic-bezier(.4,0,.2,1);
}
.page-fade-slide-enter-from, .page-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(32px);
}
.page-fade-slide-enter-to, .page-fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style> 