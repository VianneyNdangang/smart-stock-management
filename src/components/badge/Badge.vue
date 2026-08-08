<template>
  <span
    class="rounded px-3 py-1 text-xs text-gray-200 font-semibold"
    :class="variants[props.type], `min-w-${props.w}`"
  >
    {{ props.message }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string;
  type: "danger" | "success" | "primary" | "warning";
  w?: string
}>();

const variants = {
  danger: "bg-(--danger) ",
  success: "bg-(--success) ",
  primary: "bg-(--primary) ",
  warning: "bg-(--warning) ",
} as const;
</script>