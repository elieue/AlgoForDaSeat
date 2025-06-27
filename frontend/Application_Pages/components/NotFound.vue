<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <h2 class="not-found-subtitle">Page Not Found</h2>
      <p class="not-found-desc">The page you're looking for doesn't exist.</p>
      <button class="back-btn" @click="goHome">
        <img src="../Assets/back-arrow.svg" alt="Back" class="back-icon" />
        Go to Dashboard
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/dashboard');
}
</script>

<style scoped>
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #faf9f6;
  padding: 32px;
}

.not-found-content {
  text-align: center;
  max-width: 400px;
}

.not-found-title {
  font-family: 'Poppins', sans-serif;
  font-size: 6rem;
  font-weight: 900;
  color: #f7a600;
  margin-bottom: 8px;
  line-height: 1;
}

.not-found-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 16px;
}

.not-found-desc {
  font-family: 'Inter', sans-serif;
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 32px;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #f7a600;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.back-btn:hover {
  background: #ffb300;
}

.back-icon {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}
</style> 