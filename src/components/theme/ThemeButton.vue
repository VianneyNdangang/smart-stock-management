<template>
  <button
    @click="themeStore.toggleTheme()"
    type="button"
    class="cursor-pointer rounded border px-2 py-1"
  >
    <IconSunHigh
      v-if="isDark"
      :size="20"
      :stroke-width="1.5"
    />

    <IconMoonStars
      v-else
      :size="20"
      :stroke-width="1.5"
    />
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/themeStore";
import { IconMoonStars, IconSunHigh } from "@tabler/icons-vue";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();

const { isDark } = storeToRefs(themeStore);
</script>