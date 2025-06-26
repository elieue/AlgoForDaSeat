<template>
  <div class="signup-bg">
    <div class="signup-center">
      <div class="signup-card">
        <img src="../assets/signup-icon.png" alt="Sign Up Icon" class="signup-icon-img" />
        <h2 class="signup-title">Create an Account</h2>
        <p class="signup-subtitle">Join AlgoForDaSeat to get started.</p>
        <form @submit.prevent="handleSignUp" class="signup-form">
          <div class="signup-row">
            <div class="form-group half-width">
              <label class="form-label">First Name</label>
              <input type="text" v-model="form.firstName" placeholder="Juan" class="form-input" required />
            </div>
            <div class="form-group half-width">
              <label class="form-label">Last Name</label>
              <input type="text" v-model="form.lastName" placeholder="Dela Cruz" class="form-input" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" v-model="form.email" placeholder="you@example.com" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" v-model="form.password" placeholder="••••••" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input type="password" v-model="form.confirmPassword" placeholder="••••••" class="form-input" required />
          </div>
          <button type="submit" class="signup-button" :disabled="isLoading">
            {{ isLoading ? 'Signing Up...' : 'Sign Up' }}
          </button>
        </form>
        <div class="login-row">
          <span>Already have an account?</span>
          <a href="#" class="login-link" @click.prevent="goToLogin">Log In</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const isLoading = ref(false)
const handleSignUp = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1200))
  isLoading.value = false
}
const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.signup-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #f6fafd 0%, #e9f0fa 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
}
.signup-center {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.signup-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(30, 60, 120, 0.10);
  padding: 44px 38px 32px 38px;
  width: 410px;
  max-width: 98vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup-icon-img {
  width: 48px;
  height: 48px;
  margin-bottom: 18px;
  margin-top: -8px;
  display: block;
}
.signup-title {
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #23272f;
  margin-bottom: 6px;
  margin-top: 0;
}
.signup-subtitle {
  font-size: 1.08rem;
  color: #6b7684;
  margin-bottom: 32px;
}
.signup-form {
  width: 100%;
  margin-bottom: 18px;
}
.signup-row {
  display: flex;
  gap: 16px;
  margin-bottom: 0;
}
.form-group {
  margin-bottom: 22px;
  position: relative;
  width: 100%;
}
.half-width {
  width: 50%;
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
.signup-button {
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
.signup-button:disabled {
  background: #ffe5c2;
  color: #a86523;
  cursor: not-allowed;
}
.login-row {
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #7d848d;
  margin-top: 8px;
}
.login-link {
  color: #f4a825;
  font-weight: 600;
  margin-left: 4px;
  text-decoration: none;
  transition: color 0.2s;
}
.login-link:hover {
  color: #a86523;
}
@media (max-width: 600px) {
  .signup-card {
    padding: 24px 8px 18px 8px;
    width: 98vw;
  }
  .signup-row {
    flex-direction: column;
    gap: 0;
  }
  .half-width {
    width: 100%;
  }
}
</style> 