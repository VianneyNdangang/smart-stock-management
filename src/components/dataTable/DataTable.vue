<template>
  <Card>
    <!-- <TableSkeleton />  -->

    <div class="w-full flex items-end justify-between border-b border-(--dorder) pb-2">
<p
      class="text-lg font-semibold text-(--text-secondary) w-full"
    >
      List of {{ totalRecords }} {{ title }}.
    </p>
    <div class="flex items-center justify-end gap-2 w-full">
      <div class=" transition-all duration-300"
      :class="isFilter? `w-80`: `w-0`"
      >
        <Input name="filter" placeholder="Search . . ." type="text" v-if="isFilter" v-model="filter" />
      </div>
      
    <Button :icon="IconSearch" label="Filter" :click="handleChange" variant="ghost" type="button"/>
    </div>
    </div>
    <div
      v-if="props.records.length === 0"
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
      <div v-else class="h-full overflow-auto max-h-100">
        <table class="w-full">
          <thead class="h-10 text-(--text-secondary)">
            <tr>
              <th
                v-for="header in props.headers"
                :key="header.accessor"
                :class="`whitespace-nowrap text-${header?.textAlign} px-3 py-4 max-w-${header?.width || 'auto'} border-b border-(--border)`"
              >
                {{ header?.name }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in paginatedRecords"
              :key="item.id"
              class="hover:bg-(--hover) h-10"
            >
              <td
                v-for="header in props.headers"
                :key="header.accessor"
                :class="`px-3 py-2 border-b text-${header?.textAlign} text-(--text-third) border-(--border)`"
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
    <!-- </div> --><div class="flex items-center justify-between mt-5">
          <p class="text-sm text-(--text-third)">
            Page {{ currentPage }} sur {{ totalPages }}
          </p>

          <div class="flex gap-2">
            <Button
              :click="
                () => {
                  changePage(currentPage - 1);
                }
              "
              label="Previous"
              type="button"
              variant="ghost"
              :disabled="currentPage === 1"
            />

            <!-- </Button> -->

            <button
              v-for="page in pages"
              :key="page"
              @click="changePage(page)"
              :class="[
                'px-3 py-1 rounded border',
                page === currentPage
                  ? 'bg-(--primary) text-white'
                  : 'border-(--border)',
              ]"
            >
              {{ page }}
            </button>

            <Button
              :click="
                () => {
                  changePage(currentPage + 1);
                }
              "
              label="Next"
              type="button"
              variant="ghost"
              :disabled="currentPage === totalPages"
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
// import TableSkeleton from "../skeleton/TableSkeleton.vue";
import Spiner from "../spiner/Spiner.vue";
import Input from "../input/Input.vue";
import { IconSearch } from "@tabler/icons-vue";

export type TTableheaders = {
  textAlign: "left" | "right" | "center";
  accessor: string;
  name: string;
  render: (param: any) => any;
  width?: "28" | "32" | "36" | "38" | "40" | "44" | "auto";
};

export type TDatatableProps = {
  headers: TTableheaders[];
  records: any[];
  title: string;
  loading?: boolean;

  itemsperPage?: number;
  page?: number;
};

const props = defineProps<TDatatableProps>();
  const isFilter = ref(false)
const handleChange = ()=>{
  isFilter.value = !isFilter.value
}
const filter = ref("")

const emit = defineEmits<{
  (e: "changePage", page: number): void;
}>();

const currentPage = ref(props.page || 1);

const itemsPerPage = computed(() => props.itemsperPage || 20);

const totalRecords = computed(() => filteredRecords.value.length);

const totalPages = computed(() =>
  Math.ceil(totalRecords.value / itemsPerPage.value),
);
const filteredRecords = computed(()=> {
  if (!filter.value.trim()){
    return props.records;
  }

  const search = filter.value.toLowerCase();

  return props.records.filter((record) =>
props.headers.some((header) => {
  const value = record[header.accessor];

  return String(value ?? "")
  .toLowerCase()
  .includes(search);
}))
})
const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;

  return filteredRecords.value.slice(start, start + itemsPerPage.value);
});

// Génération des numéros de pages
const pages = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

function changePage(page: number) {
  if (page < 1 || page > totalPages.value) return;

  currentPage.value = page;

  emit("changePage", page);
}

watch(filter, () => {
  currentPage.value = 1;
})

// Filtre

</script>
