import { defineStore } from "pinia";
// import { apiClient } from "@/store/api.ts";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useWarehousesStore = defineStore("warehouses", () => {
  const filters = ref<any>();
  const page = ref(1);
  const limit = ref(20);
  const { data, fetchData,pagination, loading } = useFetchData({
    limit,
    page,
    url: "warehouse",
    filters,
  });

  const warehouses = computed(() => data.value);

  const fetchWarehouses = async (newPage?: number) => {
    if (newPage) {
      page.value = newPage;
    }
    await fetchData();
  };

  //   const filterWarehouses = (values: any) => {
  //     const data = {
  //       productId: values.productId,
  //       level: values.level === ''? undefined :Number(values.level),
  //       isActif:
  //         values.isActif === "actif"
  //           ? true
  //           : values.isActif === "inactive"
  //             ? false
  //             : undefined,
  //     };
  //     filters.value = data;
  //     limit.value = values.limit;
  //     fetchWarehouses();
  //   };
  //   const createWarehouse = async (data: any, id?: string) => {
  //     const response = await apiClient({
  //       method: id ? "PATCH" : "POST",
  //       url: id ? `/warehouse/${id}` : `/warehouse`,
  //       data: data,
  //     });
  //     return response;
  //   };

  //   const deleteWarehouse = (id: string) => {
  //     return apiClient.delete(`/Warehouses/${id}`);
  //   };

  return {
    fetchWarehouses,
    warehouses,
    loading,
    // createWarehouse,
    // deleteWarehouse,
    pagination,
    // filterWarehouses,
  };
});
