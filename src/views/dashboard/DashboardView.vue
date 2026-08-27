
<template>
  <div class="flex flex-col gap-5">
    <PageHeader
      title="Dashboard"
      subtitle="Get an overview of your activities and key performance indicators."
    />
    <section
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"
    >
      <DataSommary
        title="Commandes aujourd'hui"
        :value="10"
        state="primary"
        :icon="IconShoppingCart"
      />

      <DataSommary
        title="Stock total"
        :value="10"
        state="success"
        :icon="IconPackages"
      />

      <DataSommary
        title="Produits en rupture"
        :value="10"
        state="warning"
        :icon="IconPackageOff"
      />

      <DataSommary
        title="Alertes critiques"
        :value="10"
        state="danger"
        :icon="IconAlertTriangle"
      />
    </section>
    <section>
      <Card>
        <div class="h-100 w-full">
          <LineChart
            title="Évolution des ventes"
            :data="monthlySalesData"
          />
        </div>
      </Card>
    </section>

    <section
      class="grid grid-cols-1 xl:grid-cols-3 gap-3"
    >
      <Card class="xl:col-span-2">
        <div class="h-100 w-full">
          <BarChart
            title="Ventes par magasin"
            :data="salesByWarehouseData"
          />
        </div>
      </Card>
      <Card>
        <div class="h-100 w-full">
          <DoughnutChart
            title="Répartition du stock"
            :data="stockByWarehouseData"
          />
        </div>
      </Card>

    </section>

  </div>
</template>

<script setup lang="ts">
import Card from "@/components/card/Card.vue";
import BarChart from "@/components/charts/BarChart.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import PageHeader from "@/components/molecules/PageHeader.vue";

import {
  IconAlertTriangle,
  IconPackageOff,
  IconPackages,
  IconShoppingCart,
} from "@tabler/icons-vue";

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
    12500,
    15800,
    14300,
    18700,
    22400,
    20100,
    24500,
    26800,
    23900,
    28100,
    31500,
    32500,
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

  values: [
    852,
    1045,
    637,
    489,
    713,
    368,
    421,
    294,
    556,
    478,
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
  ],

  values: [
    5200,
    6800,
    3900,
    2800,
    4200,
    2100,
  ],
};
</script>
