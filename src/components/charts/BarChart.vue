<template>
  <div class="relative w-full h-full min-h-75">
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
} from "chart.js";

interface ChartData {
  labels: string[];
  values: number[];
}

const props = defineProps<{
  title?: string;
  data: ChartData;
}>();

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const chartRef = ref<HTMLCanvasElement | null>(null);

let chart: Chart | null = null;

const getCssVariable = (variable: string) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};

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

          backgroundColor: getCssVariable("--secondary") || "#c79e46",

          borderRadius: 8,

          borderSkipped: false,

          barThickness: 20,

          maxBarThickness: 24,

          hoverBackgroundColor:
            getCssVariable("--warning") || "#d4ad5c",
        },
      ],
    },

    options: {
      indexAxis: "y",

      responsive: true,

      maintainAspectRatio: false,

      animation: {
        duration: 800,

        easing: "easeOutQuart",
      },

      interaction: {
        mode: "nearest",

        axis: "y",

        intersect: true,
      },

      plugins: {
 
        legend: {
          display: false,
        },

        tooltip: {
          enabled: true,

          backgroundColor:
            getCssVariable("--surface") || "#ffffff",

          titleColor:
            getCssVariable("--text-primary") || "#111111",

          bodyColor:
            getCssVariable("--text-secondary") || "#666666",

          borderColor:
            getCssVariable("--border") || "#e5e5e5",

          borderWidth: 1,

          padding: 12,

          cornerRadius: 10,

          displayColors: false,

          titleFont: {
            size: 12,

            weight: "bold",
          },

          bodyFont: {
            size: 13,

            weight: "normal",
          },

          callbacks: {
            label: (context: any) => {
              const value = context.raw ?? 0;

              return ` ${value.toLocaleString("fr-FR")} ventes`;
            },
          },
        },
      },

      scales: {
        x: {
          beginAtZero: true,

          border: {
            display: false,
          },

          grid: {
            color:
              getCssVariable("--border") || "#eeeeee",

            drawTicks: false,

            lineWidth: 0.5,
          },

          ticks: {
            color:
              getCssVariable("--text-secondary") || "#777777",

            font: {
              size: 11,

              weight: "normal",
            },

            padding: 8,
          },
        },

        y: {
          beginAtZero: true,

          border: {
            display: false,
          },

          grid: {
            display: false,
          },

          ticks: {
            color:
              getCssVariable("--text-primary") || "#222222",

            font: {
              size: 11,

              weight: "normal",
            },

            padding: 8,
          },
        },
      },
    },
  });
};

const updateChart = () => {
  if (!chart) {
    createChart();
    return;
  }

  chart.data.labels = props.data.labels;

  chart.data.datasets[0].data = props.data.values;

  chart.update("active");
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