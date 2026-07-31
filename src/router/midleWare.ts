import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { user_token } from "@/helpers/constant";


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
const defaultToken = localStorage.getItem(user_token);
    const token = defaultToken ? defaultToken : null

  if (to.meta.requiresAuth && !token) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }

  if (to.name === "login" && token) {
    return { name: "dashboard" };
  }
});

export default router;