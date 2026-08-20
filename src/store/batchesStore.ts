import { defineStore } from "pinia";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useBatchesStore = defineStore("batches", () => {

   const page = ref(1);
   const url = ref()
    const { data, fetchData, pagination, loading } = useFetchData({
      limit: 50,
      page,
      url,
    });
  
    const batches = computed(() => data.value);
  
    const fetchBatches = async (id: string, newPage?: number) => {
      if (newPage) {
        page.value = newPage;
      }
      if (id) {
        url.value = `/batch/${id}`;
      }
      await fetchData();
    };

//   const createBatches = async (newBatche: any, id:string) => {

//         return await apiClient({
//         method: id? 'PATCH' : 'POST',
//         url: id ? `/batch/${id}` : `/batch`,
//         data: newBatche,
//       })

//   };

//   const deleteBatches = async(id:string)=>{
//        return await apiClient.delete(`/batch/${id}`)   
//   }

  return {
    fetchBatches,
    batches,
    loading,
    // createBatches,
    // deleteBatches,
    pagination,
  };
});
