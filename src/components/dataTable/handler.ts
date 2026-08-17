import { apiClient } from "@/store/api"

// const toast = useToastStore()
export const handleDeleteData = async (url:string, ids: string[])=>{
    try {
        await apiClient.delete(url,{
            params:{
                id:ids
            }
        })
    //     toast.show(
    //   "Operation Effectuée",
    //   "success",
    //   "Les donnees ont ete supprimes avec success",
    // );
    } catch (error) {
    //     toast.show(
    //   "Echec de l'operation",
    //   "danger",
    //   "Les donees n'ont pas ete supprimees",
    // );
    }
}