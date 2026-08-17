<template>
  <!-- <Card> -->
  <section
    class="flex md:justify-between items-center w-full gap-3 flex-col md:flex-row"
  >
    <div class="flex gat-2 flex-col w-full">
      <h1 class="text-2xl md:text-3xl font-bold text-(--text-primary)">
        {{ props?.title }}
      </h1>
      <p class="text-sm md:text-md text-(--text-secondary)">{{ props.subtitle }}</p>
    </div>

    <!-- <div
      class="flex flex-col md:flex-row justify-end my-4 items-center gap-3 w-full"
    > -->
    <div
      class="flex gap-3 justify-end items-center w-full md:w-2/3"
    >
      <Button
        v-if="props.new"
        name="new"
        :label="props.new.label"
        type="button"
        variant="primary"
        :icon="props.new?.icon"
        :click="props.new?.action"
        w="52"
      />
      <Button
        name="refresh"
        label="Refresh"
        type="button"
        variant="secondary"
        :click="props.refresh"
        w="46"
        :loading="props.loading ?? false"
        :icon="IconRefresh"
        :responsif="true"
      />
    </div>
    <!-- </div> -->
  </section>
  <!-- </Card> -->
</template>

<script setup lang="ts">
import { IconRefresh } from "@tabler/icons-vue";
import Button from "../button/Button.vue";
// import Card from '../card/Card.vue';

const props = defineProps<{
  refresh?: () => {};
  loading?: boolean;
  title?: string;
  subtitle?: string;
  new?: {
    label: string;
    action: () => {};
    icon: any;
  };
}>();
</script>
