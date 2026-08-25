<template>
  <div
    class="flex justify-center items-center flex-col w-full min-h-full"
  >
    <div class="text-(--text-muted)"><IconMoodConfuzedFilled stroke={2} size="48" /></div>
    <h3 class="text-2xl font-bold text-(--text-secondary) text-center">
      {{ props.title }}
    </h3>
    <p class="text-(--text-muted) text-center">{{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { IconMoodConfuzedFilled } from '@tabler/icons-vue';

const props = defineProps<{
  title: string;
  message: string;
}>();
</script>
