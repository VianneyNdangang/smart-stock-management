<template>
  <aside
  v-if="store.isSidebar"
  class="fixed top-22 right-0 bottom-0 z-50
         flex flex-col bg-(--surface)
         shadow-sm transition-all duration-300
         overflow-hidden"
  :class="store.isSidebar ? 'w-96 p-2' : 'w-0 p-0'"
>

    <button
      v-if="store.isSidebar"
      @click="store.handleClose()"
      class="cursor-pointer w-fit"
    >
      <IconTransitionRightFilled />
    </button>


    <section
      class="flex-1 w-full text-slate-900 overflow-y-auto"
    >
      <slot />
    </section>

  </aside>
</template>


<script setup lang="ts">

import { IconTransitionRightFilled } from "@tabler/icons-vue";
import { useRSidebarStore } from "@/store/rSideBareStore";


const store = useRSidebarStore();

</script>