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
      :loading="store.loading"
    />
    <div class="flex justify-center items-center flex-col md:flex-row gap-3">
      <DataSommary
        :title="t('sales.summary.orders')"
        :value="pagination.total"
        state="primary"
        :icon="IconShoppingCart"
      />
      <DataSommary
        :title="t('sales.summary.pending')"
        :value="pagination.total"
        state="warning"
        :icon="IconClock"
      />
      <DataSommary
        :title="t('sales.summary.completed')"
        :value="pagination.total"
        state="success"
        :icon="IconCircleCheck"
      />
      <DataSommary
        :title="t('sales.summary.cancelled')"
        :value="pagination.total"
        state="danger"
        :icon="IconCircleX"
      />
    </div>
    <FilterBar
      searchEndPoint="batch"
      searchProperty="batchName"
      routeName="category_detail"
    >
      <SalesFilter />
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
import { onMounted, h } from "vue";
import { useI18n } from "vue-i18n";
import PageHeader from "@/components/molecules/PageHeader.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { storeToRefs } from "pinia";
import {
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconEye,
  IconShoppingCart,
} from "@tabler/icons-vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/dataTable/DataTable.vue";
import type { TTableheaders } from "@/components/dataTable/type.ts";
import Badge from "@/components/badge/Badge.vue";
import FilterBar from "@/components/filterBar/FilterBar.vue";
import { useSalesStore } from "@/store/salesSotre.ts";
import { formatStatus } from "@/helpers/formateData";
import SalesFilter from "./SalesFilter.vue";

const { t } = useI18n();

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
        [
          h(
            "span",
            {
              class: "text-(--text-secondary)",
            },
            "N° ",
          ),
          record?.orderNumber || "-",
        ],
      ),

    width: "30%",
  },
  {
    textAlign: "left",
    accessor: "warehouseName",
    name: () => t("sales.columns.warehouseName"),
    render: (record: any) =>
      h(
        "p",
        {
          class: "text-(--text-secondary) font-semibold whitespace-nowrap",
        },
        record?.warehouse?.warehouseName
          ? record?.warehouse?.warehouseName
          : "-",
      ),
    width: "10%",
  },
  {
    textAlign: "left",
    accessor: "status",
    name: () => t("sales.columns.status.title"),
    render: (record: any) =>
      h(Badge, {
        type: formatStatus(record?.status, t)?.color,
        message: formatStatus(record?.status, t)?.text || "-",
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
            router.push({ name: "sale_detail", params: { id: record?.id } });
          },
        }),
      ]),
    width: "10%",
  },
];
</script>
