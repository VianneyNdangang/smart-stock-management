<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      title="Stock Entries"
      subtitle="Manage stock entries and inventory"
      :refresh="
        async () => {
          await store.fetchstock();
        }
      "
      :loading="store.loading"
    />
    <div>
      <DataSommary title="Batches" :value="pagination.total" state="success" />
      <!-- <DataSommary title="Total Administrators" :value="users.filter((u: any)=>u.role === 'admin').length" state="success" />
      <DataSommary title="Total Category Managers" :value="users.filter((u: any)=>u.role === 'CategoryManager').length" state="success" />
      <DataSommary title="Total Foot Workers" :value="users.filter((u: any)=>u.role === 'FootWorker').length" state="success" /> -->
    </div>

    <FilterBar
      searchEndPoint="batch"
      searchProperty="name"
      routeName="stock_detail"
    />
    <div>
      <!-- <LoadingView v-if="" /> -->
      <!-- <div class="flex"> -->
      <DataTable
        title="batches"
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
      <!-- </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, h } from "vue";
import { useI18n } from "vue-i18n";
import PageHeader from "@/components/molecules/PageHeader.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { storeToRefs } from "pinia";
import { useStockStore } from "@/store/stockStore";
import { IconEye } from "@tabler/icons-vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/dataTable/DataTable.vue";
import type { TTableheaders } from "@/components/dataTable/type.ts";
import Badge from "@/components/badge/Badge.vue";
import FormatePrice from "@/components/formatePrice/FormatePrice.vue";
import FilterBar from "@/components/filterBar/FilterBar.vue";

const { t } = useI18n();
const router = useRouter();

// const selectedBatche = ref();
// const isCreateBatche = ref(false);
const store = useStockStore();
const { batches } = storeToRefs(store);
const { pagination } = storeToRefs(store);

// const handleDelete = async () => {
//   loading.value = true;
//   try {
//     await store.deletestock(selectedBatche.value.id);
//     store.fetchstock();
//     toast.show("Operation Effectuée", "success", "MMNNM");
//   } catch (error) {
//     toast.show("Echec de l'operation", "danger", "MMNNM");
//   } finally {
//     loading.value = false;
//   }
// };
onMounted(() => {
  store.fetchstock();
});

const handlePageChange = async (page: number) => {
  await store.fetchstock(page);
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "batchName",
    name: () => t("stock.columns.batchName"),
    render: (record: any) =>
      h(
        "p",
        {
          class: "text-(--text-primary) font-semibold whitespace-nowrap",
        },
        record?.name ? record?.name : "-",
      ),
    width: "30%",
  },
  {
    textAlign: "left",
    accessor: "productName",
    name: () => t("stock.columns.productName"),
    render: (record: any) =>
      h(Badge, {
        type: "primary",
        message: record?.totalProducts || "-",
      }),
    width: "15%",
  },
  // {
  //   textAlign: "left",
  //   accessor: "units",
  //   name: () => t('stock.columns.units'),
  //   render: (record: any) =>
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
    accessor: "price",
    name: () => t("stock.columns.price"),
    render: (record: any) =>
      h(FormatePrice, {
        price: record?.costPrice ? record?.costPrice : "-",
        class: "text-(--text-secondary)",
      }),
    width: "12%",
  },
  {
    textAlign: "left",
    accessor: "stockValue",
    name: () => t("stock.columns.stockValue"),
    render: (record: any) =>
      h(FormatePrice, {
        price: record?.sellingPrice ? record?.sellingPrice : "-",
        class: "text-(--text-primary) font-semibold",
      }),
    width: "12%",
  },
  // {
  //   textAlign: "left",
  //   accessor: "barcode",
  //   name: () => t('stock.columns.barcode'),
  //   render: (record: any) => (record?.barcode ? record?.barcode : "-"),
  //   width: "auto",
  // },
  // {
  //   textAlign: "left",
  //   accessor: "percentage",
  //   name: () => t('stock.columns.progress'),
  //   render: (record: any) =>
  //     // record?.role
  //     h(ProgressBar, {
  //       percentage: record?.percentage || 50,
  //     }),
  //   width: "12%",
  // },
  {
    textAlign: "left",
    accessor: "createdAt",
    name: () => t("stock.columns.createdAt"),
    render: (record: any) =>
      h(FormateDate, {
        date: record.createdAt,
      }),
    width: "15%",
  },
  // {
  //   textAlign: "left",
  //   accessor: "createdAt",
  //   name: () => t('stock.columns.expiredDate'),
  //   render: (record: any) =>
  //     h(FormateDate, {
  //       date: record.expiredDate,
  //     }),
  //   width: "auto",
  // },
  {
    textAlign: "right",
    accessor: "actions",
    name: () => t("stock.columns.actions"),
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconEye, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            router.push({ name: "stock_detail", params: { id: record.id } });
          },
        }),
      ]),
    width: "12%",
  },
];

</script>
