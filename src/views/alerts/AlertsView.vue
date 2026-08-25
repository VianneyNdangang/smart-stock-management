<template>
  <div
    class="flex flex-col gap-3 transition-all duration-300"
  >
    <PageHeader
      :title="t('menu.alerts')"
      subtitle="alerts"
      :refresh="
        async () => {
          await alertstore.fetchAlerts();
        }
      "
      :loading="alertstore.loading"
    />
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
          v-if="alerts.length > 0"
          class="grid grid-cols-1 md:grid-cols-1 gap-3 w-full"
        >
          <div v-if="alertstore.loading" v-for="i in 20" :key="i">
            <CategoryCardSkeleton />
          </div>
          <div v-else v-for="alert in alerts">
            <AlertCard :alert="alert"/>
          </div>
        </div>
        <div v-else class="w-full">
          <EmptyState
            title="No categories found"
            message="There are no categories to display yet. Create a category to get started."
          />
        </div>

        <Pagination
          @changePage="handlePageChange"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination.hasNext"
          :hasPrev="pagination?.hasPrev"
        />
      </div>
    </div>
  </div>
  <RightSideBare>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-lg text-(--text-primary)">
        {{ selectedProduct?.productName }}
      </h1>
      <div class="border rounded border-(--border)">
        <img src="#" class="h-50 w-50" />
      </div>
    </div>
  </RightSideBare>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from 'vue-i18n'
// import { usealertstore } from "@/store/alertsStore";
import PageHeader from "@/components/molecules/PageHeader.vue";
import RightSideBare from "@/components/sideBar/RightSideBare.vue";
import { useRouter } from "vue-router";
// import alertsTableSkeleton from "@/components/skeleton/alertsTableSkeleton.vue";
import FilterBar from "@/components/filterBar/FilterBar.vue";
import { useAlertsStore } from "@/store/alertsStore.ts";
import CategoryCardSkeleton from "@/components/skeleton/CategoryCardSkeleton.vue";
import AlertCard from "@/components/card/AlertCard.vue";
import { storeToRefs } from "pinia";
import Pagination from "@/components/pagination/Pagination.vue";
import { connectSocket, socket } from "@/helpers/socket";
import { user_token } from "@/helpers/constant";



const alertes = ref<any[]>([])

if (localStorage.getItem(user_token)) {
    // socket.connect();
    connectSocket();
  }

  socket.on("connect", () => {
    console.log("Connecté au serveur avec succès ! ID:", socket.id);
    
    // Test de l'écouteur du serveur backend :
    socket.emit("join-warehouse", "id_magasin_123");
  });

  socket.on("connect_error", (error) => {
    console.error("Échec de la connexion imposé par le serveur :", error.message);
  });





const alertstore = useAlertsStore();
const router = useRouter();
const {alerts} = storeToRefs(alertstore);
onMounted(async () => {
  await alertstore.fetchAlerts();
  isLoading.value = alertstore.loading;

   // 1. S'assurer que le socket est connecté
  socket.connect()

  // 2. Écouter l'événement 'stock-alert' déclenché par VelocityController.sendEvent
  socket.on('stock-alert', (data:any) => {
    console.log("Nouvelle alerte reçue du backend :", data.message)
    
    // Ajouter l'alerte à votre liste réactive pour l'afficher à l'écran
    alertes.value.push(data.message)
  })

  // alerts.value.map
});


const { pagination } = storeToRefs(alertstore);
const isLoading = ref<boolean>(false);
const selectedProduct = ref();

const { t } = useI18n()

// const newProduct = {
//   label: t('alerts.new'),
//   action: () => (isCreateProduct.value = true),
//   icon: IconPackageImport,
// };


const handlePageChange = async (page: number) => {
  await alertstore.fetchAlerts(page);
};
</script>
