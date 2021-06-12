import { createApp } from "vue";

import App from "./App.vue";
import { store, storeKey } from "./store";

import "./index.css";

const app = createApp(App);

app.use(store, storeKey);

app.mount("#app");
