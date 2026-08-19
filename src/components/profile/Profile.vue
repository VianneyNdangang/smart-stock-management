<template>
  <img
    :src="props.src"
    alt="Profil"
    :class="`rounded-full w-auto h-${props.h}`"
    v-if="props.src"
  />
  <div
    v-else
    :class="`flex h-${h} w-${h} shrink-0 items-center justify-center rounded-full bg-(--primary)/10 text-sm font-semibold text-(--primary)`"
  >
    {{ getInitials(name) }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src?: any;
  h: string;
  name?: string;
}>();

const getInitials = (name?: string) => {
  if (!name) return "?";

  return name
    .split(".")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};
</script>
