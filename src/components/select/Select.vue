<template>
  <div class="w-full space-y-1">
    <label
      v-if="label"
      :for="name"
      class="text-sm font-medium text-(--text-primary)"
    >
      {{ label }}
    </label>

    <div class="relative">
      <!-- Select -->
      <button
        type="button"
        @click="toggle"
        class="w-full rounded border py-2 px-3 text-left transition-all duration-200 focus:outline-none flex items-center justify-between"
        :class="[
          error ? 'border-(--danger)' : 'border-(--border)',
        ]"
      >
        <span
          :class="model ? 'text-(--text-secodary)' : 'text-(--text-muted)'"
        >
          {{ selectedLabel }}
        </span>

        <ChChevronDown
          class="transition-transform duration-300"
          :class="{ 'rotate-180': open }"
        />
      </button>

      <!-- Dropdown -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-2 scale-95"
      >
        <ul
          v-if="open"
          class="absolute z-50 mt-2 w-full rounded border border-(--border) bg-(--background) shadow-xl overflow-hidden"
        >
          <li
            v-for="option in options"
            :key="option.value"
            @click="select(option)"
            class="cursor-pointer px-3 py-2 transition-colors hover:bg-(--hover)"
            :class="{
              'bg-(--secondary)/10 text-(--secondary)': model === option.value
            }"
          >
            {{ option.label }}
          </li>
        </ul>
      </Transition>
    </div>

    <p
      v-if="error"
      class="text-xs text-(--danger)"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { ChChevronDown } from "@kalimahapps/vue-icons";

const model = defineModel<string | number>();

const props = defineProps<{
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  options: {
    label: string;
    value: string | number;
  }[];
}>();

const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};

const select = (option: { label: string; value: string | number }) => {
  model.value = option.value;
  open.value = false;
};

const selectedLabel = computed(() => {
  const option = props.options.find(
    (o) => o.value === model.value
  );

  return option?.label ?? props.placeholder ?? "Sélectionner";
});

const container = ref();

onClickOutside(container, () => {
  open.value = false;
});
</script>