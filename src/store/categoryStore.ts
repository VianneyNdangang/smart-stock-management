import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const usecategoriesStore = defineStore("categories", () => {

  const page = ref(1);
    const { data, fetchData, pagination, loading } = useFetchData({
      limit: 20,
      page,
      url: "categories",
    });
  
    const categories = computed(() => data.value);
  
    const fetchCategories = async (newPage?: number) => {
      if (newPage) {
        page.value = newPage;
      }
      await fetchData();
    };

  const createCategory = async (data: any, id?: string) => {
    const response = await apiClient({
      method: id ? "PATCH" : "POST",
      url: id ? `/categories/${id}` : `/categories`,
      data: data,
    });
    return response;
  };

  const deleteCategory = (id: string) => {
    return apiClient.delete(`/categories/${id}`);
  };

  return {
    fetchCategories,
    categories,
    loading,
    createCategory,
    deleteCategory,
    pagination,
  };
});
