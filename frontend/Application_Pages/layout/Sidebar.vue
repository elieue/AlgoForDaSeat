<template>
  <nav class="sidebar">
    <div class="logo-section">
      <img :src="logo" alt="AlgoForDaSeat Logo" class="logo" />
      <span class="brand">AlgoForDaSeat</span>
    </div>
    <div class="sidebar-section">
      <ul class="nav-list">
        <li :class="{ active: isActive('/dashboard') }">
          <router-link to="/dashboard" class="nav-link">
            <img :src="dashboardIcon" alt="Dashboard" class="icon" />
            <span>Dashboard</span>
          </router-link>
        </li>
        <li :class="{ active: isActive('/slot-visualization') }">
          <router-link to="/slot-visualization" class="nav-link">
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
    <div class="logout-section">
      <button class="logout-btn">
        <img :src="logoutIcon" alt="Logout" class="icon" />
        <span>Logout</span>
      </button>
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
import logoutIcon from '../../Assets/log-out-icon.svg';
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  background: #fff; /* Figma: pure white */
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
  box-shadow: 2px 0 8px 0 rgba(0,0,0,0.03);
  transition: background 0.25s cubic-bezier(.4,0,.2,1);
  z-index: 1000;

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
  font-weight: 900; /* Figma: boldest */
  font-size: 1.35rem; /* Figma: slightly larger */
  color: #FFB84C; /* Figma: orange */
  letter-spacing: 0.5px;
}
.sidebar-section {
  margin-bottom: 12px;
}
.sidebar-section-header {
  font-family: 'Poppins', sans-serif;
  font-size: 1.02rem; /* Figma: slightly larger */
  font-weight: 800; /* Figma: bolder */
  color: #BDBDBD; /* Figma: gray */
  text-transform: uppercase;
  letter-spacing: 1.5px; /* Figma: more spacing */
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
  color: #181818; /* Figma: black */
  text-decoration: none;
  font-size: 1.08rem; /* Figma: slightly larger */
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
  color: #181818; /* Figma: black */
  filter: none;
}
.nav-link span {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}
li.active .nav-link {
  background: #FFF6E0; /* Figma: soft yellow */
  color: #FFB84C; /* Figma: orange */
  font-weight: 700;
  /* Remove transform and box-shadow for Figma match */
  box-shadow: none;
  transform: none;
  transition: background 0.22s cubic-bezier(.4,0,.2,1), color 0.22s cubic-bezier(.4,0,.2,1);
}
li:not(.active) .nav-link:hover, li:not(.active) .nav-link:focus {
  background: #F5F5F5; /* Figma: light gray */
  color: #FFB84C; /* Figma: orange */
  box-shadow: none;
  transform: none;
}
.logout-section {
  padding: 0 24px 24px 24px;
  margin-top: auto;
}
.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #888;
  font-size: 1.02rem; /* Figma: slightly larger */
  font-weight: 500;
  padding: 12px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
}
.logout-btn .icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
}
.logout-btn:hover, .logout-btn:focus {
  background: #f5f5f5;
  color: #f44336;
}
.logout-btn span {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}
</style> 