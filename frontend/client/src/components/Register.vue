<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  data() {
    return { name: "", email: "", password: "" };
  },
  methods: {
    async register() {
      await axios.post("/api/auth/register", {
        name: this.name, email: this.email, password: this.password,
      });
      this.$router.push("/login");
    },
  },
};
</script>