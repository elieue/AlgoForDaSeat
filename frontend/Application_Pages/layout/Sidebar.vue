<template>
  <nav class="sidebar">
    <!-- Floating circular icons when collapsed -->
    <div class="floating-icons">
      <!-- Logo icon -->
      <div class="floating-icon logo-icon">
        <router-link to="/">
          <img :src="logo" alt="AlgoForDaSeat Logo" class="icon" />
        </router-link>
      </div>
      
      <!-- Dashboard icon -->
      <div class="floating-icon" :class="{ active: isActive('/dashboard') }">
        <router-link to="/dashboard" class="icon-link">
          <img :src="dashboardIcon" alt="Dashboard" class="icon" />
        </router-link>
      </div>
      
      <!-- Data Visualization icon -->
      <div class="floating-icon" :class="{ active: isActive('/dashboard/data-visualization') }">
        <router-link to="/dashboard/data-visualization" class="icon-link">
          <img :src="dataVisualizationIcon" alt="Data Visualization" class="icon" />
        </router-link>
      </div>
      
      <!-- Applications section spacer -->
      <div class="section-spacer"></div>
      
      <!-- Pending Applications icon -->
      <div class="floating-icon" :class="{ active: isActive('/applications/pending') }">
        <router-link to="/applications/pending" class="icon-link">
          <img :src="pendingIcon" alt="Pending" class="icon" />
        </router-link>
      </div>
      
      <!-- Waitlisted Applications icon -->
      <div class="floating-icon" :class="{ active: isActive('/applications/waitlisted') }">
        <router-link to="/applications/waitlisted" class="icon-link">
          <img :src="waitlistedIcon" alt="Waitlisted" class="icon" />
        </router-link>
      </div>
      
      <!-- Approved Applications icon -->
      <div class="floating-icon" :class="{ active: isActive('/applications/approved') }">
        <router-link to="/applications/approved" class="icon-link">
          <img :src="approvedIcon" alt="Approved" class="icon" />
        </router-link>
      </div>
      
      <!-- Rejected Applications icon -->
      <div class="floating-icon" :class="{ active: isActive('/applications/rejected') }">
        <router-link to="/applications/rejected" class="icon-link">
          <img :src="rejectedIcon" alt="Rejected" class="icon" />
        </router-link>
      </div>
      
      <!-- Application Rankings icon -->
      <div class="floating-icon" :class="{ active: isActive('/applications/rankings') }">
        <router-link to="/applications/rankings" class="icon-link">
          <img :src="rankingsIcon" alt="Rankings" class="icon" />
        </router-link>
      </div>
    </div>

    <!-- Expanded sidebar content -->
    <div class="sidebar-content">
      <router-link to="/" class="logo-section" style="text-decoration: none; color: inherit;">
        <img :src="logo" alt="AlgoForDaSeat Logo" class="logo" />
        <span class="brand">AlgoForDaSeat</span>
      </router-link>
      <div class="sidebar-section">
        <ul class="nav-list">
          <li :class="{ active: isActive('/dashboard') }">
            <router-link to="/dashboard" class="nav-link">
              <img :src="dashboardIcon" alt="Dashboard" class="icon" />
              <span>Dashboard</span>
            </router-link>
          </li>
          <li :class="{ active: isActive('/dashboard/data-visualization') }">
            <router-link to="/dashboard/data-visualization" class="nav-link">
              <img :src="dataVisualizationIcon" alt="Data Visualization" class="icon" />
              <span>Data Visualization</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-section-header">Applications</div>
        <ul class="nav-list">
          <li :class="{ active: isActive('/applications/pending') }">
            <router-link to="/applications/pending" class="nav-link">
              <img :src="pendingIcon" alt="Pending" class="icon" />
              <span>Pending Applications</span>
            </router-link>
          </li>
          <li :class="{ active: isActive('/applications/waitlisted') }">
            <router-link to="/applications/waitlisted" class="nav-link">
              <img :src="waitlistedIcon" alt="Waitlisted" class="icon" />
              <span>Waitlisted Applications</span>
            </router-link>
          </li>
          <li :class="{ active: isActive('/applications/approved') }">
            <router-link to="/applications/approved" class="nav-link">
              <img :src="approvedIcon" alt="Approved" class="icon" />
              <span>Approved Applications</span>
            </router-link>
          </li>
          <li :class="{ active: isActive('/applications/rejected') }">
            <router-link to="/applications/rejected" class="nav-link">
              <img :src="rejectedIcon" alt="Rejected" class="icon" />
              <span>Rejected Applications</span>
            </router-link>
          </li>
          <li :class="{ active: isActive('/applications/rankings') }">
            <router-link to="/applications/rankings" class="nav-link">
              <img :src="rankingsIcon" alt="Rankings" class="icon" />
              <span>Application Rankings</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const isActive = (path) => route.path === path;
import logo from '../../Assets/algofordaseat-logo.png';
import dashboardIcon from '../../Assets/dashboard-icon.svg';
import dataVisualizationIcon from '../../Assets/data-visualization-logo.svg';
import pendingIcon from '../../Assets/view-details-logo.svg';
import waitlistedIcon from '../../Assets/waitlisted-applications-logo.svg';
import approvedIcon from '../../Assets/approved-applications-logo.svg';
import rejectedIcon from '../../Assets/rejected-applications-logo.svg';
import rankingsIcon from '../../Assets/application-ranking-logo.svg';
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 100vh;
  background: transparent;
  border-right: none;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  transition: width 0.28s cubic-bezier(.4,0,.2,1);
}

.sidebar:hover, .sidebar:focus-within, .sidebar.active {
  width: 260px;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  overflow: visible;
}

/* Floating icons container */
.floating-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  z-index: 1001;
}

/* Floating icon circles */
.floating-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.floating-icon:hover {
  background: #F5F5F5;
  border-color: #FFB84C;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.floating-icon.active {
  background: #FFF6E0;
  border-color: #FFB84C;
  box-shadow: 0 4px 8px rgba(255, 184, 76, 0.3);
}

.floating-icon .icon {
  width: 16px;
  height: 16px;
  filter: none;
  margin: 0;
}

.floating-icon.active .icon {
  filter: brightness(0) saturate(100%) invert(67%) sepia(95%) saturate(1234%) hue-rotate(359deg) brightness(101%) contrast(101%);
}

/* Logo icon special styling */
.logo-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
}

.logo-icon .icon {
  width: 20px;
  height: 20px;
}

/* Section spacer */
.section-spacer {
  height: 16px;
  margin: 8px 0;
}

/* Icon links */
.icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

/* Sidebar content (hidden when collapsed) */
.sidebar-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.sidebar:hover .sidebar-content,
.sidebar:focus-within .sidebar-content,
.sidebar.active .sidebar-content {
  opacity: 1;
  pointer-events: auto;
}

/* Hide floating icons when sidebar is expanded */
.sidebar:hover .floating-icons,
.sidebar:focus-within .floating-icons,
.sidebar.active .floating-icons {
  opacity: 0;
  pointer-events: none;
}

.logo-section {
  display: flex;
  align-items: center;
  padding: 32px 24px 24px 24px;
}

.logo {
  width: 36px;
  height: 36px;
  margin-right: 12px;
}

.brand {
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  font-size: 1.35rem;
  color: #FFB84C;
  letter-spacing: 0.5px;
}

.sidebar-section {
  margin-bottom: 12px;
}

.sidebar-section-header {
  font-family: 'Poppins', sans-serif;
  font-size: 1.02rem;
  font-weight: 800;
  color: #BDBDBD;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 0 24px 4px 24px;
}

.nav-list {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  color: #181818;
  text-decoration: none;
  font-size: 1.08rem;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.18s cubic-bezier(.4,0,.2,1), color 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1);
  position: relative;
  z-index: 1;
}

.nav-link .icon {
  width: 22px;
  height: 22px;
  margin-right: 16px;
  color: #181818;
  filter: none;
}

.nav-link span {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

li.active .nav-link {
  background: #FFF6E0;
  color: #FFB84C;
  font-weight: 700;
  box-shadow: none;
  transform: none;
  transition: background 0.22s cubic-bezier(.4,0,.2,1), color 0.22s cubic-bezier(.4,0,.2,1);
}

li:not(.active) .nav-link:hover, li:not(.active) .nav-link:focus {
  background: #F5F5F5;
  color: #FFB84C;
  box-shadow: none;
  transform: none;
}
</style> 