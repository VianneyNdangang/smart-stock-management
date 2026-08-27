<template>
  <div class="flex flex-col gap-3">
          <BackButton />
    <PageHeader
      :title="batch?.name"
      :subtitle="batch?.description"
      :refresh="
        async () => {
          await store.fetchBatcheProducts(batchId);
        }
      "
      :loading="store.loading"
    />
    <div
      class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-5"
    >
      <DataSommary title="Products" :value="batch?.batchProducts?.total" state="success" />
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
          :records="batch?.batchProducts?.items"
          :headers="header"
          :total="batch?.batchProducts?.total"
          :loading="store.loading"
          :totalPages="batch?.batchProducts?.totalPages"
          :page="batch?.batchProducts?.page"
          :hasNext="batch?.batchProducts?.hasNext"
          :hasPrev="batch?.batchProducts?.hasPrev"
          :changePage="handlePageChange"
        />
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { ref, onMounted, h, computed } from "vue";
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
import { useBatcheProductsStore } from "@/store/batchesStore.ts";
import BackButton from "@/components/backbutton/BackButton.vue";
import { apiClient } from "@/store/api";

const { t } = useI18n()
const router = useRouter();
const route = useRoute()
const batchId = route.params.id as string
const selectedProduct = ref();
const isCreateBatche = ref(false);
const store = useBatcheProductsStore();
const { products } = storeToRefs(store);
const { pagination } = storeToRefs(store);
const batch = ref()



onMounted(async() => {
  batch.value = (await apiClient.get(`batch/${batchId}`)).data
  console.log("batchesbatchesbatches",products.value)
  store.fetchBatcheProducts(batchId);
});

const handlePageChange = async (page: number) => {
  await store.fetchBatcheProducts(batchId, page);
};

const header = computed<TTableheaders[]>(() => {
  if (products.value?.length === 0) {
    return [];
  }
return [
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
        record?.productName ? record?.name : "-",
      ),
    width: "20%",
  },
  // {
  //   textAlign: "left",
  //   accessor: "productName",
  //   name: () => t('stock.columns.productName'),
  //    render: (record: any) =>
  //     h(
  //       Badge,{
  //         type:'primary',
  //         message: record?.totalProducts || '-',
  //       }
  //     ),
  //   width: "auto",
  // },
  {
    textAlign: "left",
    accessor: "units",
    name: () => t('stock.columns.units'),
    render: (record: any) =>
      h(
        Badge,{
          type:'primary',
          message: record?.units || '-',
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
        price: record?.units !== null && record.costPrice !== null
          ? (record?.units * record.costPrice)
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
      h('div',{
        class: "w-40",
      },
    h(ProgressBar, {
        percentage: record?.percentage || 50,
      }),),
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
            selectedProduct.value = record;
            isCreateBatche.value = true;
          },
        }),
      ]),
    width: "auto",
  },
]}
);
</script>
