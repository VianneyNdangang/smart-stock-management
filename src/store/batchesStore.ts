import { defineStore } from "pinia";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useBatcheProductsStore = defineStore("batchesProducts", () => {

   const page = ref(1);
   const url = ref()
    const { data, fetchData, pagination, loading } = useFetchData({
      limit: 50,
      page,
      url,
      keys: 'batchProducts'
    });
  
    const products = computed(() => data.value);
    const fetchBatcheProducts = async (id: string, newPage?: number) => {
      if (newPage) {
        page.value = newPage;
      }
      if (id) {
        url.value = `/batch/${id}`;
      }
      await fetchData();
      console.log("datadatadata",data)
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
    fetchBatcheProducts,
    products,
    loading,
    // createBatches,
    // deleteBatches,
    pagination,
  };
});
