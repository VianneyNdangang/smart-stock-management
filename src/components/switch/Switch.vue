<script setup lang="ts">
import type VueIcon from '@kalimahapps/vue-icons/VueIcon';

const model = defineModel<boolean>({
  default: false,
});

const props = defineProps<{
    icone: any;
}>()
</script>

<template>
  <button
    type="button"
    @click="model = !model"
    class="relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 cursor-pointer"
    :class="model ? 'bg-[#C79E46]' : 'bg-gray-300 dark:bg-gray-700'"
  >
    <span
      class="inline-block h-5 w-5 transform rounded-full bg-white transition duration-300"
      :class="model ? 'translate-x-8' : 'translate-x-1'"
    >
<VueIcon :name="props.icone"
</span>
  </button>
</template>