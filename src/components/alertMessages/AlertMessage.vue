<template>
  <div
    v-if="message"
    class="flex items-start gap-3 w-full h-full border p-3"
    :class="containerClass"
  >
    <VueIcon :name="icon" class="size-6" />
    <div class="flex-1">
      <p v-if="title" class="font-medium">
        {{ title }}
      </p>

      <p class="text-xs md:text-sm">
        {{ message }}
      </p>
    </div>

    <button
      v-if="closable"
      type="button"
      class="shrink-0 opacity-70 hover:opacity-100"
      @click="close"
    >
      <IconX :size="18" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import {
  IconCircleCheck,
  IconAlertTriangle,
  IconAlertCircle,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-vue";
import VueIcon from "@kalimahapps/vue-icons/VueIcon";

type MessageType = "success" | "danger" | "warning" | "info";

const props = withDefaults(
  defineProps<{
    message?: string;
    title?: string;
    type?: MessageType;
    closable?: boolean;
  }>(),
  {
    type: "info",
    closable: false,
  },
);

const emit = defineEmits<{
  close: [];
}>();

const icon = computed<Component>(() => {
  const icons = {
    success: IconCircleCheck,
    danger: IconAlertCircle,
    warning: IconAlertTriangle,
    info: IconInfoCircle,
  };

  return icons[props.type];
});

const containerClass = computed(() => {
  const classes = {
    success: "border-(--success)/20 bg-(--success)/10 text-(--success)",
    danger: "border-(--danger)/20 bg-(--danger)/10 text-(--danger)",
    warning: "border-(--warning)/20 bg-(--warning)/10 text-(--warning)",
    info: "border-(--info)/20 bg-(--info)/10 text-(--info)",
  };

  return classes[props.type];
});

const close = () => {
  emit("close");
};
</script>
