<template>
  <div
    class="relative w-full rounded-(--radius) border  p-3 transition-all duration-200 hover:shadow-md"
    :class="borderClass"
  >
    <!-- Indicateur de priorité -->
    <div class="flex items-start justify-between gap-4 pl-2">
      <!-- Icône + informations -->
      <div class="flex min-w-0 items-start gap-3">
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          :class="iconContainerClass"
        >
        <vue-icon :name="icon" class="size-6" />
        </div>

        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="font-semibold text-(--text-primary)">
              {{ alert.title }}
            </h3>

            <span
              class="rounded-full px-2 py-0.5 text-xs font-medium"
              :class="badgeClass"
            >
              {{ priorityLabel }}
            </span>
          </div>

          <p class="mt-1 text-sm text-(--text-secondary)">
            {{ alert.message }}
          </p>
        </div>
      </div>

      <!-- Score -->
      <div class="shrink-0 text-right">
        <p class="text-xs text-(--text-secondary)">
          Priorité
        </p>

        <p
          class="text-lg font-bold"
          :class="textClass"
        >
          {{ alert.priorityScore }}
        </p>
      </div>
    </div>

    <!-- Informations -->
    <div
      class="mt-4 grid grid-cols-2 gap-3 border-t border-(--border) pt-4 md:grid-cols-4"
    >
      <div>
        <p class="text-xs text-(--text-secondary)">
          SKU
        </p>

        <p
          class="mt-1 truncate text-sm font-medium text-(--text-primary)"
          :title="alert.SKU"
        >
          {{ alert.SKU }}
        </p>
      </div>

      <div>
        <p class="text-xs text-(--text-secondary)">
          Entrepôt
        </p>

        <p
          class="mt-1 truncate text-sm font-medium text-(--text-primary)"
          :title="alert.warehouseName"
        >
          {{ alert.warehouseName }}
        </p>
      </div>
    </div>

    <!-- Raisons -->
    <div
      v-if="alert.priorityReasons?.length"
      class="mt-4 flex flex-wrap gap-2"
    >
      <span
        v-for="reason in uniqueReasons"
        :key="reason"
        class="rounded-(--radius) bg-(--secondary)/10 px-2 py-1 text-xs text-(--text-secondary)"
      >
        {{ formatReason(reason) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  IconAlertTriangle,
  IconAlertCircle,
  IconInfoCircle,
  IconCircleCheck,
} from "@tabler/icons-vue";
import { getAlertType } from "@/helpers/formateData";
import VueIcon from "@kalimahapps/vue-icons/VueIcon";

interface Alert {
  SKU: string;
  currentStock: number;
  suggestedRestockUnit: number;
  nearestExpiryDate: number;
  warehouseName: string;
  priorityReasons: string[];
  priorityScore: number;
  trend?: string;
  type: "success" | "danger" | "warning" | "info";
  title: string;
  message: string;
}

const props = defineProps<{
  alert: Alert;
}>();

const type = getAlertType(props.alert?.priorityScore);

const uniqueReasons = computed(() => {
  return [...new Set(props.alert.priorityReasons)];
});

const priorityLabel = computed(() => {
  const score = props.alert.priorityScore;

  if (score >= 90) return "Critique";
  if (score >= 70) return "Élevée";
  if (score >= 40) return "Moyenne";

  return "Faible";
});

const icon = computed(() => {
  switch (type) {
    case "danger":
      return IconAlertCircle;

    case "warning":
      return IconAlertTriangle;

    case "success":
      return IconCircleCheck;

    default:
      return IconInfoCircle;
  }
});

const indicatorClass = computed(() => {
  switch (type) {
    case "danger":
      return "bg-(--danger)";

    case "warning":
      return "bg-(--warning)";

    case "success":
      return "bg-(--success)";

    default:
      return "bg-(--info)";
  }
});

const iconContainerClass = computed(() => {
  switch (type) {
    case "danger":
      return "bg-(--danger)/10 text-(--danger)";

    case "warning":
      return "bg-(--warning)/10 text-(--warning)";

    case "success":
      return "bg-(--success)/10 text-(--success)";

    default:
      return "bg-(--info)/10 text-(--info)";
  }
});

const badgeClass = computed(() => {
  switch (type) {
    case "danger":
      return "bg-(--danger)/10 text-(--danger)";

    case "warning":
      return "bg-(--warning)/10 text-yellow-600";

    case "success":
      return "bg-(--success)/10 text-green-600";

    default:
      return "bg-(--info)/10 text-(--info)";
  }
});

const textClass = computed(() => {
  switch (type) {
    case "danger":
      return "text-(--danger)";

    case "warning":
      return "text-(--warning)";

    case "success":
      return "text-(--success)";

    default:
      return "text-(--info)";
  }
});

const borderClass = computed(() => {
  switch (type) {
    case "danger":
      return "border-(--danger)/20";

    case "warning":
      return "border-(--warning)/20";

    case "success":
      return "border-(--success)/20";

    default:
      return "border-(--info)/20";
  }
});

const formatReason = (reason: string) => {
  const reasons: Record<string, string> = {
    approaching_expiry: "Expiration proche",
    high_velocity: "Vente rapide",
    low_stock: "Stock faible",
    out_of_stock: "Stock épuisé",
    ramp_up_approaching: "Hausse de demande",
  };

  return reasons[reason] || reason.replaceAll("_", " ");
};
</script>