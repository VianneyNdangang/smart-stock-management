<template>
  <div class="relative flex w-full flex-col gap-2">
    <InputGroup
      v-model="searchQuery"
      :placeholder="t('datatable.filterPlaceholder')"
      :label="t('datatable.search')"
      :icon="IconSearch"
      @input="onInput"
      :loading="loading"
      :click="
        () => {
          if (searchQuery === '') {
            return;
          } else {
            handleSearch(query);
          }
        }
      "
    />

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div
        v-if="searchQuery !=''"
        class="absolute z-100 left-0 top-full mt-2 w-full max-h-96 bg-(--card) shadow-md overflow-scroll"
      >
        <Card>
          <div
          v-if="items.length > 0"
            v-for="item in items"
            :key="item.id"
            class="group flex w-full cursor-pointer items-center gap-3 border-b border-(--border) px-3 py-2.5 transition-all duration-200 last:border-b-0 hover:translate-x-1 hover:bg-(--hover)"
            @click="() => handleNavigate(item?.id)"
          >
            <span
              class="truncate transition-colors duration-200 group-hover:text-(--primary)"
            >
              {{ item[props.property] }}
            </span>
          </div>
          <div v-else-if="loading === false" class="w-full flex justify-center items-center text-(--text-muted)">
       {{ 'Donnee introuvable' }}
          </div>
        </Card>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputGroup from "../input/InputGroup.vue";
import { IconSearch } from "@tabler/icons-vue";
import Card from "../card/Card.vue";
import { apiClient } from "@/store/api.ts";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  endpoint: string;
  property: string;
  routeName: string;
}>();

const router = useRouter();
const searchQuery = ref("");
const query = ref("");
const items = ref<any[]>([]);
const loading = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | null = null;
const { t } = useI18n();

const handleSearch = async (query: any) => {
  loading.value = true;
  try {
    const response = await apiClient(
      `/${props.endpoint}?search=${encodeURIComponent(query)}`,
    );
    items.value = response.data.items;
  } finally {
    loading.value = false;
  }
};

const onInput = () => {
  loading.value = true;
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  query.value = searchQuery.value.trim();

  if (!searchQuery.value.trim()) {
    items.value = [];
    loading.value = false;
    return;
  }

  timeoutId = setTimeout(async () => {
    await handleSearch(searchQuery.value.trim());
  }, 1000);
};
const handleNavigate = (param: string) => {
  router.push({ name: props.routeName, params: { id: param } });
  items.value = [];
  searchQuery.value = "";
};
</script>
