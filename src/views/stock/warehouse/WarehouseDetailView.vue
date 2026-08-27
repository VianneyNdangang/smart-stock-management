<template>
  <BackButton />
  <div class="flex gap-3">
    <div
      class="flex flex-col gap-3 w-full"
      :class="rSidebarStore.isSidebar ? `pl-20` : ``"
    >
      <div
        class="group relative w-full overflow-hidden rounded-(--radius) border border-(--border) bg-(--card) p-3"
      >
        <!-- Header -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex min-w-0 items-center gap-3">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-(--primary)/10 text-(--primary)"
            >
              <IconBuildingWarehouse size="23" stroke="1.7" />
            </div>

            <div class="min-w-0">
              <h3
                class="truncate font-semibold text-(--text-primary)"
                :title="warehouse?.warehouseName"
              >
                {{ warehouse?.warehouseName }}
              </h3>

              <div
                class="mt-1 flex items-center gap-1.5 text-xs text-(--text-muted)"
              >
                <IconMapPin size="14" />
                <span class="truncate">
                  {{ warehouse?.position }}
                </span>
              </div>
            </div>
          </div>
          <div class="mt-3 flex items-center gap-3">
            <Profile h="9" :name="warehouse?.creator?.userName" />

            <div class="min-w-0">
              <p class="text-xs text-(--text-muted)">Created by</p>

              <p
                class="truncate text-sm font-medium text-(--text-primary)"
                :title="warehouse?.creator?.userName"
              >
                {{ warehouse?.creator?.userName }}
              </p>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="my-4 h-px bg-(--border)" />

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-md p-3">
            <div
              class="mb-1 flex items-center gap-1.5 text-xs text-(--text-muted)"
            >
              <IconMap size="14" />
              <span>Region</span>
            </div>

            <p
              class="truncate text-sm font-medium text-(--text-primary)"
              :title="warehouse?.region"
            >
              {{ warehouse?.region }}
            </p>
          </div>
        </div>
        <div class="flex justify-between">
          <div class="rounded-md p-3">
            <div
              class="mb-1 flex items-center gap-1.5 text-xs text-(--text-muted)"
            >
              <IconCalendar size="14" />
              <span>Created</span>
              <FormateDate
                class="text-(--text-primary)"
                :date="warehouse?.createdAt"
              />
            </div>
          </div>
        </div>
      </div>
      <DataTable
        :title="t('menu.products')"
        :records="stocks"
        :headers="header"
        :total="stocks.length"
        :loading="stockStore.loading"
        :totalPages="pagination?.totalPages"
        :page="pagination?.page"
        :hasNext="pagination?.hasNext"
        :hasPrev="pagination?.hasPrev"
        :changePage="handlePageChange"
      >
        <ProductsTableSkeleton />
      </DataTable>
    </div>
    <div class="w-200 pt-15">
      <div class="sticky top-33 w-full">
        <Card>
          <p
            class="truncate font-semibold text-(--text-secondary) flex gap-2 py-3"
          >
            <IconBell stroke="1.5" class="text-(--text-muted)"/> <span>Alerts</span>
          </p>
          <div class="h-140 overflow-scroll scrollbar-none p-1 bg-(--surface)">
            <div v-if="alerts.length > 0" class="flex flex-col gap-2 max-h-170">
              <div
                v-for="(message, index) in formattedAlerts"
                @click="
                  () => {
                    selectedAlert = message;
                    isAlertDetail = true;
                  }
                "
              >
                <AlertMessage
                  :key="index"
                  :type="message.type"
                  :title="message.title"
                  :message="message.message"
                  :closable="false"
                />
              </div>
            </div>
            <Spiner size="lg" v-else-if="alertStore.loading" />
            <EmptyState title="Aucune alertes" message="" v-else />
          </div>
        </Card>
      </div>
    </div>
  </div>
  <AlertDetail
    :alert="selectedAlert"
    :isOpen="isAlertDetail"
    @close="
      () => {
        isAlertDetail = false;
        selectedAlert = null;
      }
    "
  />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed, h, onMounted, onUnmounted, ref } from "vue";
// import { useToastStore } from "@/store/toastStore";
import { apiClient } from "@/store/api";
import DataTable from "@/components/dataTable/DataTable.vue";
import ProductsTableSkeleton from "@/components/skeleton/ProductsTableSkeleton.vue";
import {
  IconBell,
  IconBuildingWarehouse,
  IconCalendar,
  IconEye,
  IconMap,
  IconMapPin,
} from "@tabler/icons-vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import Badge from "@/components/badge/Badge.vue";
import type { TTableheaders } from "@/components/dataTable/type";
// import useFetchData from "@/hooks/request";
import Profile from "@/components/profile/Profile.vue";
import { useRSidebarStore } from "@/store/rSideBareStore";
import { useAlertsStore } from "@/store/alertsStore";
import { storeToRefs } from "pinia";
import AlertDetail from "./AlertDetail.vue";
import { useWarehouseStockStore } from "@/store/warehouseStore.ts";
import Card from "@/components/card/Card.vue";
import BackButton from "@/components/backbutton/BackButton.vue";
import EmptyState from "@/components/empty/EmptyState.vue";
import Spiner from "@/components/spiner/Spiner.vue";
import {
  formatAlertMessage,
  type AlertMessageType,
} from "@/helpers/formateData.ts";
import AlertMessage from "@/components/alertMessages/AlertMessage.vue";
// import ProductProfile from '@/components/profile/ProductProfile.vue';

const stockStore = useWarehouseStockStore();
const { t } = useI18n();
const route = useRoute();
const warehouseId = route.params.id as string;
const rSidebarStore = useRSidebarStore();
const router = useRouter();
const warehouse = ref();
// const toast = useToastStore();
const alertStore = useAlertsStore();
// const stocks = computed(() => {return stockStore.stocks})

const { stocks } = storeToRefs(stockStore);
const { pagination } = storeToRefs(stockStore);
const { alerts } = storeToRefs(alertStore);
const selectedAlert = ref();
const isAlertDetail = ref(false);

const formattedAlerts = computed<AlertMessageType[]>(() => {
  // return alerts.value
  return alerts.value.map(formatAlertMessage);
});

const handleChangecategory = async (id: string) => {
  try {
    const items = (await apiClient.get(`/warehouse/${id}`)).data;
    warehouse.value = items;
  } catch (error) {}
};
onMounted(async () => {
  handleChangecategory(warehouseId);
  alertStore.fetchAlerts(undefined, warehouseId);
  stockStore.fetchWarehouseStock(warehouseId);
  console.log("stocksstocksstocks", stocks);
});
onUnmounted(() => {
  rSidebarStore.handleClose();
});
const handlePageChange = async (page: number) => {
  await alertStore.fetchAlerts(page, warehouseId);
};

const header = computed<TTableheaders[]>(() => {
  if (stocks.value.length === 0) {
    return [];
  }

  return [
    {
      textAlign: "left",
      accessor: "productName",
      name: () => t("products.columns.productName"),

      render: (record: any) =>
        h(
          "div",
          {
            class:
              "flex flex-col justify-start gap-1 items-start w-full whitespace-nowrap",
          },
          [
            h(
              "p",
              {
                class: "text-(--text-primary) text-md font-bold",
              },
              record?.productName || "-",
            ),

            h(
              "p",
              {
                class: "text-(--text-secondary) text-sm",
              },
              record?.SKU || "-",
            ),
          ],
        ),

      width: "20%",
    },

    {
      textAlign: "left",
      accessor: "units",
      name: () => t("products.columns.units"),

      render: (record: any) =>
        h(Badge, {
          type: "primary",
          message: record?.availableUnits || "-",
        }),

      width: "auto",
    },

    {
      textAlign: "left",
      accessor: "productBrandName",
      name: () => t("products.columns.brand"),

      render: (record: any) =>
        record?.brand?.productBrandName ? record.brand.productBrandName : "-",

      width: "auto",
    },

    {
      textAlign: "left",
      accessor: "catedoryName",
      name: () => t("products.columns.category"),

      render: (record: any) =>
        record?.category?.categoryName ? record.category.categoryName : "-",

      width: "auto",
    },

    {
      textAlign: "left",
      accessor: "perishable",
      name: () => t("products.columns.variant"),

      render: (record: any) =>
        h(Badge, {
          type: record?.perishable ? "warning" : "success",
          message: record?.perishable ? "Perishable" : "Non Perishable",
        }),

      width: "auto",
    },

    {
      textAlign: "left",
      accessor: "createdAt",
      name: () => t("products.columns.createdAt"),

      render: (record: any) =>
        h(FormateDate, {
          date: record?.createdAt || "-",
        }),

      width: "auto",
    },

    // {
    //   textAlign: "left",
    //   accessor: "creator",
    //   name: () => t("products.columns.creator"),

    //   render: (record: any) =>
    //     record?.creator?.userName ? record.creator.userName : "-",

    //   width: "auto",
    // },

    {
      textAlign: "right",
      accessor: "actions",
      name: () => t("products.columns.actions"),

      render: (record: any) =>
        h(
          "div",
          {
            class: "flex justify-end gap-2",
          },
          [
            h(IconEye, {
              size: 18,
              class: "cursor-pointer text-(--text-primary) hover:text-blue-700",

              onClick: () => {
                router.push({
                  name: "product_detail",
                  params: {
                    id: record?.id,
                  },
                });
              },
            }),
          ],
        ),

      width: "auto",
    },
  ];
});
</script>
