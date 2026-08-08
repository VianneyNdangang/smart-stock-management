import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useUserStore = defineStore("staff", () => {
  
   const page = ref(1);
    const { data, fetchData, pagination, loading } = useFetchData({
      limit: 20,
      page,
      url: "staff",
    });
  
    const users = computed(() => data.value);
  
    const fetchUsers = async (newPage?: number) => {
      if (newPage) {
        page.value = newPage;
      }
      await fetchData();
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
     return await apiClient.delete(`/staff/${id}`);
  };

  return {
    fetchUsers,
    users,
    loading,
    createUser,
    deleteUser,
    pagination,
  };
});
