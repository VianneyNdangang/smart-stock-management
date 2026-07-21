import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { ref } from "vue";

export const usePokemonStore = defineStore("pokemons", () => {
    const pokemons = ref<any[]>([])
    const loading = ref(false)

    const fetchpokemons = async () => {
        try {
            loading.value = (true)
            const items = await apiClient.get("/pokemon").then((response) => response.data)
            pokemons.value = items
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = (false)
        }
    };

    const createpokemon = async (newpokemon: any) => {
        try {
            loading.value = (true)
            const response = await apiClient.post('/pokemon', newpokemon);
            pokemons.value.push(response.data); // Ajout local immédiat après succès
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = (false)
        }
    
    }

    return { fetchpokemons, pokemons, loading, createpokemon }

})