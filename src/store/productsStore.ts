import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useproductStore = defineStore("products", () => {
  const filters = ref<any>();
  const page = ref(1);
  const { data, fetchData, pagination, loading } = useFetchData({
    limit: 25,
    page,
    url: "products",
    filters
  });

  const products = computed(() => data.value);

  const fetchProducts = async (newPage?: number, newFilter?: any) => {
    if (newPage) {
      page.value = newPage;
    }
    if (newFilter !== undefined) {
      filters.value = newFilter;
    }
    await fetchData();
  };

  const createProducts = async (newproducts: any, id?: string) => {
    return await apiClient({
      method: id ? "PATCH" : "POST",
      url: id ? `/products/${id}` : `/products`,
      data: newproducts,
    });
  };

  const deleteProducts = (id: string) => {
    return apiClient.delete(`/products/${id}`);
  };

  return {
    fetchProducts,
    products,
    loading,
    createProducts,
    deleteProducts,
    pagination,
  };
});
