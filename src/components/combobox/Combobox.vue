<template>
  <div ref="container" class="w-full space-y-1">
    <label
      v-if="label"
      :for="name"
      class="text-sm font-medium text-(--text-primary)"
    >
      {{ label }}
    </label>

    <div class="relative flex w-full flex-col gap-2">
      <div
        class="flex items-center rounded border py-2 px-3 h-9.5 transition-all duration-200"
        :class="[
          error ? 'border-(--danger)' : 'border-(--border)',
        ]"
      >
      <input
        ref="input"
        v-model="searchQuery"
        :name="name"
        type="text"
        @input="onInput"
        :placeholder="placeholder"
        class="flex-1 bg-transparent outline-none text-(--text-secondary) placeholder:text-sm placeholder:text-(--text-muted)"
      />
      <IconX class="cursor-pointer" size="13" @click="()=>{searchQuery=''; items=[]; model = ''}"/>
      </div>

      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-2 scale-95"
      >
      
        <div
          v-if="items.length > 0"
          class="absolute z-50 left-0 top-full p-2 mt-2 w-full max-h-96 bg-(--card) shadow-lg overflow-scroll "
        >
        <!-- <Card> -->
            <div class="overflow-scroll">
            <div
              v-for="option in filteredOptions"
              :key="option?.value"
              class="group flex w-full cursor-pointer items-center gap-3 border-b border-(--border) px-3 py-2 last:border-b-0 hover:bg-(--hover)"
              @click="select(option)"
            >
              <span
                class="truncate transition-colors duration-200 text-sm group-hover:text-(--secondary)"
              >
                {{ option.label }}
              </span>
            </div>
            </div>
          <!-- </Card> -->
        </div>
        <!-- <span v-else class="absolute z-100 left-0 top-full p-2 mt-2 w-full max-h-96 bg-(--card) shadow-md overflow-scroll flex justify-center items-center">
          Aucun résultat
        </span> -->
       
      </Transition>
    </div>

    <p v-if="error" class="text-xs text-(--danger)">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { apiClient } from "@/store/api.ts";
// import Card from "../card/Card.vue";
import { IconX } from "@tabler/icons-vue";

type OptionType = {
  label: string;
  value: string | number;
};

const props = defineProps<{
  endpoint: string;
  optionValue: string;
  optionLabel: string
  placeholder?: string;
  label?: string;
  error?: string;
  name: string;
}>();

const searchQuery = ref("");
const items = ref<any[]>([]);
const loading = ref(false);
const model = defineModel<string | number>();
let timeoutId: ReturnType<typeof setTimeout> | null = null;
const filteredOptions = computed(() => {
  const option: OptionType[] = [];

  items.value.forEach((item) =>
    option.push({
      label: item[props.optionLabel],
      value: item[props.optionValue],
    }),
  );
  return option;
});

const onInput = () => {
  loading.value = true;
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  const query = searchQuery.value.trim();

  if (!query) {
    items.value = [];
    loading.value = false;
    return;
  }

  timeoutId = setTimeout(async () => {
    try {
      const response = await apiClient(
        `/${props.endpoint}?search=${encodeURIComponent(query)}`,
      );
      items.value = response.data.items;
    } finally {
      loading.value = false;
    }
  }, 300);
};

const select = (option?: OptionType) => {
  if (!option) return;

  model.value = option.value;
  searchQuery.value = option.label;
  items.value = [];
};

</script>
