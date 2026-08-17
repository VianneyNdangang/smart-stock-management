import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/midleWare.ts";
import { createPinia } from "pinia";
import { createI18n } from 'vue-i18n'
import en from './locales/en-GB.json'
import fr from './locales/fr-FR.json'

const i18n = createI18n({
  legacy: false,
  locale: 'fr-FR',
  fallbackLocale: 'en-GB',
  messages: {
    'en-GB': en,
    'fr-FR': fr,
  }
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .mount("#app");
  