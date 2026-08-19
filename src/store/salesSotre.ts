import { defineStore } from "pinia";
// import { apiClient } from "@/store/api.ts";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useSalesStore = defineStore("sales", () => {

   const page = ref(1);
    const { data, fetchData, pagination, loading } = useFetchData({
      limit: 50,
      page,
      url: "orders",
    });
  
    const orders = computed(() => data.value);
  
    const fetchOrders = async (newPage?: number) => {
      if (newPage) {
        page.value = newPage;
      }
      await fetchData();
    };

//   const createstock = async (newBatche: any, id:string) => {

//         return await apiClient({
//         method: id? 'PATCH' : 'POST',
//         url: id ? `/orders/${id}` : `/orders`,
//         data: newBatche,
//       })

//   };

//   const deletestock = async(id:string)=>{
//        return await apiClient.delete(`/batch/${id}`)   
//   }

  return {
    fetchOrders,
    orders,
    loading,
    // createstock,
    // deletestock,
    pagination,
  };
});
