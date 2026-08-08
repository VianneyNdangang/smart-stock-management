<template>
  <svg ref="barcodeRef" class="w-50 h-auto"></svg>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import JsBarcode from "jsbarcode";

const props = defineProps<{
  value: string;
}>();

const barcodeRef = ref<SVGSVGElement | null>(null);

const generateBarcode = () => {
  if (!barcodeRef.value) return;

  JsBarcode(barcodeRef.value, props.value, {
    format: "CODE128",
    width: 1.5,
    height: 70,
    displayValue: false,
    lineColor: "#000",
    background: "#fff",
    margin: 5,
    textAlign: "left",
    fontSize: 10,
  });
};

onMounted(generateBarcode);

watch(() => props.value, generateBarcode);
</script>