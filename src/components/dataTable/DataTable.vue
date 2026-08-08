<template>
  <Card>
    <!-- <TableSkeleton />  -->

    <div
      class="w-full flex items-end justify-between border-b border-(--dorder) pb-2"
    >
      <p class="text-lg font-semibold text-(--text-secondary) w-full">
        List of {{ totalRecords }} {{ title }}.
      </p>
      <div class="flex items-center justify-end gap-2 w-full">
        <div
          class="transition-all duration-300"
          :class="isFilter ? `w-80` : `w-0`"
        >
          <Input
            name="filter"
            placeholder="Search . . ."
            type="text"
            v-if="isFilter"
            v-model="filter"
          />
        </div>

        <Button
          :icon="IconSearch"
          label="Filter"
          :click="handleChange"
          variant="ghost"
          type="button"
        />
      </div>
    </div>
    <div
      v-if="props.records?.length === 0"
      class="flex items-center justify-center w-full min-h-80"
    >
      <Spiner v-if="loading" size="lg" />
      <EmptyState
        v-else
        title="Aucune Donnée"
        message="Aucune donnée de ce tableau n'a été trouvé"
      />
    </div>
    <!-- <div class="w-full flex justify-center flex-col"> -->
    <div
      v-else
      class=" overflow-auto "
      :class="maxH ? `h-${maxH}` : `full`"
    >
      <table class="w-full table-fixed">
        <thead class="text-(--text-secondary)">
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.accessor"
              :class="`whitespace-nowrap text-${header?.textAlign} p-4 border-b-3 border-(--border)`"
              :style="{ width: header?.width || 'auto' }"
            >
              {{ header?.name }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in displayedRecords"
            :key="item.id"
            class="hover:bg-(--hover) h-10"
          >
            <td
              v-for="header in props.headers"
              :key="header.accessor"
              :class="`px-4 py-2 border-b text-${header?.textAlign} text-(--text-muted) border-(--border)`"
            >
              <component
                v-if="isVNode(header?.render(item))"
                :is="header?.render(item)"
              />

              <template v-else>
                {{ header?.render(item) }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
    </div>
    <!-- </div> -->
    <div class="flex items-center justify-between mt-5">
      <p class="text-sm text-(--text-muted)">
        Page {{ currentPage }} sur {{ totalPages }}
      </p>

      <div class="flex gap-2" v-if="totalPages > 1 && records?.length > 1">
        <Button
          :click="
            () => {
              changePage(props?.page - 1);
            }
          "
          :icon="ChChevronLeft"
          type="button"
          variant="ghost"
          :disabled="!props.hasPrev"
        />
        <div class="flex gap-2 overflow-auto">
          <button
            v-for="(page, index) in pages"
            :key="`${page}-${index}`"
            :disabled="page === '...'"
            @click="typeof page === 'number' && changePage(page)"
            :class="[
              'px-3 py-1 rounded border',
              page === currentPage
                ? 'bg-(--background) text-(--secondary) border-(--warning)'
                : 'border-(--border)',
              page === '...' && 'cursor-default border-none',
            ]"
          >
            {{ page }}
          </button>
        </div>
        <Button
          :click="
            () => {
              changePage(currentPage + 1);
            }
          "
          :icon="ChChevronRight"
          type="button"
          variant="ghost"
          :disabled="!props.hasNext"
        />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { isVNode } from "vue";
import Card from "../card/Card.vue";
import Button from "../button/Button.vue";
import EmptyState from "../empty/EmptyState.vue";
import Spiner from "../spiner/Spiner.vue";
import Input from "../input/Input.vue";
import { IconSearch } from "@tabler/icons-vue";
import { ChChevronLeft, ChChevronRight } from "@kalimahapps/vue-icons";

export type TTableheaders = {
  textAlign: "left" | "center" | "right";
  accessor: string;
  name: string;
  render: (param: any) => any;
  width: '10%' | '12%' | '15%' | '20%' | '25%' | '30%' | 'auto' ;
};

export type TDatatableProps = {
  headers: TTableheaders[];
  records?: any[];
  title: string;
  loading?: boolean;
  maxH?: string;
  page: any;
  total?: number;
  totalPages: any;
  hasNext?: boolean;
  hasPrev?: boolean;
};
const props = withDefaults(defineProps<TDatatableProps>(), {
  records: () => [],
  loading: false,
  total: 0,
  page: 1,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
});

const currentPage = computed(() => props.page);

const isFilter = ref(false);
const handleChange = () => {
  isFilter.value = !isFilter.value;
};
const filter = ref("");

const emit = defineEmits<{
  (e: "changePage", page: number): void;
}>();

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

// Génération des numéros de pages
const pages = computed(() => {
  const total = props.totalPages;
  const current = props.page;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const result: (number | string)[] = [];

  // Toujours afficher la première page
  result.push(1);

  // Ajouter "..." si on est loin du début
  if (current > 4) {
    result.push("...");
  }

  // Pages autour de la page courante
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  // Ajouter "..." si on est loin de la fin
  if (current < total - 3) {
    result.push("...");
  }

  // Toujours afficher la dernière page
  result.push(total);

  return result;
});

function changePage(page: number) {
  emit("changePage", page);
}

watch(filter, () => {
  emit("changePage", 1);
});
</script>
