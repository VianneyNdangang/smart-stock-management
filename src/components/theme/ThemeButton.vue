<template>
  <div @click="handelChange(darkMode)">
    <Switch
      v-model="darkMode"
      :activeIcon="IconMoonStars"
      :inactiveIcon="IconSunHigh"
    />
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from "@/store/themeStore";
import Switch from "../switch/Switch.vue";
import { ref } from "vue";
import { IconMoonStars, IconSunHigh } from "@tabler/icons-vue";

const themeStore = useThemeStore();
const darkMode = ref(false);

const handelChange = (mode: boolean) => {
  if (themeStore.isDark && !mode) {
    themeStore.toggleTheme();
  } else if (!themeStore.isDark && mode) {
    themeStore.toggleTheme();
  }
};
</script>
