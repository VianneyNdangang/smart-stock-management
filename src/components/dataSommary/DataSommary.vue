<template>
  <Card>
    <div class="flex gap-2 items-center justify-start whitespace-nowrap">
      <div
        class="p-3 rounded-lg border h-full"
        :class="
          props.state === 'danger'
            ? `text-(--danger) bg-(--danger)/10 border-(--danger)/40`
            : props.state === 'success'
              ? `text-(--success) bg-(--success)/10 border-(--success)/40`
              : props.state === 'primary'
                ? `text-(--primary) bg-(--primary)/10  border-(--primary)/40`
                : `text-(--warning) bg-(--warning)/10  border-(--warning)/40`
        "
      >
        <VueIcon v-if="props.icon" :name="props.icon" class="size-5" />
      </div>
      <div>
        <p class="text-sm font-semibold text-(--text-primary) overflow-auto">
          {{ props.title }}
        </p>
        <p class="text-3xl font-semibold text-(--text-muted)">
          {{ props.value }}
        </p>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import VueIcon from "@kalimahapps/vue-icons/VueIcon";
import Card from "../card/Card.vue";

const props = defineProps<{
  icon?: any;
  title: string;
  value: any;
  description?: string;
  state?: "danger" | "success" | "primary" | "warning";
}>();
</script>
