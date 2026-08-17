<template>
  <div class="relative flex w-full flex-col gap-2">
    <!-- Input -->
    <div
      class="flex min-h-9.5 w-full items-center gap-2 rounded border px-3 py-1.5"
      :class="
        error
          ? 'border-(--danger)'
          : 'border-(--border)'
      "
      @click="focusInput"
    >
      <!-- Selected -->
      <div class="flex flex-1 flex-wrap items-center gap-1.5">
        <span
          v-for="option in selectedOptions"
          :key="option.value"
          class="flex items-center gap-1 rounded bg-(--hover) px-2 py-1 text-xs"
        >
          {{ option.label }}

          <IconX
            size="13"
            class="cursor-pointer"
            @click.stop="remove(option)"
          />
        </span>

        <!-- Search -->
        <input
          ref="input"
          v-model="searchQuery"
          type="text"
          :name="name"
          :placeholder="
            selectedOptions.length
              ? ''
              : placeholder
          "
          class="min-w-20 flex-1 bg-transparent outline-none text-(--text-secondary)"
          @input="handleSearch"
        />
      </div>

      <!-- Clear -->
      <IconX
        v-if="selectedOptions.length"
        size="15"
        class="cursor-pointer text-(--text-muted)"
        @click.stop="clear"
      />
    </div>

    <!-- Loading -->
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="loading"
        class="absolute left-0 top-full z-50 mt-2 flex w-full items-center justify-center rounded bg-(--card) p-4 shadow-lg"
      >
        <span class="text-sm text-(--text-muted)">
          Searching...
        </span>
      </div>

      <!-- Results -->
      <div
        v-else-if="showDropdown"
        class="absolute left-0 top-full z-50 mt-2 max-h-80 w-full overflow-auto rounded bg-(--card) p-2 shadow-lg"
      >
        <!-- Results -->
        <template v-if="options.length">
          <div
            v-for="option in options"
            :key="option.value"
            class="group flex cursor-pointer items-center justify-between rounded px-3 py-2 hover:bg-(--hover)"
            @click="toggle(option)"
          >
            <span class="text-sm">
              {{ option.label }}
            </span>

            <IconCheck
              v-if="isSelected(option)"
              size="16"
              class="text-(--secondary)"
            />
          </div>
        </template>

        <!-- Empty -->
        <div
          v-else
          class="p-4 text-center text-sm text-(--text-muted)"
        >
          No results found
        </div>
      </div>
    </Transition>

    <p
      v-if="error"
      class="text-xs text-(--danger)"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from "vue";
import { IconX, IconCheck } from "@tabler/icons-vue";
import { apiClient } from "@/store/api";

interface Option {
  label: string;
  value: string;
}
const props = withDefaults(
  defineProps<{
    modelValue: string[];
    url: string;
    name?: string;
    optionValue: string;
    optionLabel: string;
    placeholder?: string;
    error?: string;
    minSearchLength?: number;
  }>(),
  {
    name: "",
    placeholder: "Search...",
    error: "",
    minSearchLength: 1,
  }
);

const emit = defineEmits<{
  (
    e: "update:modelValue",
    value: string[]
  ): void;
}>();
const input = ref<HTMLInputElement | null>(null);
const searchQuery = ref("");
const options = ref<Option[]>([]);
const loading = ref(false);
const showDropdown = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | null = null;


const selectedOptions = computed(() => {
  return props.modelValue
    .map((id) => {
      return options.value.find(
        (option) => option.value === id
      );
    })
    .filter(Boolean) as Option[];
});


const isSelected = (option: Option) => {
  return props.modelValue.includes(option.value);
};

const search = async (query: string) => {
  if (query.length < props.minSearchLength) {
    options.value = [];
    showDropdown.value = false;
    return;
  }

  loading.value = true;
  showDropdown.value = true;
  try {
    const response = await apiClient.get(
      `/${props.url}`,
      {
        params: {
          search: query,
        },
      }
    );
    options.value = response.data.items.map(
      (item: any) => ({
        label: item[props.optionLabel],
        value: item[props.optionValue],
      })
    );

  } catch (error) {
    console.error(
      "Erreur recherche:",
      error
    );

    options.value = [];

  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    search(searchQuery.value.trim());
  }, 400);
};


const toggle = (option: Option) => {
  const values = [
    ...props.modelValue,
  ];

  const index = values.indexOf(
    option.value
  );

  if (index === -1) {
    values.push(option.value);
  } else {
    values.splice(index, 1);
  }

  emit(
    "update:modelValue",
    values
  );

  searchQuery.value = "";
};

const remove = (option: Option) => {
  emit(
    "update:modelValue",
    props.modelValue.filter(
      (id) => id !== option.value
    )
  );
};

const clear = () => {
  emit(
    "update:modelValue",
    []
  );

  searchQuery.value = "";
};


const focusInput = () => {
  input.value?.focus();
};

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>