<template>
  <div
    class="fixed z-40 flex-col h-screen py-2 flex bg-(--surface) shadow-sm transition-all duration-300 ease-in-out"
    :class="
      uiStore.isSidebar ? `w-70` : `w-20 flex items-center justify-center`
    "
  >
    <section class="w-full pb-2">
      <div class="flex gap-2 justify-start h-17 items-center">
         <img src="/images/glotelho-e-commerce-logo-white-220x60.png" alt="logo" class="w-auto h-15 mb-1.5" />
         <div v-if="uiStore.isSidebar" class="flex flex-col">
          <p class=" font-rounded text-4xl font-bold leading-none">Glotelho</p>
          <p class=" font-rounded text-xs text-(--secondary) font-black">ECOMMERCE</p>
         </div>
      </div>
     <div class="mb-4 h-px w-full bg-(--text-secondary)" />
     
        <h2  class="text-xl font-semibold px-2">Menu</h2>
    </section>
    <section
      :class="!uiStore.isSidebar?`h-full w-full gap-3 p-2`:`h-full w-full scrollbar-thumb-transparent gap-3 p-2 overflow-scroll`"
    >
      <MenuLabel v-for="item in menu" :item="item" :key="item.name" />
    </section>
  </div>
</template>
<script setup lang="ts">
import { MenuList } from "@/router/menu.ts";
import { useUiStore } from "@/store/uiStore.ts";
import MenuLabel from "../menu/MenuLabel.vue";
const uiStore = useUiStore();
const menu = MenuList;
</script>
