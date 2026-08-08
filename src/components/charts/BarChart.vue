<template>
  <Card>
    <div class="w-full h-96">
      <canvas ref="chartRef"></canvas>
    </div>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string,
    data:{
        labels: string[],
        values: number[]
    }
}>()
import { ref, onMounted, onUnmounted } from "vue";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import Card from "../card/Card.vue";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const chartRef = ref<HTMLCanvasElement | null>(null);

let chart: Chart | null = null;

onMounted(() => {
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");
  if (!ctx) return;

  chart = new Chart(ctx, {
    type: "bar",

    data: {
      labels:props.data?.labels,

      datasets: [
        {
          label: "Ventes",

          data: props.data?.values,

          backgroundColor: "#c79e46",

          borderRadius: 5,

          borderSkipped: false,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: true,
          text: props.title,
          font: {
            size: 18,
          },
        },

        legend: {
          display: false,
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
          },
        },

        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

onUnmounted(() => {
  chart?.destroy();
});
</script>