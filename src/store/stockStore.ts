import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useStockStore = defineStore("stock", () => {

   const page = ref(1);
    const { data, fetchData, pagination, loading } = useFetchData({
      limit: 50,
      page,
      url: "batch",
    });
  
    const batches = computed(() => data.value);
  
    const fetchstock = async (newPage?: number) => {
      if (newPage) {
        page.value = newPage;
      }
      await fetchData();
    };

  const createstock = async (newBatche: any, id:string) => {

        return await apiClient({
        method: id? 'PATCH' : 'POST',
        url: id ? `/batch/${id}` : `/batch`,
        data: newBatche,
      })

  };

  const deletestock = async(id:string)=>{
       return await apiClient.delete(`/batch/${id}`)   
  }

  return {
    fetchstock,
    batches,
    loading,
    createstock,
    deletestock,
    pagination,
  };
});
