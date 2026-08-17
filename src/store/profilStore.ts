import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { ref } from "vue";
import { deleteToken, SaveToken } from "@/handler/securityHandler";
import { useRouter } from "vue-router";
import { useToastStore } from "./toastStore";
import type { AxiosResponse } from "axios";

export const useProfileStore = defineStore("profile", () => {
  const connectedUser = ref<any>();
  const router = useRouter();
  const toast = useToastStore();
  const loading = ref(false)

  const fetchProfile = async () => {
    try {
      const items: AxiosResponse = await apiClient({
        method: "GET",
        url: `/profile`,
      }).then((response) => response.data);
      connectedUser.value = items;
    } finally{}
  };

  const loginUser = async (credentials: any) => {
    loading.value=true
    try {
      const response = await apiClient.post("/auth/login", credentials);
      const accessToken = response?.data.accessToken;
      const refreshToken = response.data?.refreshTocken;
      SaveToken(accessToken || refreshToken);
      router.push("/");
    } catch (error) {
      toast.show(
      "Connexion Echouée",
      "danger",
      "Une erreur s'est produite lors de la connexion",
    );
    }
    loading.value=false
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
    loading,
  };
});
