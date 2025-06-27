<template>
  <div class="login-bg">
    <button class="back-home-btn" @click="goBack">
      <span class="back-arrow">←</span> <span class="back-text">Back to Home</span>
    </button>
    <div class="login-center">
      <div class="login-card">
        <img src="../assets/login-icon.png" alt="Login Icon" class="login-icon-img" />
        <h2 class="login-title">Admin Login</h2>
        <p class="login-subtitle">Access the AlgoForDaSeat dashboard.</p>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input
              type="email"
              v-model="loginForm.email"
              placeholder="admin@example.com"
              class="form-input"
              required
            />
          </div>
          <div class="form-group password-group">
            <label class="form-label">Password</label>
            <a href="#" class="forgot-link" @click="forgotPassword">Forgot Password?</a>
            <input
              type="password"
              v-model="loginForm.password"
              placeholder="•••"
              class="form-input"
              required
            />
          </div>
          <button type="submit" class="login-button" :disabled="isLoading">
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        <div class="signup-row">
          <span>Don't have an account?</span>
          <a href="#" class="signup-link" @click.prevent="goToSignUp">Sign Up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginForm = ref({ email: '', password: '' })
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1200))
  isLoading.value = false
}
const goBack = () => {
  router.push('/')
}
const goToSignUp = () => {
  router.push('/signup')
}
const forgotPassword = (e) => {
  e.preventDefault()
  router.push('/forgot-password')
}
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #f6fafd 0%, #e9f0fa 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
}
.login-center {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(30, 60, 120, 0.10);
  padding: 44px 38px 32px 38px;
  width: 456px;
  height: 573px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
}
.login-icon-img {
  width: 48px;
  height: 48px;
  margin-bottom: 18px;
  margin-top: -8px;
  display: block;
}
.login-title {
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 30.3px;
  font-weight: 600;
  color: #212629F0;
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  margin-bottom: 6px;
  margin-top: 0;
}
.login-subtitle {
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 15.9px;
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #6A7178;
  margin-bottom: 32px;
}
.login-form {
  width: 100%;
  margin-bottom: 18px;
}
.form-group {
  margin-bottom: 22px;
  position: relative;
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
.password-group {
  display: flex;
  flex-direction: column;
  position: relative;
}
.forgot-link {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 14px;
  color: #f4a825;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.forgot-link:hover {
  color: #a86523;
}
.login-button {
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
.login-button:disabled {
  background: #ffe5c2;
  color: #a86523;
  cursor: not-allowed;
}
.signup-row {
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #7d848d;
  margin-top: 8px;
}
.signup-link {
  color: #f4a825;
  font-weight: 600;
  margin-left: 4px;
  text-decoration: none;
  transition: color 0.2s;
}
.signup-link:hover {
  color: #a86523;
}
.back-home-btn {
  position: absolute;
  top: 28px;
  left: 32px;
  background: #fff;
  border: 1.5px solid #ffe5c2;
  color: #a86523;
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  padding: 8px 18px 8px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(210,105,30,0.04);
  transition: background 0.2s, border 0.2s;
  z-index: 10;
}
.back-home-btn:hover {
  background: #fff7ef;
  border-color: #f4a825;
}
.back-arrow {
  font-size: 18px;
  margin-right: 7px;
}
.back-text {
  font-size: 16px;
}
</style>