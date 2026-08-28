<template>
  <div
    class="flex flex-col gap-3 transition-all duration-300"
  >
    <!-- <PageHeader
      :title="t('menu.alerts')"
      subtitle="alerts"
      :refresh="
        async () => {
          await alertstore.fetchAlerts();
        }
      "
      :loading="alertstore.loading"
    /> -->
    <div
      class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-3"
    >
      <!-- <DataSommary
        :title="t('alerts.summary.total')"
        :value="pagination?.total"
        state="primary"
        :icon="IconAnalyze"
      /> -->
      <!-- <DataSommary
        :title="t('alerts.summary.nonPerishable')"
        :value="(pagination?.totalalerts ?? 0) - (pagination?.totalPerishables ?? 0)"
        state="success"
        :icon="IconPackageImport"
      /> -->
      <!-- <DataSommary
        :title="t('alerts.summary.perishable')"
        :value="pagination?.totalPerishables"
        state="warning"
        :icon="IconFlask"
      /> -->
    </div>
    <FilterBar
      searchEndPoint="alerts"
      searchProperty="productName"
      routeName="product_detail"
    >
    </FilterBar>
    <div>


      <div class="flex flex-col gap-3">
        <div
          v-if="alertes.length > 0"
          class="grid grid-cols-1 md:grid-cols-1 gap-3 w-full"
        >
          <div v-for="alert in alertes">
            <AlertCard :alert="alert"/>
          </div>
        </div>
        <div v-else class="w-full h-100">
          <EmptyState
            title="No alerts found"
            message=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// import { useI18n } from 'vue-i18n'
// import { usealertstore } from "@/store/alertsStore";
// import PageHeader from "@/components/molecules/PageHeader.vue";
// import RightSideBare from "@/components/sideBar/RightSideBare.vue";
// import alertsTableSkeleton from "@/components/skeleton/alertsTableSkeleton.vue";
import FilterBar from "@/components/filterBar/FilterBar.vue";
import { useAlertsStore } from "@/store/alertsStore.ts";
// import CategoryCardSkeleton from "@/components/skeleton/CategoryCardSkeleton.vue";
import AlertCard from "@/components/card/AlertCard.vue";
// import { storeToRefs } from "pinia";
// import Pagination from "@/components/pagination/Pagination.vue";
import { connectSocket, socket } from "@/helpers/socket";
// import { user_token } from "@/helpers/constant";
import EmptyState from "@/components/empty/EmptyState.vue";
// import { computed } from "vue";



const alertes = ref<any[]>([])
const alertstore = useAlertsStore();
// const router = useRouter();
// const {alerts} = storeToRefs(alertstore);
onMounted(async () => {
  // await alertStore.fetchAlerts()
  
  connectSocket();

  socket.on("peak-sale-candidates", (data) => {
  // alertes.value = data;
  alertes.value = data

  console.log("peak-sale-candidates :", data);
});
});

onUnmounted(() => {
  socket.off("connect");
});


// const { pagination } = storeToRefs(alertstore);
// const isLoading = ref<boolean>(false);

// const { t } = useI18n()

// const handlePageChange = async (page: number) => {
//   await alertstore.fetchAlerts(page);
// };
</script>
