<template>
  <div class="relative h-100 ">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

const props = defineProps<{
  title?: string;
  data: {
    labels: string[];
    values: number[];
  };
}>();

Chart.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const chartRef = ref<HTMLCanvasElement | null>(null);

let chart: Chart | null = null;

onMounted(() => {
   if (chart) {
    chart.destroy();
    chart = null;
  }
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");

  if (!ctx) return;

  let delayed = false;

  chart = new Chart(ctx, {
    type: "doughnut",

    data: {
      labels: props.data.labels,

      datasets: [
        {
          data: props.data.values,

          backgroundColor: [
            "#4A3812",
            "#5F4817",
            "#75591D",
            "#8B6A23",
            "#A17B2B",
            "#B78C35",
            "#C79E46",
            "#D4B56D",
            "#E3CCA0",
            "#F2E8D2",
          ],

          borderWidth: 0,
          spacing: 0,
          borderRadius: 0,
          weight: 2,
          hoverOffset: 15,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "60%",

      animation: {
        onComplete: () => {
          delayed = true;
        },

        delay: (context) => {
          let delay = 0;

          if (
            context.type === "data" &&
            context.mode === "default" &&
            !delayed
          ) {
            delay =
              context.dataIndex * 300 +
              context.datasetIndex * 100;
          }

          return delay;
        },
      },

      plugins: {
        legend: {
          position: "center",
        },

        title: {
          display: true,
          text: props.title,

          font: {
            size: 20,
            weight: "bold",
          },
        },

        tooltip: {
          enabled: true,
        },
      },
    },
  });
});


watch(
  () => props.data,
  (newData) => {
    if (!chart) return;

    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.values;

    chart.update();
  },
  {
    deep: true,
  }
);


onUnmounted(() => {
  chart?.destroy();
});
</script>