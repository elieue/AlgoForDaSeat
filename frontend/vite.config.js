import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173, // Adjust if needed
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