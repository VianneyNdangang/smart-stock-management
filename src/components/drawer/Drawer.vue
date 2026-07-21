<script setup lang="ts">
import { computed } from "vue";
import { IconX } from "@tabler/icons-vue";

const props = defineProps<{
  isOpen: boolean;
  placement: "top" | "bottom" | "start" | "end";
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const transitionClasses = computed(() => {
  switch (props.placement) {
    case "top":
      return {
        enterFrom: "-translate-y-full",
        leaveTo: "-translate-y-full",
      };

    case "bottom":
      return {
        enterFrom: "translate-y-full",
        leaveTo: "translate-y-full",
      };

    case "start":
      return {
        enterFrom: "-translate-x-full",
        leaveTo: "-translate-x-full",
      };

    default: // end
      return {
        enterFrom: "translate-x-full",
        leaveTo: "translate-x-full",
      };
  }
});
</script>

<template>
  <!-- Backdrop -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      @click="emit('close')"
    >
      <!-- Drawer -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        :enter-from-class="transitionClasses.enterFrom"
        enter-to-class="translate-x-0 translate-y-0"
        leave-active-class="transition-transform duration-300 ease-in"
        leave-from-class="translate-x-0 translate-y-0"
        :leave-to-class="transitionClasses.leaveTo"
      >
        <aside
          v-if="isOpen"
          @click.stop
          class="absolute bg-(--surface) shadow-xl"
          :class="[
            props.placement === 'top'
              ? 'top-0 left-0 w-full h-1/3'
              : props.placement === 'bottom'
                ? 'bottom-0 left-0 w-full h-1/3'
                : props.placement === 'start'
                  ? 'left-0 top-0 h-full w-80'
                  : 'right-0 top-0 h-full w-80',
          ]"
        >
          <button
            @click="emit('close')"
            class="absolute top-4 right-4 rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <IconX class="size-5" />
          </button>

          <div class="h-full overflow-y-auto">
            <slot/>
          </div>
        </aside>
      </Transition>
    </div>
  </Transition>
</template>

<!--  -->