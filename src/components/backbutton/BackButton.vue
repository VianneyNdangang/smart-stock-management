<script setup lang="ts">
import { useRouter } from "vue-router";
import { IconArrowLeft } from "@tabler/icons-vue";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <button
    type="button"
    @click="goBack"
    class="fixed cursor-pointer z-999 flex items-center my-2 gap-2 text-sm
           text-(--text-secondary)
           transition-colors
           hover:text-(--text-primary)"
  >
    <IconArrowLeft :size="18" />
    <span>Back</span>
  </button>
</template>