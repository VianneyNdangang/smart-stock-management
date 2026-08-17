<template>
  <div class="flex flex-col md:flex-row items-center justify-between mt-5 w-full">
    <p class="text-sm text-(--text-muted)">
      Page {{ currentPage }} sur {{ totalPages }}
    </p>
    <div class="flex items-center justify-center gap-3 ">
    <Button
      :click="
        () => {
          changePage(props?.page - 1);
        }
      "
      :icon="ChChevronLeft"
      name="prev"
      type="button"
      variant="ghost"
      :disabled="!props.hasPrev"
    />
    <div class="flex gap-2 overflow-auto">
      <button
        v-for="(page, index) in pages"
        :key="`${page}-${index}`"
        name="pages"
        :disabled="page === '...'"
        @click="typeof page === 'number' && changePage(page)"
        :class="[
          'px-3 py-1 rounded border',
          page === currentPage
            ? 'bg-(--background) text-(--secondary) border-(--secondary)'
            : 'border-(--border)',
          page === '...' && 'cursor-default border-none',
        ]"
      >
        {{ page }}
      </button>
    </div>
    <Button
      :click="
        () => {
          changePage(currentPage + 1);
        }
      "
      :icon="ChChevronRight"
      type="button"
      variant="ghost"
      name="next"
      :disabled="!props.hasNext"
    />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Button from "../button/Button.vue";
import { ChChevronLeft, ChChevronRight } from "@kalimahapps/vue-icons";
import type { paginationProps } from "./type.ts";

const props = withDefaults(defineProps<paginationProps>(), {
  records: () => [],
  page: 1,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
});

const emit = defineEmits<{
  (e: "changePage", page: number): void;
}>();

const currentPage = computed(() => props.page);

const filter = ref("");

// Génération des numéros de pages
const pages = computed(() => {
  const total = props.totalPages;
  const current = props.page;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const result: (number | string)[] = [];

  // Toujours afficher la première page
  result.push(1);

  // Ajouter "..." si on est loin du début
  if (current > 4) {
    result.push("...");
  }

  // Pages autour de la page courante
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  // Ajouter "..." si on est loin de la fin
  if (current < total - 3) {
    result.push("...");
  }

  // Toujours afficher la dernière page
  result.push(total);

  return result;
});

function changePage(page: number) {
  emit("changePage", page);
}

watch(filter, () => {
  emit("changePage", 1);
});
</script>
