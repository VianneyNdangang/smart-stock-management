<template>
  <div class="flex flex-col gap-5">
    <section>
      <Card>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Images -->
          <div>
            <!-- Image principale -->
            <div
              class="border border-(--border) rounded-xl overflow-hidden bg-(--surface)"
            >
              <img
                :src="selectedImage || '/logo.jpg'"
                :alt="product?.productName"
                class="w-full h-112 object-cover"
              />
            </div>

            <!-- Galerie -->
            <div
              v-if="product?.imageUrls?.length"
              class="flex gap-3 mt-4 overflow-x-auto"
            >
              <img
                v-for="(image, index) in product.imageUrls"
                :key="index"
                :src="image"
                class="w-24 h-24 rounded-lg border border-(--border) object-cover cursor-pointer hover:border-(--warning) transition"
                @click="selectedImage = image"
              />
            </div>
          </div>

          <!-- Informations -->
          <div class="space-y-5">
            <div>
              <Badge
                :type="product?.perishable ? 'danger' : 'success'"
                :message="product?.perishable ? 'Perishable' : 'Non Perishable'"
              />
              <h1 class="text-3xl font-bold mt-3 text-(--text-primary)">
                {{ product?.productName }}
              </h1>

              <p class="text-(--text-secondary) mt-2">
                {{ product?.description || "No description available." }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="rounded border border-(--border) p-4">
                <p class="text-sm text-(--text-secondary)">Category</p>
                <p class="font-medium">
                  {{ product?.category?.categoryName || product?.categoryId }}
                </p>
              </div>

              <div class="rounded border border-(--border) p-4">
                <p class="text-sm text-(--text-secondary)">Brand</p>
                <p class="font-medium">
                  {{ product?.brand?.brandName || product?.brandId }}
                </p>
              </div>

              <div class="rounded border border-(--border) p-4">
                <p class="text-sm text-(--text-secondary)">Created</p>
                <FormateDate :date="product?.createdAt || '-'" />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div class="flex gap-5 flex-col md:flex-row">
        <!-- Description -->
        <Card class="mt-6">
          <h2 class="text-xl font-semibold mb-4 text-(--text-primary)">
            Description
          </h2>

          <p class="leading-7 text-(--text-secondary)">
            {{ product?.description || "No description available." }}
          </p>
        </Card>

        <!-- Specifications -->
        <Card class="mt-6">
          <h2 class="text-xl font-semibold mb-4 text-(--text-primary)">
            Specifications
          </h2>

          <div
            v-if="product?.specifications?.length"
            class="grid md:grid-cols-2 gap-4"
          >
            <div
              v-for="(spec, index) in product.specifications"
              :key="index"
              class="flex justify-between border-b border-(--border) py-2"
            >
              <span class="font-medium">{{ spec.name }}</span>
              <span>{{ spec.value }}</span>
            </div>
          </div>

          <p v-else class="text-(--text-secondary)">
            No specifications available.
          </p>
        </Card>
      </div>
    </section>
    <section class="flex flex-col md:flex-row gap-5">
      <LineChart
        title="Evolution des ventes par mois"
        :data="monthlySalesData"
      />
      <DoughnutChart
        title="Quantite en stock par magasin"
        :data="stockByWarehouseData"
      />
    </section>
    <section class="flex flex-col md:flex-row gap-5">
      <BarChart
        title="Evolution des ventes par magasin"
        :data="salesByWarehouseData"
      />
    </section>
    <section class="flex flex-col gap-2">
      <h1 class="text-lg font-bold text-(--text-primary)">
        Produits similaires
      </h1>
      <p class="text-sm text-(--text-secondary)">
        Liste des produits similaires à ce produit dans la même catégorie.
      </p>
      <div class="flex flex-col md:flex-row gap-5">
        <DataTable
          title="similar products"
          :records="products"
          :headers="header"
          :total="pagination?.total"
          :loading="loading"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination?.hasNext"
          :hasPrev="pagination?.hasPrev"
          @changePage="handlePageChange"
          maxH="100"
        />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import Badge from "@/components/badge/Badge.vue";
import Card from "@/components/card/Card.vue";
import BarChart from "@/components/charts/BarChart.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import DataTable, {
  type TTableheaders,
} from "@/components/dataTable/DataTable.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import ProductProfile from "@/components/profile/ProductProfile.vue";
// import {getSearch } from "@/helpers/utils";
import useFetchData from "@/hooks/request";
import { apiClient } from "@/store/api";
import { useToastStore } from "@/store/toastStore";
import { IconListDetailsFilled } from "@tabler/icons-vue";
import { computed, h, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref();
const toast = useToastStore();
const products = computed(() => data.value);
const stocks = ref();
const page = ref(1);
const selectedImage = ref<string>("");
const filters = ref<any>();
const { data, fetchData, pagination, loading } = useFetchData({
  limit: 25,
  url: "products",
  page,
  filters,
});
// stocks.value = computed(async () => {
//   return (await apiClient.get(`/stock/product/${product.value?.id}`)).data;
// });

// console.log("stocks", stocks);

const handleChangeProduct = async (id: string) => {
  try {
    product.value = (await apiClient.get(`products/${id}`)).data;
    filters.value = {
      categoryId: product.value?.categoryId,
    };
    fetchData();
    selectedImage.value = product.value?.imageUrls?.[0];
  } catch (error) {
    toast.show(
      "Operation echouee",
      "danger",
      "Impossible de recuperer les details du produit",
    );
  }
};
onMounted(async() => {
  handleChangeProduct(route.params.id as string);
  try {
    const response = await apiClient.get(`/stock/product/${route.params.id}`, {
    // params: {
      // page: 1,
      // ...getSearch({
      //   date: '2026',
      //  }),
      // filters: JSON.stringify(
      //   'date=2026',
      // )
    // },
  });
  stocks.value = response.data;
  // const 
  } catch (error) {
    
  }
  

});

const handlePageChange = async (pag: number) => {
  page.value = pag;
  fetchData();
};
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

  values: [
    12500, 15800, 14300, 18700, 22400, 20100, 24500, 26800, 23900, 28100, 31500,
    35200,
  ],
};
const stockByWarehouseData = {
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

  values: [420, 365, 510, 280, 190, 340, 460, 150, 230, 395],
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

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "productName",
    name: "",
    render: (record: any) =>
      h("div", { class: "flex justify-start gap-2 items-center" }, [
        h(ProductProfile, {
          src: record.imageUrl,
          h: "10",
        }),
        h(
          "p",
          {
            class: "text-(--text-primary)",
          },
          record?.productName ? record?.productName : "-",
        ),
      ]),
    width: "auto",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: "",
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconListDetailsFilled, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            handleChangeProduct(record?.id);
            scrollTo({ top: 0, behavior: "smooth" });
          },
        }),
      ]),
    width: "auto",
  },
];
</script>








