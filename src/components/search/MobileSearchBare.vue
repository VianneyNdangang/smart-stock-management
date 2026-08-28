

<template>
    <div class="px-3">
      <div
       v-if="isOpen"
        class="absolute z-100 left-0 top-full mt-2 w-full shadow-md bg-(--card) p-2 "
      >
          <SearchBare
            endpoint="products"
            property="productName"
            routeName="product_detail"
          />
          </div>
          </div>
          <!-- </Transition> -->
    <IconSearch stroke="1.5" class="flex md:hidden" @click=" isOpen = !isOpen"/>
</template>

<script setup lang="ts">
import { IconSearch } from '@tabler/icons-vue';
import SearchBare from './SearchBare.vue';
import { ref } from 'vue';

const isOpen = ref(false)

// const emit = defineEmits<{
//     (e: "close"): void
// }>()
</script>