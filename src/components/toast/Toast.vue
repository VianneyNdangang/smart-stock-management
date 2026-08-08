<script setup lang="ts">
import { useToastStore } from "@/store/toastStore";
import { IconXFilled } from "@tabler/icons-vue";
import { computed } from "vue";

const store = useToastStore();
const props = defineProps<{
  id: number;
  title: string;
  description?: string;
  type: "success" | "danger" | "warning" | "info";
}>();

const close = () => {
  store.remove(props.id);
};
const variants = computed(() => ({
  success: "border-(--success)",
  danger: "border-(--danger)",
  warning: "border-(--warning)",
  info: "border-(--primary)",
})[props.type]);
</script>

<template>
  <div
    class="w-96 rounded bg-(--surface) border-l-4 shadow-lg p-2 transition-all"
    :class="variants"
  >
 <div class="flex justify-between">
  <p class="font-semibold">
      {{ title }}
    </p>
   <IconXFilled class="top-1 right-1 cursor-pointer" @click="close" />
 </div>
    

    <p
      v-if="description"
      class="text-sm text-(--text-muted)"
    >
      {{ description }}
    </p>
  </div>
</template>