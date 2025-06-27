console.log("main.js loaded");
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia"; // Vue State Management
import router from "../../Application_Pages/router";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");