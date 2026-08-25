import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { user_token } from "@/helpers/constant";
import { socket } from "@/helpers/socket";
// import socket from "@/helpers/socket";
// import { useProfileStore } from "@/store/profilStore";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
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

  //   const allowedRoles = to.meta.roles as string[];

  //   if (
  //     !authStore.connectedUser?.role ||
  //     !allowedRoles.includes(authStore.connectedUser.role)
  //   ) {
  //     return { name: "forbidden" };
  //   }
  // }

  return true;
});

export default router;
