<template>
  <span
    class="inline-flex h-7 items-center justify-center rounded border px-3 text-xs font-semibold leading-none whitespace-nowrap"
    :class="[
      variants[props.type],
    ]"
  >
    {{ props.message }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string | number;
  type: "danger" | "success" | "primary" | "warning" ;
}>();

const variants = {
  danger: "text-(--danger) bg-(--danger)/10 border-(--danger)/40",
  success: "text-(--success) bg-(--success)/10 border-(--success)/40",
  primary: "text-(--primary) bg-(--primary)/10 border-(--primary)/40",
  warning: "text-(--warning) bg-(--warning)/10 border-(--warning)/40",
} as const;
</script>