<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      :title="t('menu.warehouse')"
      :subtitle="t('warehouse.subtitle')"
      :refresh="
        async () => {
          await store.fetchWarehouses();
        }
      "
      :loading="store.loading"
    />
    <div
      class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-3"
    >
      <DataSommary
        :title="t('warehouse.summary.total')"
        :value="pagination?.total"
        state="primary"
        :icon="IconBuildingWarehouse"
      />
      <DataSommary
        title="Total Warehouses Level 1"
        :value="warehouses?.length"
        state="warning"
      />
      <DataSommary
        title="Total Warehouses Level 2"
        :value="warehouses?.filter((u: any) => u.level === 2)?.length"
        state="warning"
      />
      <!-- <DataSommary title="Total Foot Workers" :value="Warehouses.filter((u: any)=>u.role === 'FootWorker').length" state="success" /> -->
    </div>
    <FilterBar
      searchEndPoint="warehouse"
      searchProperty="warehouseName"
      routeName="warehouse_detail"
    />
    <div>
      <!-- <LoadingView v-if="" /> -->
      <div class="flex flex-col gap-3">
        <div
          v-if="warehouses?.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-3 w-full"
        >
          <div v-if="store.loading" v-for="i in 20" :key="i">
          </div>
         <div v-for="warehouse in warehouses">
          <WarehouseCard :warehouse="warehouse" />
         </div>
        </div>
        <div v-else class="w-full">
          <EmptyState
            title="No Warehouses found"
            message="There are no Warehouses to display yet. Create a category to get started."
          />
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import PageHeader from "@/components/molecules/PageHeader.vue";
import { IconBuildingWarehouse } from "@tabler/icons-vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { storeToRefs } from "pinia";
import FilterBar from "@/components/filterBar/FilterBar.vue";
import EmptyState from "@/components/empty/EmptyState.vue";
import { useI18n } from "vue-i18n";
import { useWarehousesStore } from "@/store/warehouseStore";
import WarehouseCard from "@/components/card/WarehouseCard.vue";
import { useRSidebarStore } from "@/store/rSideBareStore";

const {t} = useI18n()

const store = useWarehousesStore();
const rSidebarStore = useRSidebarStore()
const { warehouses } = storeToRefs(store);
const {pagination } = storeToRefs(store)

onMounted(async () => {
  await store.fetchWarehouses();
});
onUnmounted(()=>{
  rSidebarStore.handleClose(  )
})

</script>
