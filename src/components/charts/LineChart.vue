<template>
  <Card>
    <div class="w-full h-100">
    <canvas ref="chartRef"></canvas>
  </div>
  </Card>
  
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string
 data: {
  labels: string[],
  values: number[]
 }
}>()

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
import Card from "../card/Card.vue";


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

  const ctx = chartRef.value.getContext("2d");
  if (!ctx) return;

const data = {
  labels:[
        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
      ],
  values: [15, 35, 25, 45, 55, 41, 42]
}

const previous = data.values.at(-2) ?? 0;
const last = data.values.at(-1) ?? 0;

const isGrowing = last! > previous;
const isConstent = last! === previous

//  function getChartColor(value: number) {
//   if (value < 30) {
//     return {
//       border: "#ef4444", // rouge
//       start: "rgba(239,68,68,0.5)",
//       end: "rgba(239,68,68,0)"
//     };
//   }

//   if (value < 70) {
//     return {
//       border: "#f59e0b", // orange
//       start: "rgba(245,158,11,0.5)",
//       end: "rgba(245,158,11,0)"
//     };
//   }

//   return {
//     border: "#22c55e", // vert
//     start: "rgba(34,197,94,0.5)",
//     end: "rgba(34,197,94,0)"
//   };
// }
 const colors = isGrowing
  ? {
      border: "#22c55e",
      start: "rgba(34,197,94,0.5)",
      end: "rgba(34,197,94,0)",
    }
  : isConstent?
  {
      border: "#f59e0b", // orange
      start: "rgba(245,158,11,0.5)",
      end: "rgba(245,158,11,0)"
    }
  :{
      border: "#ef4444",
      start: "rgba(239,68,68,0.5)",
      end: "rgba(239,68,68,0)",
    };

const gradient = ctx.createLinearGradient(0, 0, 0,400);

gradient.addColorStop(0, colors.start);
gradient.addColorStop(1, colors.end);
  chart = new Chart(chartRef.value, {
    type: "line",

    data: {
      labels: props.data?.labels,

      datasets: [
        {
          label: "Ventes",

          data: props.data?.values,

          borderColor: colors.border,

          backgroundColor: gradient,

          fill: true,

          borderWidth: 3,

          tension: 0.4,

          pointRadius: 0,

          pointHoverRadius: 0,

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
            maxTicksLimit: 10
          },
        },
      },
    },
  });
});

onUnmounted(() => {
  chart?.destroy();
});




// onMounted(() => {
//   if (!chartRef.value) return;

//   const ctx = chartRef.value.getContext("2d");
//   if (!ctx) return;

//   const gradient = ctx.createLinearGradient(0, 0, 0, 400);

//   gradient.addColorStop(0, "rgba(199, 158, 70, 0.6)");
//   gradient.addColorStop(0.5, "rgba(199, 158, 70, 0.25)");
//   gradient.addColorStop(1, "rgba(199, 158, 70, 0)");

//   chart = new Chart(ctx, {
//     type: "line",

//     data: {
//       labels: [
//         "Jan",
//         "Fév",
//         "Mar",
//         "Avr",
//         "Mai",
//         "Juin",
//         "Juil",
//       ],

//       datasets: [
//         {
//           label: "Ventes",

//           data: [15, 35, 25, 45, 55, 70, 90],

//           borderColor: "#c79e46",

//           backgroundColor: gradient,

//           fill: true,

//           borderWidth: 3,

//           tension: 0.4,

//           pointRadius: 0,
//         },
//       ],
//     },

//     options: {
//       maintainAspectRatio: false,
//       responsive: true,
//     },
//   });
// });
</script>