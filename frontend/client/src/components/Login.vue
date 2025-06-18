<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async login() {
      const res = await axios.post("/api/auth/login", { email: this.email, password: this.password });
      localStorage.setItem("token", res.data.token);
      this.$router.push("/dashboard");
    },
  },
};
</script>