import { defineStore } from "pinia";
import { ref } from "vue";

export type ToastType = "success" | "danger" | "warning" | "info";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  type: ToastType;
}

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([]);

  const show = (
    title: string,
    type: ToastType = "info",
    description?: string
  ) => {
    const id = Date.now();

    toasts.value.push({
      id,
      title,
      description,
      type,
    });

    setTimeout(() => {
      remove(id);
    }, 10000);
  };

  const remove = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return {
    toasts,
    show,
    remove,
  };
});