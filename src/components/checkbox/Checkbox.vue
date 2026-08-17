

<template>
  <label class="inline-flex cursor-pointer items-center gap-2 select-none">
    <input
      v-model=model
     @change="change"
      type="checkbox"
      class="sr-only peer"
      :name="name"
    />

    <span
  class="
    flex h-4.5 w-4.5 items-center justify-center
    rounded
    border-2
    transition-all duration-200
    peer-checked:border-(--primary)
    peer-checked:bg-(--primary)
  "
  :class="error? `border-(--danger)`:`border-(--border)`"
>
  <IconCheck
    :class="[
      'h-3 w-3 text-white transition-all duration-200',
      model ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
    ]"
    stroke-width="3"
  />
</span>

    <span class="text-sm text-(--text-primary)">
        {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({default: false});
const props = defineProps<{
  label?: string;
  name?: string;
  error?: string;
  change?:()=>any
}>()

import { IconCheck } from "@tabler/icons-vue";

</script>