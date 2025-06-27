<template>
  <div class="forgot-bg">
    <div class="forgot-center">
      <div class="forgot-card">
        <img src="../assets/login-icon.png" alt="Forgot Icon" class="forgot-icon-img" />
        <h2 class="forgot-title">Forgot Password</h2>
        <p class="forgot-subtitle">Enter your email to receive a password reset link.</p>
        <form @submit.prevent="handleReset" class="forgot-form">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" v-model="email" placeholder="admin@example.com" class="form-input" required />
          </div>
          <button type="submit" class="forgot-button" :disabled="isLoading">
            {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>
        <hr class="forgot-divider" />
        <button class="back-login-btn" @click="goToLogin">Back to Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')
const isLoading = ref(false)
const handleReset = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1200))
  isLoading.value = false
}
const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.forgot-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #f6fafd 0%, #e9f0fa 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
}
.forgot-center {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.forgot-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(30, 60, 120, 0.10);
  padding: 56px 44px 40px 44px;
  width: 410px;
  max-width: 98vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.forgot-icon-img {
  width: 48px;
  height: 48px;
  margin-bottom: 28px;
  margin-top: 0;
  display: block;
}
.forgot-title {
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #23272f;
  margin-bottom: 12px;
  margin-top: 0;
}
.forgot-subtitle {
  font-size: 1.08rem;
  color: #6b7684;
  margin-bottom: 36px;
}
.forgot-form {
  width: 100%;
  margin-bottom: 28px;
}
.form-group {
  margin-bottom: 22px;
  position: relative;
  width: 100%;
}
.form-label {
  display: block;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 13.2px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #22262A;
  margin-bottom: 7px;
}
.form-input {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  background: #f8f9fa;
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.form-input:focus {
  outline: none;
  border-color: #f4a825;
  background: #fff;
  box-shadow: 0 0 0 2px rgba(244, 168, 37, 0.10);
}
.forgot-button {
  width: 100%;
  background: #f4a825;
  color: #fff;
  border: none;
  padding: 13px 0;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}
.forgot-button:disabled {
  background: #ffe5c2;
  color: #a86523;
  cursor: not-allowed;
}
.forgot-divider {
  width: 100%;
  border: none;
  border-top: 1.5px solid #f2f2f2;
  margin: 32px 0 18px 0;
}
.back-login-btn {
  background: none;
  border: none;
  color: #f4a825;
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0;
  margin-bottom: 4px;
  text-align: center;
  transition: color 0.2s;
}
.back-login-btn:hover {
  color: #a86523;
}
</style> 