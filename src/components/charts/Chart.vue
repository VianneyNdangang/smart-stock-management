<template>
  <div class="w-full h-100 rounded-xl bg-white dark:bg-slate-900 p-6 shadow">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";

// Enregistrement des composants nécessaires
Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler
);

const chartRef = ref<HTMLCanvasElement | null>(null);

let chart: Chart | null = null;

onMounted(() => {
  if (!chartRef.value) return;

  chart = new Chart(chartRef.value, {
    type: "line",

    data: {
      labels: [
        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
      ],

      datasets: [
        {
          label: "Ventes",

          data: [15, 35, 25, 45, 55, 70, 90],

          borderColor: "#3B82F6",

          backgroundColor: "rgba(59,130,246,.15)",

          fill: true,

          borderWidth: 3,

          tension: 0.4,

          pointRadius: 0,

          pointHoverRadius: 0,

          pointBackgroundColor: "#3B82F6",

          pointBorderColor: "#fff",

          pointBorderWidth: 2,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      interaction: {
        intersect: false,
        mode: "index",
      },

      plugins: {
        legend: {
          position: "bottom",
        },

        title: {
          display: true,
          text: "Evolution des ventes",
          font: {
            size: 20,
          },
        },

        tooltip: {
          enabled: true,
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

          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  });
});

onUnmounted(() => {
  chart?.destroy();
});
</script>