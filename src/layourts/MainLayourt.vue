

<template>
  <div class="min-h-screen"> 
    <NavbarView v-if="!securityRoutes.includes(route?.name as string)" />
    <div class="hidden md:flex">
      <SidebarView v-if="!securityRoutes.includes(route?.name as string)" />
    </div>
   
    

    <div
    class="transition-all duration-300 ease-in-out"
  :class="[
    securityRoutes.includes(route?.name as string)
      ? ''
      : uiStore.isSidebar
        ? 'pl-0 md:pl-70 pt-22'
        : 'pl-0 md:pl-20 pt-22'
  ]"
>
      <motion.div :initial="{ opacity: 0, scale: 0 }" :animate="{ opacity: 1, scale: 1 }" :exit="{ opacity: 0, scale: 0 }"
      :transition="{
        duration: 0.4,
      }">
      <main class="p-5 z-0">
        <RouterView />
      </main>
      </motion.div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { motion } from 'motion-v'
import NavbarView from "@/components/navbar/NavbarView.vue";
import SidebarView from "@/components/sideBar/SidebarView.vue";
import { useUiStore } from "@/store/uiStore";
const route = useRoute()
const securityRoutes = ["login", "register", "NotFound"];
const uiStore = useUiStore();
</script>