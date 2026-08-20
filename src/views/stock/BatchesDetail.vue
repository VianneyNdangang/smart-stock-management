<template>
  <div class="flex flex-col gap-5">
    <PageHeader
      title="Stock Entries"
      subtitle="Manage stock entries and inventory"
      :refresh="
        async () => {
          await store.fetchBatches(batchId);
        }
      "
      :loading="store.loading"
    />
    <div
      class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-5"
    >
      <DataSommary title="Batches" :value="pagination.total" state="success" />
      <!-- <DataSommary title="Total Administrators" :value="users.filter((u: any)=>u.role === 'admin').length" state="success" />
      <DataSommary title="Total Category Managers" :value="users.filter((u: any)=>u.role === 'CategoryManager').length" state="success" />
      <DataSommary title="Total Foot Workers" :value="users.filter((u: any)=>u.role === 'FootWorker').length" state="success" /> -->
    </div>
    <FilterBar
      :searchEndPoint="`batch/${batchId}`"
      searchProperty="batchName"
      routeName="category_detail"
    >
      <CategoriesFilter />
    </FilterBar>
    <div>
      <!-- <LoadingView v-if="" /> -->
      <div class="flex">
        <DataTable
          title="products"
          :records="batches"
          :headers="header"
          :total="pagination?.total"
          :loading="store.loading"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination?.hasNext"
          :hasPrev="pagination?.hasPrev"
          :changePage="handlePageChange"
        />
      </div>
    </div>
  </div>

  <!-- <DeleteData
    :action="
      () => {
        handleDelete();
      }
    "
    :id="selectedBatche?.id"
    :name="selectedBatche?.productName"
    message="Cette action supprimera définitivement cette batch ainsi que les données qui lui sont associées. Cette opération est irréversible. Voulez-vous continuer ?"
    title="Supprimer la batch"
    :isOpen="isDeleteData"
    @close="
      () => {
        isDeleteData = false;
        selectedBatche = null;
      }
    "
  /> -->
</template>
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { useI18n } from 'vue-i18n'
import PageHeader from "@/components/molecules/PageHeader.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { storeToRefs } from "pinia";
import {
  IconEdit,
  IconEye,
} from "@tabler/icons-vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import { useRoute, useRouter } from "vue-router";
import DataTable from "@/components/dataTable/DataTable.vue";
import type { TTableheaders } from "@/components/dataTable/type.ts";
import Badge from "@/components/badge/Badge.vue";
import ProgressBar from "@/components/progressbar/ProgressBar.vue";
import FormatePrice from "@/components/formatePrice/FormatePrice.vue";
import FilterBar from "@/components/filterBar/FilterBar.vue";
import { useBatchesStore } from "@/store/batchesStore.ts";

const { t } = useI18n()
const router = useRouter();
const route = useRoute()
const batchId = route.params.id as string
const selectedBatche = ref();
const isCreateBatche = ref(false);
const store = useBatchesStore();
const { batches } = storeToRefs(store);
const { pagination } = storeToRefs(store);

onMounted(() => {
  store.fetchBatches(batchId);
});

const handlePageChange = async (page: number) => {
  await store.fetchBatches(batchId, page);
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "batchName",
    name: () => t('stock.columns.batchName'),
    render: (record: any) =>
      h(
        "p",
        {
          class: "text-(--text-primary) font-semibold whitespace-nowrap",
        },
        record?.name ? record?.name : "-",
      ),
    width: "20%",
  },
  {
    textAlign: "left",
    accessor: "productName",
    name: () => t('stock.columns.productName'),
     render: (record: any) =>
      h(
        Badge,{
          type:'primary',
          message: record?.totalProducts || '-',
        }
      ),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "units",
    name: () => t('stock.columns.units'),
    render: (record: any) =>
      h(
        Badge,{
          type:'primary',
          message: record?.totalProducts || '-',
        }
      ),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "price",
    name: () => t('stock.columns.price'),
    render: (record: any) =>
     h(FormatePrice,{
        price: record?.costPrice
          ? record?.costPrice
          : "-",
        class: 'text-(--text-secondary)'
  }),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "stockValue",
    name: () => t('stock.columns.stockValue'),
    render: (record: any) =>
      h(FormatePrice,{
        price: record?.sellingPrice
          ? record?.sellingPrice
          : "-",
        class: 'text-(--text-primary) font-semibold'
  }),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "barcode",
    name: () => t('stock.columns.barcode'),
    render: (record: any) => (record?.barcode ? record?.barcode : "-"),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "percentage",
    name: () => t('stock.columns.progress'),
    render: (record: any) =>
      // record?.role
      h(ProgressBar, {
        percentage: record?.percentage || 50,
      }),
    width: "12%",
  },
  {
    textAlign: "left",
    accessor: "createdAt",
    name: () => t('stock.columns.createdAt'),
    render: (record: any) =>
      h(FormateDate, {
        date: record.createdAt,
      }),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "createdAt",
    name: () => t('stock.columns.expiredDate'),
    render: (record: any) =>
      h(FormateDate, {
        date: record.expiredDate,
      }),
    width: "auto",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: () => t('stock.columns.actions'),
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconEye, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            router.push({ name: "batch_detail", params: { id: record?.id } });
          },
        }),
        h(IconEdit, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            selectedBatche.value = record;
            isCreateBatche.value = true;
          },
        }),
      ]),
    width: "auto",
  },
];
</script>
