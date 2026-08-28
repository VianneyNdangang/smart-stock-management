<template>
  <Card>
    <div class="overflow-auto">
      <div class="min-w-0">
      <div
        class=" w-full flex flex-col md:flex-row items-end justify-between border-b border-(--dorder) pb-2"
      >
        <div class="min-w-sm">
          <p class="text-md md:text-lg font-semibold text-(--text-secondary) w-full">
            {{ t('datatable.listOf') }} {{ totalRecords }} {{ titleLabel }}.
          </p>
          <div v-if="props.deleteUrl" class="flex gap-2 justify-start items-center">
            <Checkbox
              :model-value="props.records?.length === selectedIds.length"
              :label="t('datatable.selectAll')"
              :change="() => toggleAll()"
            />
            <IconTrash
              v-if="selectedIds.length > 0"
              class="text-(--danger)"
              @click="isDeleteData = true"
            />
          </div>
        </div>
        <!-- <div class="flex items-center justify-end gap-2 w-full">
          <div
            class="transition-all duration-300"
            :class="isFilter ? `w-80` : `w-0`"
          >
            <Input
              name="filter"
              :placeholder="t('datatable.filterPlaceholder')"
              type="text"
              v-if="isFilter"
              v-model="filter"
            />
          </div>

          <Button
          name="search"
            :icon="IconSearch"
            :label="t('datatable.search')"
            :click="handleChange"
            variant="ghost"
            type="button"
          />
        </div> -->
      </div>
      <div
        v-if="props.records?.length === 0"
        class="flex items-center justify-center w-full min-h-80"
      >
        <div v-if="props.loading" class="w-full">
        <slot/>
      </div>
        <EmptyState
          v-else
          :title="t('datatable.noData')"
          :message="t('datatable.noData')"
        />
      </div>
      <div v-else class="w-full flex justify-center flex-col overflow-auto">
        <div class="w-full" :style="{ height: props.maxH ? `${props.maxH}px` : '100%' }">
          <table class="min-w-full table-auto w-full">
            <thead class=" sticky text-(--text-secondary) z-20">
              <tr>
                <th
                  v-if="props.deleteUrl"
                  class="border-b-3 border-(--border)"
                  style="width: 1.5%"
                ></th>
                <th
                  v-for="header in props.headers"
                  :key="header.accessor"
                  :class="`whitespace-nowrap text-${header?.textAlign} p-4 border-b-3 border-(--border) whitespace-nowrap`"
                  :style="{ width: header?.width || 'auto' }"
                >
                  {{ headerLabel(header) }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in displayedRecords"
                :key="item.id"
                class="hover:bg-(--hover) h-10"
              >
                <td v-if="props.deleteUrl" class="border-b border-(--border) pl-4">
                  <Checkbox
                    :model-value="selectedIds.includes(item.id)"
                    :change="() => toggleRecord(item.id)"
                  />
                </td>
                <td
                  v-for="header in props.headers"
                  :key="header.accessor"
                  :class="`px-4 py-2 border-b text-${header?.textAlign} text-(--text-muted) border-(--border)`"
                >
                  <component
                    v-if="header?.render && isVNode(header.render(item))"
                    :is="header.render(item)"
                  />

                  <template v-else>
                    {{ header?.render ? header.render(item) : (item[header.accessor] ?? '-') }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->

       <Pagination
        :totalPages="props.totalPages"
        :hasNext="props.hasNext"
        :hasPrev="props.hasPrev"
        :page="props.page"
        @changePage="props.changePage"
      />
    </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<TDatatableProps>(), {
  records: () => [],
  deleteUrl: "",
  loading: false,
  total: 0,
  page: 1,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
});

import { computed, ref, isVNode } from "vue";
import { useI18n } from 'vue-i18n'
import Card from "../card/Card.vue";
// import Button from "../button/Button.vue";
import EmptyState from "../empty/EmptyState.vue";
// import Input from "../input/Input.vue";
// import { IconSearch, IconTrash } from "@tabler/icons-vue";
import Checkbox from "../checkbox/Checkbox.vue";
import type { TDatatableProps } from "./type.ts";
import Pagination from "../pagination/Pagination.vue";
import { IconTrash } from "@tabler/icons-vue";

//Checkbox
const selectedIds = ref<string[]>([]);

const isDeleteData = ref(false);

//tout cocher
const toggleAll = () => {
  if (selectedIds.value.length === props.records?.length) {
    selectedIds.value = [];
  } else {
    props.records.forEach((record: any) => {
      const index = selectedIds.value.indexOf(record?.id);
      if (index === -1) {
        selectedIds.value.push(record.id);
      }
    });
  }
};

//Cocher individuellement
const toggleRecord = (id: string) => {
  const index = selectedIds.value.indexOf(id);
  if (index === -1) {
    selectedIds.value.push(id);
  } else {
    selectedIds.value.splice(index, 1);
  }
};

//  const alerts = computed(() => data.value);

// const isFilter = ref(false);
// const handleChange = () => {
//   isFilter.value = !isFilter.value;
// };
const filter = ref("");

const { t, te } = useI18n();

const titleLabel = computed(() => {
  try {
    const key = props.title as string;
    if (!key) return "";
    return te(key) ? t(key) : key;
  } catch (e) {
    return props.title ?? "";
  }
});

const headerLabel = (header: any) => {
  try {
    if (!header) return '';
    if (typeof header.name === 'function') return header.name();
    return header.name ?? '';
  } catch (e) {
    return header.name ?? '';
  }
}

const displayedRecords = computed(() => filteredRecords.value);
const totalRecords = computed(() => props.total);

const filteredRecords = computed(() => {
  if (!filter.value.trim()) {
    return props.records;
  }

  const search = filter.value.toLowerCase();

  return props.records?.filter((record) =>
    props.headers.some((header) => {
      const value = record[header.accessor];

      return String(value ?? "")
        .toLowerCase()
        .includes(search);
    }),
  );
});

</script>
