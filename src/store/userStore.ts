import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { ref } from "vue";
import { deleteToken, SaveToken } from "@/handler/securityHandler";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("users", () => {
  const users = ref<any[]>([]);
  const connectedUser = ref<any>();
  const loading = ref(false);
  const router = useRouter();
  const messaError = ref();

  const fetchUsers = async () => {
    try {
      loading.value = true;
      const items = await apiClient
        .get("/users")
        .then((response) => response.data.users);
      users.value = items;
    } catch (error) {
      messaError.value = error;
    } finally {
      loading.value = false;
    }
  };
  const createUser = async (newUser: any) => {
    try {
      loading.value = true;
      const response = await apiClient.post("/users", newUser);
      users.value.push(response.data); // Ajout local immédiat après succès
    } catch (error) {
      messaError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const loginUser = async (credentials: any) => {
    try {
      loading.value = true;
      const response = await apiClient.post("/auth/login", credentials);
      connectedUser.value = response.data;
      const accessToken = response?.data.accessToken;
      const refreshToken = response.data?.refreshTocken;
      SaveToken(accessToken || refreshToken);
      router.push("/");
    } catch (error) {
      messaError.value = error;
    } finally {
      loading.value = false;
    }
  };
  const logoutUser = () => {
      deleteToken();
      router.push("/login");
  };

  return {
    fetchUsers,
    logoutUser,
    users,
    connectedUser,
    loading,
    createUser,
    loginUser,
  };
});
