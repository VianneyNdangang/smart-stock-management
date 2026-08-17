<template>
  <span :class="props.class">
    {{ formattedPrice }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    price: number | string | null | undefined;
    currency?: string;
    locale?: string;
    decimals?: number;
    class?: string;
  }>(),
  {
    currency: "XAF",
    locale: "fr-FR",
    decimals: 0,
  }
);

const formattedPrice = computed(() => {
  if (
    props.price === null ||
    props.price === undefined ||
    props.price === ""
  ) {
    return "-";
  }

  const value = Number(props.price);

  if (Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat(props.locale, {
    style: "currency",
    currency: props.currency,
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  }).format(value);
});
</script>