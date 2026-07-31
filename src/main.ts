import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/midleWare.ts";
import { createPinia } from "pinia";
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // something vue-i18n options here ...
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .mount("#app");
  