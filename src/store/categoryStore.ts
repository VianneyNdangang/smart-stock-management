import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { ref } from "vue";
import { useToastStore } from "./toastStore";

export const usecategoriesStore = defineStore("categories", () => {
  const categories = ref<any[]>([]);
  const loading = ref(false);
  const messaError = ref();
  const toast = useToastStore()

  const fetchCategories = async (id?:any) => {
    try {
      loading.value = true;
      const items = await apiClient({
        method: 'GET',
        url: id? `/categories/${id}`:`/categories`
      }).then((response)=> response.data)
      categories.value = items;
    } catch (error) {
      messaError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const createCategory =  (data: any, id?:string) => {

        const response =  apiClient({
        method: id? 'PATCH' : 'POST',
        url: id ? `/categories/${id}` : `/categories`,
        data: data,
        })
      // fetchCategories();
        // categories.value.push(response.data);
     return response
       
      }

  // const createCategory_l2 = async (data: any, id?:string) => {

  //    const response = await apiClient({
  //       method:'POST',
  //       url: `/categories`,
  //       data: data,
  //       })
  //     // fetchCategories();
  //       categories.value.push(response.data);
  // };

  const deleteCategory = async(id:string)=>{
    try {
       await apiClient.delete(`/categories/${id}`)
    categories.value = categories.value.filter((user:any)=> user.id != id )
    toast.show(
      'Supprimé',
      'success',
      "La categorie a ete supprimé"
    )
    } catch (error) {
      toast.show(
      'Erreur',
      'danger',
      "Une erreure est survenue lors de la suppression"
    )}
  }

  return {
    fetchCategories,
    categories,
    loading,
    createCategory,
    // createCategory_l2,
    deleteCategory,
  };
});
