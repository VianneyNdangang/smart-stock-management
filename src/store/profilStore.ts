import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { ref } from "vue";
import { deleteToken, SaveToken } from "@/handler/securityHandler";
import { useRouter } from "vue-router";
import { useToastStore } from "./toastStore";

export const useProfileStore = defineStore("profile", () => {
  const connectedUser = ref<any>();
  const router = useRouter();
  const messaError = ref();
  const toast = useToastStore();

  const fetchProfile = async () => {
    try {
      const items = await apiClient({
        method: "GET",
        url: `/profile`,
      }).then((response) => response.data);
      connectedUser.value = items;
    } catch (error) {
      messaError.value = error;
    }
  };

  const updateProfile = async (data: any) => {
    try {
      const response = await apiClient.patch(`/profile`, data);
      connectedUser.value = response.data;
      toast.show(
        "Operation Effectuée",
        "success",
        "Votre Profile a ete mis a jours",
      );
    } catch (error) {}
    toast.show(
      "Operation Effectuée",
      "danger",
      "Votre Profile a ete mis a jours",
    );
  };
  const loginUser = async (credentials: any) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      const accessToken = response?.data.accessToken;
      const refreshToken = response.data?.refreshTocken;
      SaveToken(accessToken || refreshToken);
      router.push("/");
    } catch (error) {
      // toast.show(

      // )
      messaError.value = error;
    }
  };
  const logoutUser = () => {
    deleteToken();
    router.push("/login");
  };

  return {
    logoutUser,
    connectedUser,
    loginUser,
    fetchProfile,
    updateProfile,
  };
});
