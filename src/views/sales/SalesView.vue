<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      :title="t('menu.sales')"
      subtitle="Manage stock entries and inventory"
      :refresh="
        async () => {
          await store.fetchOrders();
        }
      "
      :new="newBatche"
      :loading="store.loading"
    />
    <div
      class="flex justify-center items-center flex-col md:flex-row gap-3"
    >
      <DataSommary :title="t('sales.summary.orders')" :value="pagination.total" state="primary" />
      <DataSommary :title="t('sales.summary.pending')" :value="pagination.total" state="warning" />
      <DataSommary :title="t('sales.summary.completed')" :value="pagination.total" state="success" />
      <DataSommary :title="t('sales.summary.cancelled')" :value="pagination.total" state="danger" />
    </div>
    <FilterBar
      searchEndPoint="batch"
      searchProperty="batchName"
      routeName="category_detail"
    >
    </FilterBar>
    <div>
      <!-- <LoadingView v-if="" /> -->
        <DataTable
          :title="t('menu.sales')"
          :records="orders"
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
</template>
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { useI18n } from "vue-i18n";
import PageHeader from "@/components/molecules/PageHeader.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { storeToRefs } from "pinia";
import { IconEye, IconPackageImport } from "@tabler/icons-vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/dataTable/DataTable.vue";
import type { TTableheaders } from "@/components/dataTable/type.ts";
import Badge from "@/components/badge/Badge.vue";
import FilterBar from "@/components/filterBar/FilterBar.vue";
import { useSalesStore } from "@/store/salesSotre.ts";
import { formatStatus } from "@/helpers/formateData";

const isCreateUser = ref(false);
const { t } = useI18n();
const newBatche = {
  label: t("stock.summary.batches"),
  action: () => (isCreateUser.value = true),
  icon: IconPackageImport,
};
const router = useRouter();

const store = useSalesStore();
const { orders } = storeToRefs(store);
const { pagination } = storeToRefs(store);

onMounted(() => {
  store.fetchOrders();
});

const handlePageChange = async (page: number) => {
  await store.fetchOrders(page);
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "number",
    name: () => t("sales.columns.number"),
    render: (record: any) =>
      h(
        "p",
        {
          class: "text-(--text-primary) font-semibold",
        },
        record?.number ? record?.number : "-",
      ),
    width: "30%",
  },
  {
    textAlign: "left",
    accessor: "warehouseName",
    name: () => t("sales.columns.warehouseName"),
    render: (record: any) =>
      record?.warehouseName ? record?.warehouseName : "-",
    width: "10%",
  },
  {
    textAlign: "left",
    accessor: "status",
    name: () => t("sales.columns.status.title"),
    render: (record: any) =>
      h(Badge, {
        type:formatStatus(record?.status, t)?.color,
        message: formatStatus(record?.status, t )?.text|| "-",
      }),
    width: "10%",
  },
  // {
  //   textAlign: "left",
  //   accessor: "price",
  //   name: () => t('stock.columns.price'),
  //   render: (record: any) =>
  //    h(FormatePrice,{
  //       price: record?.costPrice
  //         ? record?.costPrice
  //         : "-",
  //       class: 'text-(--text-secondary)'
  // }),
  //   width: "auto",
  // },
  // {
  //   textAlign: "left",
  //   accessor: "stockValue",
  //   name: () => t('stock.columns.stockValue'),
  //   render: (record: any) =>
  //     h(FormatePrice,{
  //       price: record?.sellingPrice
  //         ? record?.sellingPrice
  //         : "-",
  //       class: 'text-(--text-primary) font-semibold'
  // }),
  //   width: "auto",
  // },
  {
    textAlign: "left",
    accessor: "",
    name: () => t("sales.columns.createby"),
    render: (record: any) =>
      record?.creator ? record?.creator?.userName : "-",
    width: "12%",
  },
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
    textAlign: "left",
    accessor: "createdAt",
    name: () => t("sales.columns.createdAt"),
    render: (record: any) =>
      h(FormateDate, {
        date: record.createdAt,
      }),
    width: "10%",
  },
  // {
  //           "id": "6a7eff59c23477ff03d00ff7",
  //           "warehouseId": "6a7eff06c23477ff03cb950e",
  //           "status": "pending",
  //           "createdAt": "2026-08-14T05:33:00.710Z",
  //           "creator": {
  //               "userName": "mylene_wiza47",
  //               "id": "6a7eff06c23477ff03cb91b5"
  //           }
  //       },
  {
    textAlign: "right",
    accessor: "actions",
    name: () => t("stock.columns.actions"),
    render: (record: any) =>
      h("span", { class: "flex justify-end" }, [
        h(IconEye, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            router.push({ name: "batch_detail", params: { id: record?.id } });
          },
        })
      ]),
    width: "auto",
  },
];
</script>
