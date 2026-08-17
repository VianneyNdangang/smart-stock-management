<script setup lang="ts">
const props = defineProps<{date?:string}>()
const formatDate = (value?: string) => {
  if(value){
  return new Date(value).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}else{return '-'}
};
</script>

<template>
  <span class="text-(--text-muted) text-sm whitespace-nowrap">{{ formatDate(props.date) }}</span>
</template>