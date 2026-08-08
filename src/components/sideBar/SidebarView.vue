<template>
  <div
    class="fixed z-50 flex-col h-screen p-2 flex bg-(--surface) shadow-sm transition-all duration-300 ease-in-out"
    :class="
      uiStore.isSidebar ? `w-70` : `w-20 flex items-center justify-center`
    "
  >
    <section class="w-full pb-2">
      <img src="/logo.jpg" alt="logo" class="w-auto h-15 rounded mb-4" />
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
      class="h-full w-full text-slate-900 scrollbar-thumb-transparent overflow-scroll"
    >
      <MenuLabel v-for="item in menu" :item="item" :key="item.name" />
    </section>
    <section class="w-full">
      <div class="flex flex-col justify-center items-center gap-4">
        <ThemeButton v-if="uiStore.isSidebar" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {
  IconTransitionLeftFilled,
  IconTransitionRightFilled,
} from "@tabler/icons-vue";
import ThemeButton from "../theme/ThemeButton.vue";
import { MenuList } from "@/router/menu.ts";
import { useUiStore } from "@/store/uiStore.ts";
import MenuLabel from "../menu/MenuLabel.vue";
const uiStore = useUiStore();
const menu = MenuList;
</script>
