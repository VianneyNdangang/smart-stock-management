<template>
  <BackButton />
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
                class="w-12 h-12 rounded-lg border border-(--border) object-cover cursor-pointer hover:border-(--warning) transition"
                @click="selectedImage = image"
              />
            </div>
          </div>

          <!-- Informations -->
          <div class="flex flex-col gap-3 w-full">
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between mb-3">
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

              <div>
                <div class="grid grid-cols-2 mb-1">
                  <h1 class="text-lp font-semibold text-(--text-secondary)">
                    {{ "Variant" }}
                  </h1>
                  <div class="">
                    <Select v-model="index" name="items" :options="options" />
                  </div>
                </div>
                <Separator />
                <div class="flex flex-col gap-2 mt-2">
                  <div class="flex justify-between items-center gap-2">
                    <p class="text-(--text-muted)">SKU</p>
                    <span>
                      {{ product?.items[index]?.SKU || "-" }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center gap-2">
                    <p class="text-(--text-muted)">Attribute</p>
                    <span>
                      {{ product?.items[index]?.attribute || "-" }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center gap-2">
                    <p class="text-(--text-muted)">Price</p>
                    <FormatePrice :price="product?.items[index].price" />
                  </div>
                  <div class="flex justify-between items-center gap-2">
                    <p class="text-(--text-muted)">Unit</p>
                    <span>
                      {{ product?.items[index]?.units || "-" }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div class="flex flex-col justify-end gap-3 h-full w-full">
              <div class="rounded border border-(--border) p-3 max-h-40">
                <p class="text-sm text-(--text-secondary)">Description</p>
                <p class="text-(--text-secondary) mt-2">
                  {{ product?.description || "No description available." }}
                </p>
              </div>

              <div class="grid grid-cols-4 gap-3">
                <div class="rounded border border-(--border) p-3">
                  <p class="text-sm text-(--text-secondary)">Category</p>
                  <p class="font-medium">
                    {{ product?.category?.categoryName || "-" }}
                  </p>
                </div>
                <div class="rounded border border-(--border) p-3">
                  <p class="text-sm text-(--text-secondary)">Brand</p>
                  <p class="font-medium">
                    {{ product?.brand?.brandName || "-" }}
                  </p>
                </div>
                <div class="rounded border border-(--border) p-3 max-h-40">
                  <p class="text-sm text-(--text-secondary)">Specifications</p>
                  <p class="text-(--text-secondary) mt-2">
                    {{
                      product?.specification || "No specification available."
                    }}
                  </p>
                </div>
                <div class="rounded border border-(--border) p-3">
                  <p class="text-sm text-(--text-secondary)">Created</p>
                  <FormateDate :date="product?.items[0]?.createdAt" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div class="flex gap-3 flex-col md:flex-row">
        <Card>
          <div class="class flex items-center justify-end w-full">
            <Button
              name="analysing"
              type="button"
              variant="ghost"
              label="Analyse"
              w="46"
              :click="() => handleAnalyst()"
            />
          </div>
          <div
            v-if="messages.length > 0"
            class="class flex flex-col w-full gap-2 transition-all duration-300"
            :class="messages.length > 0 ? `h-full` : `h-0`"
          >
            <AlertMessage
              v-for="item in messages"
              :message="item.message"
              :title="item.title"
              :type="item.type"
            />
          </div>
        </Card>
      </div>
    </section>
    <section class="grid grid-col-1 md:grid-cols-3 gap-3 items-stretch">
      <div class="flex flex-col gap-3 md:col-span-2 justify-between">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
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
        <div class="flex justify-center items-center h-100 md:h-122">
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
        <div class="flex h-100 md:h-100">
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
import AlertMessage from "@/components/alertMessages/AlertMessage.vue";
import BackButton from "@/components/backbutton/BackButton.vue";
import Badge from "@/components/badge/Badge.vue";
import Button from "@/components/button/Button.vue";
import Card from "@/components/card/Card.vue";
import BarChart from "@/components/charts/BarChart.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import EmptyState from "@/components/empty/EmptyState.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import FormatePrice from "@/components/formatePrice/FormatePrice.vue";
import Select from "@/components/select/Select.vue";
import Separator from "@/components/separator/Separator.vue";
import Spiner from "@/components/spiner/Spiner.vue";
import {
  formatAlertMessage,
  type AlertMessageType,
} from "@/helpers/formateData";
import { apiClient } from "@/store/api";
import { computed, ref, unref, watch } from "vue";
import { useRoute } from "vue-router";

/** ---Declarations--- */
const route = useRoute();
// const productId = route.params.id;
/**Datas */
const product = ref();
// const productAttribute = ref();
const stocks = ref([]);
const index = ref<number>(0);
const attributeId = computed(()=>{ return product.value?.items[index.value]?.attributeId});
const salesGraph = ref<any[]>([]);
const selectedImage = ref<string>("");
const messages = ref<AlertMessageType[]>([]);
// const analysis = ref();

const options = computed<{ label: string; value: number }[]>(() => {
  const data = [] as { label: string; value: number }[];
  product.value?.items.forEach((element: any) => {
    data.push({
      label: element.SKU,
      value: product.value?.items.indexOf(element),
    });
  });
  return data;
});

/**Loaders */
const loading = ref(false);
const analysLoading = ref(false);

/** ---Handlers-- */
// const getAttribute = async () => {
//   try {
//     const response = await apiClient({
//       url: `productAttribute`,
//       method: "GET",
//       params: {
//         filter: { id: productId },
//       },
//     });
//     productAttribute.value = response;
//   } catch (error) {}
// };

const loadProduct = async (id: string) => {
  loading.value = true;
  try {
    const productResponse = await apiClient.get(`/products/${id}`);
    product.value = productResponse.data;
    const stockResponse = await apiClient.get(`/stock/product/${id}`);
    stocks.value = stockResponse.data;

    // getAttribute();
    //  = salesResponse.data;

    selectedImage.value = product.value?.images?.[0] || "";
  } catch (error: any) {
  } finally {
    loading.value = false;
  }
};

const handleGetSales = async () => {
  salesGraph.value = (
    await apiClient.get(`products/${unref(attributeId)}/get-graph`)
  ).data;
};

const handleAnalyst = async () => {
  analysLoading.value = true;
  try {
    const response = await apiClient.get(
      `stock-alert/product/${route.params.id}/recalculate`,
    );
    messages.value = response.data.map(formatAlertMessage);
  } finally {
    analysLoading.value = false;
  }
};

/**  Events*/
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

watch(
  () => attributeId.value,
  () => {
    handleGetSales();
  },
  { immediate: true },
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

const monthlySalesData = computed(() => {
  const data = {
    labels: [] as string[],
    values: [] as number[],
  };
  salesGraph.value?.forEach((item: any) => {
    data.labels.push(item.date);
    data.values.push(item.totalQuantity);
  });
  return data;
});

const salesByWarehouseData = computed(() => {
  const data = {
    labels: [] as string[],
    values: [] as number[],
  };
  for (let i = 0; i < salesGraph.value?.length; i++) {
    const index = data.labels.indexOf(salesGraph.value[i]?.warehouseName);
    if (index === -1) {
      data.labels.push(salesGraph.value[i]?.warehouseName);
      data.values.push(salesGraph.value[i]?.totalQuantity);
    } else {
      const quantity = Number(salesGraph.value[i].totalQuantity) || 0;
      data.values[index] += quantity;
    }
  }
  return data;
});
</script>
