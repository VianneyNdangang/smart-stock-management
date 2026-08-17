import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useproductStore = defineStore("products", () => {
  const filters = ref<any>(undefined);
  const limit = ref(20);
  const page = ref(1);

  const { data, fetchData, pagination, loading } = useFetchData({
    limit,
    page,
    url: "products",
    filters,
  });

  const products = computed(() => data.value);

  const fetchProducts = async (newPage?: number, newFilter?: any) => {
    if (newPage !== undefined) {
      page.value = newPage;
    }

    if (newFilter !== undefined) {
      filters.value = newFilter;
    }

    await fetchData();
  };

  const filterProducts = (values: any) => {
    const filterData = {
      productName: values.productName || undefined,

      perishable:
        values?.perishable === "perishable"
          ? true
          : values?.perishable === "nonperishable"
            ? false
            : undefined,

      isActif:
        values?.isActif === "actif"
          ? true
          : values?.isActif === "inactive"
            ? false
            : undefined,
    };

    filters.value = filterData;

    if (values.limit) {
      limit.value = values.limit;
    }

    page.value = 1;

    fetchData();
  };

  const createProducts = async (newproducts: any, id?: string) => {
    return await apiClient({
      method: id ? "PATCH" : "POST",
      url: id ? `/products/${id}` : `/products`,
      data: newproducts,
    });
  };

  const deleteProducts = (ids: string[]) => {
    return apiClient.delete(`/products/`, {
      params: {
        id: ids,
      },
    });
  };

  return {
    fetchProducts,
    filterProducts,
    products,
    loading,
    createProducts,
    deleteProducts,
    pagination,
  };
});
