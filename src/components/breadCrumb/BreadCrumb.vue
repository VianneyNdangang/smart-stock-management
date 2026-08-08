<template>
  <nav class="flex items-center text-sm">
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <RouterLink
        v-if="item.path"
        :to="item.path"
        class="text-(--text-muted) hover:text-(--secondary) transition-colors"
      >
        {{ item.label }}
      </RouterLink>

      <span
        v-else
        class="font-medium text-(--text-primary)"
      >
        {{ item.label }}
      </span>

      <IconChevronRight
        v-if="index < items.length - 1"
        class="mx-2 size-4 text-(--text-muted)"
      />
    </template>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { IconChevronRight } from "@tabler/icons-vue";
import type { menuType } from "../menu/MenuLabel.vue";

// const route = useRoute();

defineProps<{
  items: menuType[];
}>();
</script>