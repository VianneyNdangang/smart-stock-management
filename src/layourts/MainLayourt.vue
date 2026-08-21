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
      <BackButton/>
      <motion.div
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: 0.4,
        }"
      >
        <main class="z-0 mt-2 p-3 md:p-5">
          <div class="mb-3 z-0 h-25" :class="rSidebareStore.isSidebar?`ml-20`:``"> <AlertCarousel :messages="formattedAlerts" /></div>
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
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRSidebarStore } from "@/store/rSideBareStore";
import ScrollButton from "@/components/scrollButton/ScrollButton.vue";
import socket from "@/helpers/socket";
import AlertCarousel from "@/components/alertMessages/AlertCarousel.vue";
import { apiClient } from "@/store/api";
import { formatAlertMessage, type AlertMessage } from "@/helpers/formateData";
import BackButton from "@/components/backbutton/BackButton.vue";
const uiStore = useUiStore();
const rSidebareStore = useRSidebarStore();

const alerts = ref([])
const layoutClass = computed(() => {
  if (rSidebareStore.isSidebar) return "pr-0 md:pr-96";

  if (uiStore.isSidebar) return "pl-0 md:pl-70";

  return "pl-0 md:pl-20";
});


onMounted(async() => {
  alerts.value = (await apiClient(`stock-alert/warehouse/6a86ba9cbc14cf8074bf1d11`)).data.items
  socket.connect();

  socket.on("connect", () => {
    console.log("Socket connecté :", socket.id);
  });
});

onUnmounted(() => {
  socket.off("connect");
});

const formattedAlerts = computed<AlertMessage[]>(() => {
  return alerts.value.map(formatAlertMessage);
});
</script>
