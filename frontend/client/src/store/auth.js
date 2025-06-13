import { defineStore } from "pinia";
import axios from "../axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(email, password) {
      const { data } = await axios.post("/api/auth/login", { email, password });
      this.token = data.token;
      localStorage.setItem("token", this.token);
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});