<script setup lang="ts">
import { IconCircleArrowUpFilled } from "@tabler/icons-vue";
import { ref, onMounted, onUnmounted } from "vue";

const showScrollTop = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 100;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 translate-y-3 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-3 scale-90"
  >
  <IconCircleArrowUpFilled
  v-if="showScrollTop"
          size="35"
          class="fixed text-(--secondary) cursor-pointer bottom-4 right-4"
          @click="scrollToTop"
        />
  </Transition>
</template>