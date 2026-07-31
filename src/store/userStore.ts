import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { ref } from "vue";
import { useToastStore } from "./toastStore";

export const useUserStore = defineStore("staff", () => {
  const users = ref<any[]>([]);
  const loading = ref(false);
  const messaError = ref();
  const toast = useToastStore();

  const fetchUsers = async (id?: any) => {
    try {
      loading.value = true;
      const items = await apiClient({
        method: "GET",
        url: id ? `/staff/${id}` : `/staff`,
      }).then((response) => response.data);
      users.value = items;
    } catch (error) {
      messaError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (newUser: any, id?: string) => {
    const data = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      userName: newUser.userName,
      password: newUser.password,
      role: newUser.role,
      email: newUser.email,
      phone: newUser.phone,
    };
    if (id) {
      if (!newUser.password) {
        delete data["password"];
      }
    }
        await apiClient({
        method: id ? "PATCH" : "POST",
        url: id ? `/staff/${id}` : `/staff`,
        data: data,
      });
  };

  const deleteUser = async (id: string) => {
    try {
      await apiClient.delete(`/staff/${id}`);
      users.value = users.value.filter((user: any) => user.id != id);
      toast.show("Supprimé", "success", "L'utilisateur a ete supprimé");
    } catch (error) {
      toast.show(
        "Erreur",
        "danger",
        "Une erreure est survenue lors de la suppression",
      );
    }
  };

  return {
    fetchUsers,
    users,
    loading,
    createUser,
    deleteUser,
  };
});
