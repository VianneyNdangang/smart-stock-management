<template>
  <div class="w-full h-100">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

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

const props = defineProps<{
  title: string;
  data: {
    labels: string[];
    values: number[];
  };
}>();

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


/**
 * Création du graphique
 */
const createChart = () => {
   if (chart) {
    chart.destroy();
    chart = null;
  }
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");

  if (!ctx) return;

  chart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: props.data.labels,

      datasets: [
        {
          label: "Ventes",

          data: props.data.values,

          backgroundColor: "#c79e46",

          borderRadius: 5,

          borderSkipped: false,
        },
      ],
    },

    options: {
      indexAxis: "y",

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
          beginAtZero: true,

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
};

const updateChart = () => {
  if (!chart) return;

  chart.data.labels = props.data.labels;

  chart.data.datasets[0].data = props.data.values;

  chart.update();
};


onMounted(() => {
  createChart();
});

watch(
  () => props.data,
  () => {
    updateChart();
  },
  {
    deep: true,
  }
);


onUnmounted(() => {
  chart?.destroy();
  chart = null;
});
</script>