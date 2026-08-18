<template>
  <div class="relative h-100" style="width:100%;">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

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

const props = defineProps<{
  title: string;
  data: {
    labels: string[];
    values: number[];
  };
}>();

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


const getColors = () => {
  const previous = props.data.values.at(-2) ?? 0;
  const last = props.data.values.at(-1) ?? 0;

  if (last > previous) {
    return {
      border: "#22c55e",
      start: "rgba(34, 197, 94, 0.5)",
      end: "rgba(34, 197, 94, 0)",
    };
  }

  if (last === previous) {
    return {
      border: "#f59e0b",
      start: "rgba(245, 158, 11, 0.5)",
      end: "rgba(245, 158, 11, 0)",
    };
  }

  return {
    border: "#ef4444",
    start: "rgba(239, 68, 68, 0.5)",
    end: "rgba(239, 68, 68, 0)",
  };
};


/**
 * Crée le graphique
 */
const createChart = () => {
   if (chart) {
    chart.destroy();
    chart = null;
  }
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");

  if (!ctx) return;

  const colors = getColors();

  const gradient = ctx.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, colors.start);
  gradient.addColorStop(1, colors.end);

  chart = new Chart(ctx, {
    type: "line",

    data: {
      labels: props.data.labels,

      datasets: [
        {
          label: "Ventes",

          data: props.data.values,

          borderColor: colors.border,

          backgroundColor: gradient,

          fill: true,

          borderWidth: 2,

          tension: 0.4,

          pointRadius: 0,

          pointHoverRadius: 4,

          pointBackgroundColor: colors.start,

          pointBorderColor: colors.border,

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
          text: props.title,

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
            maxTicksLimit: 10,
          },
        },
      },
    },
  });
};


/**
 * Met à jour le graphique lorsque les données changent
 */
const updateChart = () => {
  if (!chart) return;

  const colors = getColors();

  chart.data.labels = props.data.labels;
  chart.data.datasets[0].data = props.data.values;

  chart.data.datasets[0].borderColor = colors.border;

  chart.update();
};


onMounted(() => {
  createChart();
});


/**
 * Important :
 * props.data peut changer après l'appel API.
 */
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