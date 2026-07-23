<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
    :class="variants[props.type]"
  >
    {{ props.message }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string;
  type: "danger" | "success" | "primary" | "warning";
}>();

const variants = {
  danger: "bg-[var(--badge-danger-soft)] text-[var(--danger)]",
  success: "bg-[var(--badge-success-soft)] text-[var(--success)]",
  primary: "bg-[var(--badge-primary-soft)] text-[var(--primary)]",
  warning: "bg-[var(--badge-warning-soft)] text-[var(--warning)]",
} as const;
</script>