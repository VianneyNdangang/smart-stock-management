<script setup lang="ts">
import VueIcon from "@kalimahapps/vue-icons/VueIcon";

const props = defineProps<{
  activeIcon?: any;
  inactiveIcon?: any;
}>();

const model = defineModel<boolean>({
  default: false
});
</script>

<template>
  <button
    type="button"
    @click="model = !model"
    class="relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 "
    :class="model ? 'bg-(--btt-bg)' : 'bg-(--bg)'"
  >
    <span
      class="flex h-5 w-5 items-center justify-center rounded-full bg-white transition-transform duration-300 text-(--text-third)"
      :class="model ? 'translate-x-8' : 'translate-x-1'"
    >
      <VueIcon
        v-if="props"
        :name="model ? activeIcon : inactiveIcon"
        class="size-5"
      />
    </span>
  </button>
</template>
