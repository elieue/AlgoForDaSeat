import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173, // Adjust if needed
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: './index-test.html'
      }
    }
  }
});