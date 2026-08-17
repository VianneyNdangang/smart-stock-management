<script setup lang="ts">
import Card from "../card/Card.vue";
</script>

<template>
  <Card>
    <div class="animate-pulse w-full flex flex-col gap-3">
      <!--Header-->
      <div class="space-y-2 p-2 flex justify-between">
        <div class="h-7 w-1/2 rounded bg-(--skeleton)"></div>
        <div class="w-16 h-7 rounded bg-(--skeleton)"></div>
      </div>
      <!-- Description -->
      <div class="space-y-2 p-2">
        <div class="h-4 w-full rounded bg-(--skeleton)"></div>
        <div class="h-4 w-5/6 rounded bg-(--skeleton)"></div>
        <div class="h-4 w-3/4 rounded bg-(--skeleton)"></div>
      </div>

      <!-- Stats -->
      <div class="flex items-center justify-between">
        <!-- Products -->
        <div class="space-y-2">
          <div class="h-3 w-16 rounded bg-(--skeleton)"></div>
          <div class="h-5 w-8 rounded bg-(--skeleton)"></div>
        </div>

        <!-- Stock -->
        <div class="space-y-2">
          <div class="h-3 w-12 rounded bg-(--skeleton)"></div>
          <div class="h-5 w-8 rounded bg-(--skeleton)"></div>
        </div>

        <!-- Status -->
        <div class="space-y-2">
          <div class="h-3 w-14 rounded bg-(--skeleton)"></div>
          <div class="h-5 w-16 rounded bg-(--skeleton)"></div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between">
        <!-- Created at -->
        <div class="flex items-center gap-2">
          <div class="h-3 w-20 rounded bg-(--skeleton)"></div>
          <div class="h-4 w-24 rounded bg-(--skeleton)"></div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <div class="size-4 rounded bg-(--skeleton)"></div>
          <div class="size-4 rounded bg-(--skeleton)"></div>
        </div>
      </div>
    </div>
  </Card>
</template>
