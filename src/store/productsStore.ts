import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { ref } from "vue";
import { useToastStore } from "./toastStore";

export const useproductStore = defineStore("products", () => {
  const products = ref<any[]>([]);
  const connectedproducts = ref<any>();
  const loading = ref(false);
  const messaError = ref();
  const toast = useToastStore()

  const fetchProducts = async (id?:any) => {
     loading.value = true;
    try {
      const result = await apiClient({
        method: 'GET',
        url: id? `/products/${id}`:`/products`
      }).then((response)=> response.data)
      products.value = result.items;
    } catch (error) {
      messaError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const createProducts = async (newproducts: any, id:string) => {
    const data = {
      firstName: newproducts.firstName,
      lastName: newproducts.lastName,
      productsName: newproducts.productsName,
      password: newproducts.password,
      role: newproducts.role,
      email: newproducts.email,
      phone: newproducts.phone,    
    }
    if (id){
      if (!newproducts.password){
        delete data['password']
      }
    }
    try {
      loading.value = true;
        await apiClient({
        method: id? 'PATCH' : 'POST',
        url: id ? `/products/${id}` : `/products`,
        data: data,
      })
      // productss.value.push(response.data);
      if(id){
        toast.show(
        "Operation effectuée avec succes",
        "success",
        "L'utilisateur "+data.productsName+" a ete modifié avec succes"
      )
      }else{
      toast.show(
        "Operation effectuée avec succes",
        "success",
        "L'utilisateur "+data.productsName+" a ete créé avec succes"
      )}
    } catch (error) {
      messaError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const deleteProducts = async(id:string)=>{
    loading.value = true
    try {
       await apiClient.delete(`/products/${id}`)
    products.value = products.value.filter((products:any)=> products.id != id )
    toast.show(
      'Supprimé',
      'success',
      "L'utilisateur a ete supprimé"
    )
    } catch (error) {
      toast.show(
      'Erreur',
      'danger',
      "Une erreure est survenue lors de la suppression"
    )
    }finally{loading.value = false}
   
  }

  return {
    fetchProducts,
    products,
    connectedproducts,
    loading,
    createProducts,
    deleteProducts,
  };
});
