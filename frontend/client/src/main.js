import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Vue Router
import { createPinia } from "pinia"; // Vue State Management

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");