<template>
  <div @click="themeStore.toggleTheme">
    <Switch
      :model="isDark"
      :activeIcon="IconMoonStars"
      :inactiveIcon="IconSunHigh"
    />
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from "@/store/themeStore";
import Switch from "../switch/Switch.vue";
import { IconMoonStars, IconSunHigh } from "@tabler/icons-vue";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const isDark = storeToRefs(themeStore);
</script>
