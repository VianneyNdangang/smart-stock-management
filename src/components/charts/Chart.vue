<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          { data: [40, 20, 12], label: "Dataset 1" },
          { data: [41, 50, 12], label: "Dataset 2" },
          { data: [20, 25, 10], label: "Dataset 3" },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>
