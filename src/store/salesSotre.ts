import { defineStore } from "pinia";
// import { apiClient } from "@/store/api.ts";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useSalesStore = defineStore("sales", () => {
  const filters = ref();
  const page = ref(1);
  const limit = ref(20);
  const { data, fetchData, pagination, loading } = useFetchData({
    limit,
    page,
    url: "orders",
    filters,
  });

  const orders = computed(() => data.value);

  const fetchOrders = async (newPage?: number) => {
    if (newPage) {
      page.value = newPage;
    }
    await fetchData();
  };

  const filterSales = (values: any) => {
    const filterData = {
      creator: values.creator || undefined,
      status:
        values?.status === "pending"
          ? "pending"
          : values?.status === "completed"
            ? "completed"
            : values?.status === "cancelled"
              ? "cancelled"
              : undefined,
    };

    filters.value = filterData;

    if (values.limit) {
      limit.value = values.limit;
    }

    page.value = 1;

    fetchData();
  };

  return {
    fetchOrders,
    orders,
    loading,
    // createstock,
    // deletestock,
    filterSales,
    pagination,
  };
});
