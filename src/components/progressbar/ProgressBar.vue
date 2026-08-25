<template>
  <div class="flex items-center gap-3 w-full whit">
    <!-- Pourcentage -->
    <span
      class="text-sm font-medium min-w-10 text-right"
      :class="textColor"
    >
      {{ percentage }}%
    </span>

    <!-- Barre -->
    <div
      class="h-2.5 flex-1 overflow-hidden rounded-full bg-(--background)"
    >
      <div
        class="h-full rounded-full transition-all duration-500 ease-out"
        :class="progressColor"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    percentage: number;
  }>(),
  {
    percentage: 0,
  }
);

const percentage = computed(() =>
  Math.min(100, Math.max(0, props.percentage))
);

const progressColor = computed(() => {
  if (percentage.value <= 30) {
    return "bg-(--danger)";
  }

  if (percentage.value <= 70) {
    return "bg-(--warning)";
  }

  return "bg-(--success)";
});

const textColor = computed(() => {
   if (percentage.value <= 30) {
    return "text-(--danger)";
  }

  if (percentage.value <= 70) {
    return "text-(--warning)";
  }

  return "text-(--success)";
});
</script>