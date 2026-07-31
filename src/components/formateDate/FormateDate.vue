<script setup lang="ts">
const props = defineProps<{date:string}>()
const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <span>{{ formatDate(props.date) }}</span>
</template>