<script setup lang="ts">
import { useRouter } from "vue-router";
import { IconArrowLeft } from "@tabler/icons-vue";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="w-full bg-(--surface) p-3 z-40 sticky top-20 mb-3">
     <button
    type="button"
    @click="goBack"
    class="cursor-pointer flex items-center gap-2 text-sm
           text-(--text-secondary)
           transition-colors
           hover:text-(--text-primary)
           font-bold"     
  >
    <IconArrowLeft :size="18" />
    <span>Back</span>
  </button>
  </div>
 
</template>