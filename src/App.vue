<script setup lang="ts">
import MainLayourt from "./layourts/MainLayourt.vue";
import { onMounted } from "vue";
import { useThemeStore } from "@/store/themeStore";
import ToastContainer from "./components/toast/ToastContainer.vue";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.applyTheme();
});
</script>

<template>
  <MainLayourt />
  <ToastContainer/>
</template>

<!-- <script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import DetailsPokemon from "./components/DetailsPokemon.vue";
import Chart from "./components/Chart.vue";


const pokemons = ref<any[]>([]);
const searchQuery = ref("");
const loading = ref(true);
const isdetailsPokemon = ref(false);
const selectedPokemon = ref<any | null>(null);

onMounted(async () => {
  try {
    const response = await fetch("https://tyradex.app/api/v1/pokemon");
    const data = await response.json();
    pokemons.value = Array.isArray(data) ? data : data.pokemon ?? [];
    console.log("Pokemons:", pokemons.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  } finally {
    loading.value = false;
  }
});

const filteredPokemons = computed(() => {
  if (!searchQuery.value) {
    return pokemons.value;
  }
  return pokemons.value.filter((pokemon: any) =>
    pokemon.name.fr.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const searchPokemon = (query: string) => {
  searchQuery.value = query;
};

const showDetails = (pokemon: any) => {
  selectedPokemon.value = pokemon;
  isdetailsPokemon.value = true;
  
};


</script>

<template>
  <h1 class="text-5xl text-orange-500 font-bold uppercase text-center p-5">
    Pokemons
  </h1>

  <div>
    <Chart/>
  </div>
  <div class="flex justify-center my-4">
    <input
      v-model="searchQuery"
      @input="searchPokemon(searchQuery)"
      type="text"
      placeholder="Rechercher un Pokémon..."
      class="border p-2 rounded w-1/2"
    />
  </div>
  <div class="px-5 gap-5">
    <table
      class="table-fixed border-separate border rounded border-gray-300 w-full mb-5 p-5 bg-white shadow-md"
    >
      <thead class="h-10">
        <tr>
          <th class="whitespace-nowrap px-2 w-1/12 text-left border border-gray-300 ...">ID</th>
          <th class="whitespace-nowrap px-2 w-1/8 text-left border border-gray-300 ...">Names</th>
          <th class="whitespace-nowrap px-2 w-1/8 text-left border border-gray-300 ...">
            Categories
          </th>
          <th class="whitespace-nowrap px-2 w-1/8 text-left border border-gray-300 ...">
            Generations
          </th>
          <th class="whitespace-nowrap px-2 w-1/12 text-left border border-gray-300 ...">
            Images
          </th>
          <th class="whitespace-nowrap px-2 w-1/12 text-left border border-gray-300 ...">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pokemon in filteredPokemons" :key="pokemon.pokedex_id" class="hover:bg-gray-200 p-2">
          <td class="px-2 whitespace-nowrap">{{ pokemon.pokedex_id }}</td>
          <td class="px-2 whitespace-nowrap">{{ pokemon.name.fr }}</td>
          <td class="px-2 whitespace-nowrap">{{ pokemon.category }}</td>
          <td class="px-2 whitespace-nowrap">{{ pokemon.generation?.name }}</td>
          <td class="px-2 whitespace-nowrap">
            <img
              :src="pokemon.sprites.regular"
              :alt="pokemon.name.en"
              class="w-16 h-16 mx-auto"
            />
          </td>
          <td class="px-2 whitespace-nowrap">
            <button @click="showDetails(pokemon)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Détails
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 justify-center pb-5"
    >
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.pokedex_id"
        class="shadow-lg p-2 m-2 rounded bg-white hover:bg-blue-200 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
      >
        <img
          :src="pokemon.sprites.regular"
          :alt="pokemon.name.en"
          class="mx-auto mb-2"
        />

        <h2 class="text-lg font-semibold text-center">
          {{ pokemon.name.fr }}
        </h2>
      </div>
    </div> -->
  <!-- </div> -->
  <!-- <DetailsPokemon
    v-if="isdetailsPokemon"
    :pokemon="selectedPokemon"
    @close="isdetailsPokemon = false"
  /> -->
<!-- </template>  -->
