<template>
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-100 left-0 top-full mt-2 w-full max-h-96 bg-(--card) shadow-md overflow-scroll"
      >
        <Card>
          <slot/>
        </Card>
      </div>
    </Transition>
</template>

<script setup lang="ts">
import Card from '../card/Card.vue';

const props = defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void;
}>();
</script>