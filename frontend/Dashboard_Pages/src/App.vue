<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/shared/Sidebar.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');

:root {
  --color-primary: #ff8800;
  --color-primary-dark: #b35c00;
  --color-secondary: #181818;
  --color-bg: #fffdf7;
  --color-card: #fff;
  --color-border: #bdbdbd;
  --color-success: #218838;
  --color-danger: #b71c1c;
  --color-warning: #0d47a1;
  --color-muted: #555;
  --color-link: #0d47a1;
  --color-link-hover: #002171;
  --color-btn-bg: var(--color-primary);
  --color-btn-bg-hover: var(--color-primary-dark);
  --color-btn-text: #fff;
  --color-btn-disabled: #f5f5f5;
  --color-btn-disabled-text: #bdbdbd;
  /* High-contrast pairs */
  --color-yellow-bg: #fffbe6;
  --color-yellow-text: #ff8800;
  --color-orange-bg: #fff3e0;
  --color-orange-text: #b35c00;
  --color-blue-bg: #e3f0ff;
  --color-blue-text: #002171;
  --color-navy-bg: #dde6f7;
  --color-navy-text: #00123d;
  /* Figma color variables */
  --color-figma-orange: #FFB84C;
  --color-figma-yellow-bg: #FFF6E0;
  --color-figma-black: #181818;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: background-color 0.2s cubic-bezier(.4,0,.2,1), color 0.2s cubic-bezier(.4,0,.2,1), border-color 0.2s cubic-bezier(.4,0,.2,1), box-shadow 0.2s cubic-bezier(.4,0,.2,1);
}

html, body {
  min-height: 100vh;
  background: var(--color-bg);
  font-family: 'Inter', Arial, sans-serif;
  color: var(--color-secondary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6, .poppins, .brand, .dashboard-title, .page-title, .card-title, .stat-title, .sidebar .brand, .nav-link span, .logout-btn span {
  font-family: 'Poppins', Arial, sans-serif;
}

button, .btn {
  font-family: 'Poppins', Arial, sans-serif;
  background: var(--color-btn-bg);
  color: var(--color-btn-text);
  border: 2.5px solid var(--color-primary-dark);
  border-radius: 8px;
  padding: 10px 22px;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.10);
  transition: background 0.18s cubic-bezier(.4,0,.2,1), color 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1);
  outline: none;
}

button:hover, .btn:hover, button:focus, .btn:focus {
  background: var(--color-yellow-bg);
  color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  box-shadow: 0 6px 24px 0 rgba(0,0,0,0.16);
}

button:active, .btn:active {
  background: var(--color-orange-bg);
  color: var(--color-navy-text);
  border-color: var(--color-navy-text);
}

button:disabled, .btn:disabled {
  background: var(--color-btn-disabled);
  color: var(--color-btn-disabled-text);
  cursor: not-allowed;
  box-shadow: none;
  border-color: var(--color-border);
}

.icon {
  color: #74512D !important;
  fill: currentColor !important;
  stroke: currentColor !important;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 260px;
  min-height: 100vh;
  background: var(--color-bg);
  transition: margin-left 0.28s cubic-bezier(.4,0,.2,1);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .main-content {
    margin-left: 80px;
  }
  
  .app-container:hover .main-content {
    margin-left: 260px;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .app-container:hover .main-content {
    margin-left: 0;
  }
}
</style>