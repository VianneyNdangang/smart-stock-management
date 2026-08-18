<template>
  <div
    class="fixed z-40 flex-col h-screen p-2 flex bg-(--surface) shadow-sm transition-all duration-300 ease-in-out"
    :class="
      uiStore.isSidebar ? `w-70` : `w-20 flex items-center justify-center`
    "
  >
    <section class="w-full pb-2">
      <div class="flex gap-2 justify-start items-center">
         <img src="/images/glotelho-e-commerce-logo-white-220x60.png" alt="logo" class="w-auto h-15 rounded mb-4" />
         <div v-if="uiStore.isSidebar" class="flex flex-col">
          <p class=" font-rounded text-4xl font-bold leading-none">Glotelho</p>
          <p class=" font-rounded text-xs text-(--secondary) font-black">ECOMMERCE</p>
         </div>
      </div>
     <div class="mb-4 h-0.5 w-full bg-(--text-primary)" />
      <div
        class="flex justify-between items-center"
        :class="uiStore.isSidebar ? `flex-row` : `flex-col`"
      >
        <h2 v-if="uiStore.isSidebar" class="text-xl font-bold">Menu</h2>
        <div>
          <button
            name="closeSidebar"
            @click="uiStore.handleChange()"
            class="cursor-pointer flex justify-center items-center p-2"
          >
            <IconTransitionLeftFilled
              v-if="uiStore.isSidebar"
            /><IconTransitionRightFilled v-else />
          </button>
        </div>
      </div>
    </section>
    <section
      :class="!uiStore.isSidebar?`h-full w-full`:`h-full w-full scrollbar-thumb-transparent overflow-scroll`"
    >
      <MenuLabel v-for="item in menu" :item="item" :key="item.name" />
    </section>
  </div>
</template>
<script setup lang="ts">
import {
  IconTransitionLeftFilled,
  IconTransitionRightFilled,
} from "@tabler/icons-vue";
import { MenuList } from "@/router/menu.ts";
import { useUiStore } from "@/store/uiStore.ts";
import MenuLabel from "../menu/MenuLabel.vue";
const uiStore = useUiStore();
const menu = MenuList;
</script>
