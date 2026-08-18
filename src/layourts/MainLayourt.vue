<template>
  <div class="app-layout">
    <NavbarView   v-if="!$route.meta.hideNavigation" />
    <div class="hidden md:flex">
      <SidebarView  v-if="!$route.meta.hideNavigation" />
    </div>
    <div
    v-if="!$route.meta.hideNavigation"
      class="transition-all duration-300 ease-in-out pt-22"
      :class="layoutClass"
    >
        <ScrollButton/>

      <motion.div
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: 0.4,
        }"
      >
        <main class="z-0 p-3 md:p-5">
          <RouterView />
        </main>
        
      </motion.div>
    </div>
  </div>
  <main v-if="$route.meta.hideNavigation">
          <RouterView />
        </main>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import { motion } from "motion-v";
import NavbarView from "@/components/navbar/NavbarView.vue";
import SidebarView from "@/components/sideBar/SidebarView.vue";
import { useUiStore } from "@/store/uiStore";
import { computed, onMounted, onUnmounted } from "vue";
import { useRSidebarStore } from "@/store/rSideBareStore";
import ScrollButton from "@/components/scrollButton/ScrollButton.vue";
import socket from "@/helpers/socket";
const uiStore = useUiStore();
const rSidebareStore = useRSidebarStore();

const layoutClass = computed(() => {
  if (rSidebareStore.isSidebar) return "pr-0 md:pr-96";

  if (uiStore.isSidebar) return "pl-0 md:pl-70";

  return "pl-0 md:pl-20";
});

onMounted(() => {
  socket.connect();

  socket.on("connect", () => {
    console.log("Socket connecté :", socket.id);
  });
});

onUnmounted(() => {
  socket.off("connect");
});
</script>
