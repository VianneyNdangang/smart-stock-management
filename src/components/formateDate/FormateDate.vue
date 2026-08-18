<script setup lang="ts">
const props = withDefaults(defineProps<{ class?: string, date?:string}>(),
{
   class: "text-(--text-muted) text-sm"
})
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
  <span class="whitespace-nowrap" :class="class">{{ formatDate(props.date) }}</span>
</template>