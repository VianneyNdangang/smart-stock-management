<script setup lang="ts">
import { useToastStore } from "@/store/toastStore";
import Toast from "./Toast.vue";

const store = useToastStore();
</script>

<template>
  <div
    class="fixed top-5 right-5 z-9999 flex flex-col gap-3"
  >
    <TransitionGroup
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-300"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <Toast
        v-for="toast in store.toasts"
        :key="toast.id"
        :title="toast.title"
        :description="toast.description"
        :type="toast.type"
      />
    </TransitionGroup>
  </div>
</template>