<template>
  <div class="min-h-screen">
    <NavbarView v-if="!securityRoutes.includes(route?.name as string)" />
    <div class="hidden md:flex">
      <SidebarView v-if="!securityRoutes.includes(route?.name as string)" />
    </div>
    <div
      class="transition-all duration-300 ease-in-out pt-22"
      :class="layoutClass"
    >
      <div class="fixed bottom-4">
        <IconCircleArrowUpFilled
          size="35"
          class="text-(--secondary) cursor-pointer"
          @click="scrollTop"
        />
      </div>

      <motion.div
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: 0.4,
        }"
      >
        <main class="z-0 p-5">
          <RouterView />
        </main>
      </motion.div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { motion } from "motion-v";
import NavbarView from "@/components/navbar/NavbarView.vue";
import SidebarView from "@/components/sideBar/SidebarView.vue";
import { useUiStore } from "@/store/uiStore";
import { computed } from "vue";
import { useRSidebarStore } from "@/store/rSideBareStore";
import { IconCircleArrowUpFilled } from "@tabler/icons-vue";
const route = useRoute();
const securityRoutes = ["login", "register", "NotFound"];
const uiStore = useUiStore();
const rSidebareStore = useRSidebarStore();

const isSecurityRoute = computed(() =>
  securityRoutes.includes(route?.name as string),
);
const layoutClass = computed(() => {
  if (isSecurityRoute.value) return "";

  if (rSidebareStore.isSidebar) return "pr-0 md:pr-96";

  if (uiStore.isSidebar) return "pl-0 md:pl-70";

  return "pl-0 md:pl-20";
});

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>
