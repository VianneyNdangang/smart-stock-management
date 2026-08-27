<template>
  <div class="relative h-full w-full">
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
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

const chartRef = ref<HTMLCanvasElement | null>(null);

let chart: Chart | null = null;

const colors = [
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
];

const centerTextPlugin = {
  id: "centerText",

  afterDraw(chart: any) {
    const { ctx } = chart;

    const meta = chart.getDatasetMeta(0);

    if (!meta?.data?.length) return;

    const x = meta.data[0].x;
    const y = meta.data[0].y;

    const total = props.data.values.reduce(
      (sum, value) => sum + value,
      0
    );

    ctx.save();

    /* Total */
    ctx.font = "700 24px Inter, sans-serif";
    ctx.fillStyle = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--text-primary");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      new Intl.NumberFormat("fr-FR").format(total),
      x,
      y - 7
    );

    /* Label */
    ctx.font = "500 11px Inter, sans-serif";

    ctx.fillStyle = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--text-secondary");
    ctx.fillText(
      "Total",
      x,
      y + 18
    );
    ctx.restore();
  },
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
    type: "doughnut",

    data: {
      labels: props.data.labels,

      datasets: [
        {
          data: props.data.values,

          backgroundColor: props.data.labels.map(
            (_, index) => colors[index % colors.length]
          ),

          borderColor: "transparent",
          borderWidth: 0,
          spacing: 4,
          borderRadius: 8,
          hoverOffset: 8,
          hoverBorderWidth: 0,
          weight: 1,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      radius: "88%",
      animation: {
        duration: 900,
        easing: "easeOutQuart",
      },

      interaction: {
        mode: "nearest",
        intersect: true,
      },

      plugins: {
        legend: {
          position: "bottom",
          align: "center",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16,
            boxWidth: 8,
            boxHeight: 8,
            color: getCssVariable("--text-secondary"),

            font: {
              size: 11,

              weight: "normal",
            },
          },
        },

        /* ------------------------------------------------------------------ */
        /*                                 TOOLTIP                             */
        /* ------------------------------------------------------------------ */

        tooltip: {
          enabled: true,

          backgroundColor: getCssVariable("--surface"),

          titleColor: getCssVariable("--text-primary"),

          bodyColor: getCssVariable("--text-secondary"),

          borderColor: getCssVariable("--border"),

          borderWidth: 1,

          padding: 8,

          cornerRadius: 10,

          displayColors: true,

          boxPadding: 5,

          titleFont: {
            size: 13,

            weight: "bold",
          },

          bodyFont: {
            size: 12,

            weight: "normal",
          },

          callbacks: {
            label: (context: any) => {
              const value = context.raw ?? 0;

              const total = props.data.values.reduce(
                (sum, item) => sum + item,
                0
              );

              const percentage =
                total > 0
                  ? ((value / total) * 100).toFixed(1)
                  : "0";

              return ` ${value.toLocaleString("fr-FR")} unités • ${percentage}%`;
            },
          },
        },
      },
    },

    plugins: [centerTextPlugin],
  });
};

const getCssVariable = (variable: string) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};

onMounted(() => {
  createChart();
});

watch(
  () => props.data,
  () => {
    createChart();
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