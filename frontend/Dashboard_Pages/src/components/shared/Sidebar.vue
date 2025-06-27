<template>
  <div class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <div class="brand">
        <div class="brand-icon">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
          </svg>
        </div>
        <div class="brand-text">
          <h1 class="brand-title">AlgoForDaSeat</h1>
          <p class="brand-subtitle">Admin Dashboard</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <router-link
          to="/"
          class="nav-link"
          active-class="active"
          exact
        >
          <div class="nav-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <span class="nav-text">Dashboard</span>
        </router-link>

        <router-link
          to="/data-visualization"
          class="nav-link"
          active-class="active"
        >
          <div class="nav-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
            </svg>
          </div>
          <span class="nav-text">Data Visualization</span>
        </router-link>
      </div>

      <div class="nav-section">
        <div class="nav-section-title">Applications</div>
        
        <router-link 
          to="/applications/pending" 
          class="nav-link"
          active-class="active"
        >
          <div class="nav-icon">🕒</div>
          <span class="nav-text">Pending Applications</span>
        </router-link>

        <router-link 
          to="/applications/waitlisted" 
          class="nav-link"
          active-class="active"
        >
          <div class="nav-icon">⏳</div>
          <span class="nav-text">Waitlisted Applications</span>
        </router-link>

        <router-link 
          to="/applications/approved" 
          class="nav-link"
          active-class="active"
        >
          <div class="nav-icon">✅</div>
          <span class="nav-text">Approved Applications</span>
        </router-link>

        <router-link 
          to="/applications/rejected" 
          class="nav-link"
          active-class="active"
        >
          <div class="nav-icon">❌</div>
          <span class="nav-text">Rejected Applications</span>
        </router-link>

        <router-link 
          to="/applications/rankings" 
          class="nav-link"
          active-class="active"
        >
          <div class="nav-icon">📊</div>
          <span class="nav-text">Application Rankings</span>
        </router-link>
      </div>
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer">
      <button class="logout-btn" @click="handleLogout">
        <div class="logout-icon">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7"/>
          </svg>
        </div>
        <span class="logout-text">Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const handleLogout = () => {
  // Handle logout logic
  console.log('Logout clicked')
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: var(--color-card);
  border-right: 2px solid var(--color-border);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
  transition: width 0.28s cubic-bezier(.4,0,.2,1);
}

.sidebar-header {
  padding: 24px;
  border-bottom: 2px solid var(--color-border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 48px;
  height: 48px;
  background: var(--color-yellow-bg);
  border: 2px solid var(--color-yellow-text);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-title {
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--color-yellow-text);
  font-family: 'Poppins', Arial, sans-serif;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 0.85rem;
  color: var(--color-muted);
  font-weight: 500;
}

.sidebar-nav {
  flex: 1;
  padding: 24px 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 32px;
}

.nav-section:last-child {
  margin-bottom: 0;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 24px 12px 24px;
  margin-bottom: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: var(--color-secondary);
  text-decoration: none;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
  border-right: 4px solid transparent;
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 500;
}

.nav-link:hover {
  background: var(--color-yellow-bg);
  color: var(--color-yellow-text);
  border-right-color: var(--color-yellow-text);
}

.nav-link.active {
  background: var(--color-yellow-bg);
  color: var(--color-yellow-text);
  border-right-color: var(--color-yellow-text);
  font-weight: 700;
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.2rem;
}

.nav-text {
  font-size: 1rem;
  white-space: nowrap;
}

.sidebar-footer {
  padding: 24px;
  border-top: 2px solid var(--color-border);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-muted);
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
}

.logout-btn:hover {
  background: var(--color-yellow-bg);
  color: var(--color-yellow-text);
  border-color: var(--color-yellow-text);
}

.logout-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logout-text {
  font-size: 0.95rem;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
  }
  
  .sidebar:hover {
    width: 260px;
  }
  
  .brand-text,
  .nav-text,
  .logout-text {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .sidebar:hover .brand-text,
  .sidebar:hover .nav-text,
  .sidebar:hover .logout-text {
    opacity: 1;
  }
  
  .nav-section-title {
    opacity: 0;
  }
  
  .sidebar:hover .nav-section-title {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .brand-text,
  .nav-text,
  .logout-text,
  .nav-section-title {
    opacity: 1;
  }
}
</style>