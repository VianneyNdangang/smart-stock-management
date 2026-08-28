import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { user_token } from "@/helpers/constant";
import { socket } from "@/helpers/socket";
import { useLoadingStore } from "@/store/loadingStore";
// import { useProfileStore } from "@/store/profilStore";
// import socket from "@/helpers/socket";
// import { useProfileStore } from "@/store/profilStore";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {

   const loadingStore = useLoadingStore();

  loadingStore.startLoading();
  const token = localStorage.getItem(user_token);

  if (to.name === "login" && token) {
    socket.connect();
    socket.on("connection", () => {});
    return { name: "dashboard" };
  }

  if (to.meta.requiresAuth && !token) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }


  // if (to.meta.roles) {
  //   const authStore = useProfileStore();

  //   const userRole = authStore.connectedUser?.role;

  //   if (
  //     !userRole ||
  //     !to.meta.roles.includes(userRole)
  //   ) {
  //     return {
  //       name: "forbidden",
  //     };
  //   }
  // }

  
  return true;
});

router.afterEach(() => {
  const loadingStore = useLoadingStore();

  loadingStore.stopLoading();
});

router.onError(() => {
  const loadingStore = useLoadingStore();

  loadingStore.stopLoading();
});

export default router;
