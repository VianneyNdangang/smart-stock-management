<template>
  <div class="space-y-1 w-full">
    <label :for="props.name" class="text-sm font-medium">
      {{ props.label }}
    </label>

    <div class="relative">
      <textarea
        v-model="model"
        :name="props.name"
        :placeholder="props.placeholder"
        class="w-full rounded border bg-(--input-bg) py-1 pl-3 placeholder:text-gray-500 focus:outline-none"
        :class="props.error ? 'border-(--danger)' : 'border-(--border)'"
      />
    </div>

    <p class="text-xs text-(--danger)">
      {{ props.error }}
    </p>
  </div>
</template>
<script setup lang="ts">

// import { IconSearch } from '@tabler/icons-vue';

const model = defineModel<string>();
const props = defineProps<{
  label?: string;
  name: string;
  placeholder: string;
  error?: string;
  icon?: any;
}>();
</script>
