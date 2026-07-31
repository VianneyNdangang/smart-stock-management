<template>
  <div
    ref="container"
    class="w-full space-y-1"
  >
    <label
      v-if="label"
      :for="name"
      class="text-sm font-medium text-(--text-primary)"
    >
      {{ label }}
    </label>

    <div class="relative">
      <!-- Input -->
      <div
        class="flex items-center rounded border bg-(--bg) py-2 px-3 transition-all duration-200"
        :class="[
          error ? 'border-(--danger)' : 'border-(--border)',
        ]"
      >
        <input
          ref="input"
          v-model="search"
          :name="name"
          type="text"
          autocomplete="off"
          :placeholder="placeholder ?? 'Sélectionner'"
          class="flex-1 bg-transparent outline-none text-(--text-secondary) placeholder:text-(--text-third)"
          @focus="open = true"
          @keydown.down.prevent="next"
          @keydown.up.prevent="previous"
          @keydown.enter.prevent="select(activeOption)"
          @keydown.esc="open = false"
        />

        <button
          type="button"
          @click="toggle"
          class="cursor-pointer"
        >
          <ChChevronDown
            class="transition-transform duration-300"
            :class="{ 'rotate-180': open }"
          />
        </button>
      </div>

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
          class="absolute z-50 mt-2 w-full rounded border border-(--border) bg-(--bg) shadow-xl overflow-hidden max-h-60 overflow-y-auto"
        >
          <li
            v-if="filteredOptions.length === 0"
            class="px-3 py-2 text-(--text-third)"
          >
            Aucun résultat
          </li>

          <li
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            @mouseenter="active = index"
            @click="select(option)"
            class="cursor-pointer px-3 py-2 transition-colors hover:bg-(--hover)"
            :class="[
              active === index
                ? 'bg-(--btt-bg)/10 text-(--btt-bg)'
                : 'hover:bg-(--hover)'
            ]"
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
import { computed, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import { ChChevronDown } from "@kalimahapps/vue-icons";

interface Option {
  label: string;
  value: string | number;
}

const model = defineModel<string | number>();

const props = defineProps<{
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  options: Option[];
}>();

const container = ref<HTMLElement>();
const input = ref<HTMLInputElement>();

const open = ref(false);
const search = ref("");
const active = ref(0);

const toggle = () => {
  open.value = !open.value;

  if (open.value) {
    input.value?.focus();
  }
};

const filteredOptions = computed(() => {
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(search.value.toLowerCase())
  );
});

const activeOption = computed(() => {
  return filteredOptions.value[active.value];
});

const select = (option?: Option) => {
  if (!option) return;

  model.value = option.value;
  search.value = option.label;
  open.value = false;
};

watch(
  () => model.value,
  () => {
    const option = props.options.find(
      (o) => o.value === model.value
    );

    if (option) {
      search.value = option.label;
    } else {
      search.value = "";
    }
  },
  { immediate: true }
);

watch(search, () => {
  active.value = 0;
});

const next = () => {
  if (active.value < filteredOptions.value.length - 1) {
    active.value++;
  }
};

const previous = () => {
  if (active.value > 0) {
    active.value--;
  }
};

onClickOutside(container, () => {
  open.value = false;

  const option = props.options.find(
    (o) => o.value === model.value
  );

  search.value = option?.label ?? "";
});
</script>