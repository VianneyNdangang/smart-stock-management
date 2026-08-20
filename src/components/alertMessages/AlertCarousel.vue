<template>
  <div
    v-if="messages.length"
    class="w-full"
    @mouseenter="pauseRotation"
    @mouseleave="resumeRotation"
  >
    <Transition
      name="alert"
      mode="out-in"
    >
      <AlertMessage
        :key="currentIndex"
        :type="messages[currentIndex].type"
        :title="messages[currentIndex].title"
        :message="messages[currentIndex].message"
        :closable="false"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import AlertMessage from "./AlertMessage.vue";

type AlertType = "success" | "danger" | "warning" | "info";

interface Alert {
  type: AlertType;
  title?: string;
  message: string;
}

const props = defineProps<{
  messages: Alert[];
}>();

const currentIndex = ref(0);

let timeout: ReturnType<typeof setTimeout> | null = null;

const nextAlert = () => {
  currentIndex.value =
    (currentIndex.value + 1) % props.messages.length;

  startRotation();
};

const startRotation = () => {
  clearRotation();

  if (props.messages.length <= 1) return;

  timeout = setTimeout(() => {
    nextAlert();
  }, 10000);
};

const clearRotation = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
};

const pauseRotation = () => {
  clearRotation();
};

const resumeRotation = () => {
  startRotation();
};

onMounted(() => {
  startRotation();
});

onUnmounted(() => {
  clearRotation();
});
</script>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.4s ease;
}

.alert-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.alert-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>