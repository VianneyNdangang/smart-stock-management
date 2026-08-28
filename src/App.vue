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