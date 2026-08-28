<template>
  <BackButton/>
  <DetailSaleSkeleton v-if="loading"/>
  <Card v-else>
    <div class="flex flex-col gap-5">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p class="text-sm text-(--text-secondary)">
            Vente
          </p>

          <h2 class="text-xl font-bold text-(--text-primary)">
            #{{ sale?.reference || "-" }}
          </h2>
        </div>

        <Badge
          :type="statusType"
          :message="statusLabel"
        />
      </div>

      <!-- Informations générales -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div class="rounded border border-(--border) p-3">
          <p class="text-sm text-(--text-secondary)">
            Client
          </p>

          <p class="font-semibold text-(--text-primary)">
            {{ sale?.customer?.name || "Client comptant" }}
          </p>
        </div>

        <div class="rounded border border-(--border) p-3">
          <p class="text-sm text-(--text-secondary)">
            Vendeur
          </p>

          <p class="font-semibold text-(--text-primary)">
            {{ sale?.seller?.userName || "-" }}
          </p>
        </div>

        <div class="rounded border border-(--border) p-3">
          <p class="text-sm text-(--text-secondary)">
            Date
          </p>

          <FormateDate :date="sale?.createdAt" />
        </div>

        <div class="rounded border border-(--border) p-3">
          <p class="text-sm text-(--text-secondary)">
            Mode de paiement
          </p>

          <p class="font-semibold text-(--text-primary)">
            {{ paymentMethodLabel }}
          </p>
        </div>
      </div>

      <!-- Produits -->
      <div>
        <h3 class="text-lg font-semibold text-(--text-primary) mb-3">
          Produits
        </h3>

        <div class="overflow-x-auto rounded border border-(--border) overflow-scroll scrollbar-none h-80">
          <table class=" sticky w-full text-sm">
            <thead>
              <tr class="border-b border-(--border) text-(--text-secondary)">
                <th class="text-left px-4 py-3">
                  Produit
                </th>

                <th class="text-center px-4 py-3">
                  Quantité
                </th>

                <th class="text-right px-4 py-3">
                  Prix unitaire
                </th>

                <th class="text-right px-4 py-3">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in sale?.items || []"
                :key="item.id"
                class="border-b border-(--border) last:border-0"
              >
                <td class="px-4 py-3">
                  <div>
                    <p class="font-medium text-(--text-primary)">
                      {{ item.product?.productName || "-" }}
                    </p>

                    <p class="text-xs text-(--text-secondary)">
                      SKU : {{ item.productAttribute?.SKU || "-" }}
                    </p>
                  </div>
                </td>

                <td class="text-center px-4 py-3">
                  {{ item.units }}
                </td>

                <td class="text-right px-4 py-3">
                  {{ formatPrice(item?.productAttribute?.price) }}
                </td>

                <td class="text-right px-4 py-3 font-medium">
                  {{ formatPrice(item.units * item?.productAttribute?.price) }}
                </td>
              </tr>

              <tr v-if="!sale?.items?.length">
                <td
                  colspan="4"
                  class="px-4 py-8 text-center text-(--text-secondary)"
                >
                  Aucun produit dans cette vente.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex justify-end">
        <dl class="w-full sm:w-80 grid grid-cols-2 gap-2">
            <dt class="text-(--text-secondary)">
              Sous-total
            </dt>

            <dd class="font-medium flex justify-end">
              {{ formatPrice(subTotal) }}
            </dd>
            <dt class="text-(--text-secondary)">
              Remise
            </dt>

            <dd class="font-medium flex justify-end">
              - {{ formatPrice(sale?.discount || 0) }}
            </dd>
            <dt class="text-lg font-semibold">
              Total
            </dt>

            <dd class="text-xl font-bold text-(--text-primary) flex justify-end">
              {{ formatPrice(total) }}
            </dd>
        </dl>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import Card from "@/components/card/Card.vue";
import Badge from "@/components/badge/Badge.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import BackButton from "@/components/backbutton/BackButton.vue";
import { useRoute } from "vue-router";
import { apiClient } from "@/store/api";
import DetailSaleSkeleton from "@/components/skeleton/DetailSaleSkeleton.vue";

const orderId = useRoute().params.id
const loading = ref(false)
const sale = ref<SaleType>()

const fetchData = async ()=>{
   const response = await apiClient({
            url: `order-details`,
            method: "GET",
            params:{
              filter:{id: orderId}
            },
          });
    sale.value = response.data
}

onMounted(async ()=>{
  loading.value = true
  try {
   await fetchData()
  } catch (error) {
    
  }finally{ loading.value = false}
})

interface SaleItem {
  id: string | number;
  units: number;
  unitPrice: number;
  productAttribute: any;
  product?: {
    productName?: string;
    SKU?: string;
  };
}

interface SaleType {
  reference?: string;
  createdAt?: string;
  status?: string;
  discount?: number;
  customer?: {
    name?: string;
  };
  seller?: {
    userName?: string;
  };
  paymentMethod?: string;
  items?: SaleItem[];
}

const subTotal = computed(() => {
  return (sale.value?.items || []).reduce(
    (total, item) => total + item.units * item.productAttribute.price,
    0,
  );
});

const total = computed(() => {
  return subTotal.value - (sale.value?.discount || 0);
});

const statusLabel = computed(() => {
  switch (sale.value?.status) {
    case "completed":
      return "Completed";

    case "pending":
      return "Pending";

    case "cancelled":
      return "Cancelled";

    case "refunded":
      return "Refunded";

    default:
      return sale.value?.status || "Unknown";
  }
});

const statusType = computed(() => {
  switch (sale.value?.status) {
    case "completed":
      return "success";

    case "pending":
      return "warning";

    case "cancelled":
      return "danger";

    default:
      return "primary";
  }
});

const paymentMethodLabel = computed(() => {
  switch (sale.value?.paymentMethod) {
    case "cash":
      return "Espèces";

    case "mobile_money":
      return "Mobile Money";

    case "card":
      return "Carte bancaire";

    case "bank_transfer":
      return "Virement";

    default:
      return sale.value?.paymentMethod || "-";
  }
});

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(value || 0);
};
</script>