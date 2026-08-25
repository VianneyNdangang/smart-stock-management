<template><BackButton />
  <div class="flex flex-col gap-3">
    
    <section class="flex flex-col gap-3">
      <Card>
        <div class="flex flex-col md:flex-row gap-3 w-full">
          <!-- Images -->
          <div>
            <!-- Image principale -->
            <div
              class="border border-(--border) rounded overflow-hidden bg-(--surface)"
            >
              <img
                :src="selectedImage || '/images/glotelho.webp'"
                :alt="product?.productName"
                class="w-full md:w-150 h-auto object-cover"
              />
            </div>

            <!-- Galerie -->
            <div
              v-if="product?.images?.length > 0"
              class="flex gap-3 mt-4 overflow-x-auto"
            >
              <img
                v-for="(image, index) in product.images"
                :alt="`image ` + index"
                :key="index"
                :src="image"
                class="w-24 h-24 rounded-lg border border-(--border) object-cover cursor-pointer hover:border-(--warning) transition"
                @click="selectedImage = image"
              />
            </div>
          </div>

          <!-- Informations -->
          <div class="flex flex-col gap-3 w-full">
            <div>
              <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold mt-3 text-(--text-primary)">
                  {{ product?.productName }}
                </h1>
                <Badge
                  :type="product?.perishable ? 'warning' : 'success'"
                  :message="
                    product?.perishable ? 'Perishable' : 'Non Perishable'
                  "
                />
              </div>
              <p class="font-bold text-xl">
                {{ product?.units }}
              </p>
            </div>

            <div class="flex flex-col justify-end gap-3 h-full w-full">
              <div class="rounded border border-(--border) p-3 max-h-40">
                <p class="text-sm text-(--text-secondary)">Description</p>
                <p class="text-(--text-secondary) mt-2">
                  {{ product?.description || "No description available." }}
                </p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="rounded border border-(--border) p-3">
                  <p class="text-sm text-(--text-secondary)">Category</p>
                  <p class="font-medium">
                    {{ product?.category?.categoryName || '-'}}
                  </p>
                </div>

                <div class="rounded border border-(--border) p-3">
                  <p class="text-sm text-(--text-secondary)">Brand</p>
                  <p class="font-medium">
                    {{ product?.brand?.brandName || '-'}}
                  </p>
                </div>

                <div class="rounded border border-(--border) p-3">
                  <p class="text-sm text-(--text-secondary)">Created</p>
                  <FormateDate :date="product?.createdAt" />
                </div>
                <div class="rounded border border-(--border) p-3">
                  <p class="text-sm text-(--text-secondary)">Update Date</p>
                  <FormateDate :date="product?.updateAt || ''" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div class="flex gap-3 flex-col md:flex-row">
        <!-- Description -->
        <!-- <Card>
          <h2 class="text-xl font-semibold mb-4 text-(--text-primary)">
            Description
          </h2>

          <p class="leading-7 text-(--text-secondary)">
            {{ product?.description || "No description available." }}
          </p>
        </Card> -->

        <!-- Specifications -->
        <Card>
          <h2 class="text-xl font-semibold mb-4 text-(--text-primary)">
            Specifications
          </h2>

          <div v-if="product?.specification" class="grid md:grid-cols-2 gap-3">
            <div class="flex justify-between border-b border-(--border) py-2">
              <span class="font-medium">{{ product.specification }}</span>
            </div>
          </div>

          <p v-else class="text-(--text-secondary)">
            No specifications available.
          </p>
        </Card>
      </div>
    </section>
    <section class="flex flex-col md:flex-row gap-3 items-stretch">
      <div
        class="flex flex-col gap-3 md:w-2/3 w-full lg:w-12/6 justify-between"
      >
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          <DataSommary title="Total categories" :value="5000" state="primary" />
          <DataSommary
            title="Total categories Level 1"
            :value="2000"
            state="warning"
          />
          <DataSommary
            title="Total categories Level 2"
            :value="3000"
            state="warning"
          />
        </div>

        <Card>
          <div class="flex h-100 md:h-100">
            <Spiner size="lg" v-if="loading" />
            <LineChart
              v-else-if="monthlySalesData.values.length > 0"
              title="Evolution des ventes par mois"
              :data="monthlySalesData"
            />
            <EmptyState v-else title="Aucune donnee" message="" />
          </div>
        </Card>
      </div>

      <Card>
        <div class="flex h-100 md:h-122">
          <Spiner size="lg" v-if="loading" />
          <DoughnutChart
            v-else-if="stockByWarehouseData.values.length > 0"
            title="Quantite en stock par magasin"
            :data="stockByWarehouseData"
          />
          <EmptyState v-else title="Aucune donnee" message="" />
        </div>
      </Card>
    </section>

    <section class="flex flex-col md:flex-row gap-3">
      <Card>
        <div class="flex h-100 md:h-100 overflow-auto">
          <Spiner size="lg" v-if="loading" />
          <BarChart
            v-else-if="salesByWarehouseData.values.length > 0"
            title="Evolution des ventes par magasin"
            :data="salesByWarehouseData"
          />
          <EmptyState v-else title="Aucune donnee" message="" />
        </div>
      </Card>
    </section>
  </div>
</template>
<script setup lang="ts">
import BackButton from "@/components/backbutton/BackButton.vue";
import Badge from "@/components/badge/Badge.vue";
import Card from "@/components/card/Card.vue";
import BarChart from "@/components/charts/BarChart.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import EmptyState from "@/components/empty/EmptyState.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import Spiner from "@/components/spiner/Spiner.vue";
import { apiClient } from "@/store/api";
import { useToastStore } from "@/store/toastStore";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref();
const toast = useToastStore();
const stocks = ref([]);
const analysis = ref();
const loading = ref(false);
const selectedImage = ref<string>("");

const loadProduct = async (id: string) => {
  loading.value = true;

  try {
    console.log("🆔 ID :", id);

    console.log("📦 Stock URL :", `/stock/product/${id}`);

    const stockResponse = await apiClient.get(`/stock/product/${id}`);

    console.log("✅ Stock :", stockResponse.data);

    stocks.value = stockResponse.data;

    console.log("📦 Product URL :", `/products/${id}`);

    const productResponse = await apiClient.get(`/products/${id}`);

    console.log("✅ Product :", productResponse.data);

    product.value = productResponse.data;

    selectedImage.value = product.value?.images?.[0] || "";

  } catch (error: any) {
    console.error("❌ Erreur loadProduct :", error);

    console.error("URL :", error?.config?.url);
    console.error("Status :", error?.response?.status);
    console.error("Response :", error?.response?.data);
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) return;
    await loadProduct(newId as string);
  },
  {
    immediate: true,
  },
);

const stockByWarehouseData = computed(() => {
  const data = {
    labels: [] as string[],
    values: [] as number[],
  };
  stocks.value?.forEach((element: any) => {
    data.labels.push(element.warehouseName);
    data.values.push(element.totalUnits);
  });
  return data;
});

const monthlySalesData = {
  labels: [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ],

  values:
    // []
    [
      12500, 15800, 14300, 18700, 22400, 20100, 24500, 26800, 23900, 28100,
      31500, 32500,
    ],
};

const salesByWarehouseData = {
  labels: [
    "Yaoundé Centre",
    "Douala Bonamoussadi",
    "Bafoussam",
    "Garoua",
    "Bamenda",
    "Kribi",
    "Bertoua",
    "Ebolowa",
    "Ngaoundéré",
    "Limbé",
  ],

  values: [852, 1045, 637, 489, 713, 368, 421, 294, 556, 478],
};
</script>
