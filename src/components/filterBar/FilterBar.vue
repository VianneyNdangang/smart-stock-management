<template>
  <Card>
    <div class="flex flex-col gap-4">
      <div class="space-y-0 pl-3">
        <div class="flex justify-start items-center gap-2">
          <IconAdjustmentsHorizontalFilled
            class="text-(--text-muted)"
            size="20"
          />
          <p class="font-semibold text-lg">Filter</p>
        </div>
        <p class="text-(--text-muted) text-sm font-semibold">
          Search, filter and navigate through your data
        </p>
      </div>

      <SearchBare :endpoint="searchEndPoint" :property="searchProperty" :routeName="routeName" />
      <div>
        <slot/>
      </div>
     
    </div>
  </Card>
</template>
<script setup lang="ts">
import { IconAdjustmentsHorizontalFilled } from "@tabler/icons-vue";
import Card from "../card/Card.vue";
import SearchBare from "../search/SearchBare.vue";

const props = defineProps<{
    searchEndPoint: string;
    searchProperty:string;
    routeName: string;
}>()
</script>
