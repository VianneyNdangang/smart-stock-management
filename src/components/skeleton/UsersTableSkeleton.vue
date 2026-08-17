<template>
<div class="w-full animate-pulse">
  <!-- Skeleton rows -->
  <div
    v-for="i in 10"
    :key="i"
    class="flex w-full items-center gap-4 border-b border-(--border) px-3 py-3"
  >
    <!-- Checkbox -->
    <div class="h-4 w-4 shrink-0 rounded bg-(--skeleton)" />

    <!-- Product / Name -->
    <div class="flex min-w-0 flex-1 items-center gap-3">
      <div class="h-9 w-9 shrink-0 rounded-full bg-(--skeleton)" />

      <div class="flex min-w-0 flex-1 flex-col gap-2">
        <div class="h-4 w-3/5 rounded bg-(--skeleton)" />
        <div class="h-3 w-2/5 rounded bg-(--skeleton)" />
      </div>
    </div>

    <!-- Category -->
    <div class="hidden w-1/6 md:block">
      <div class="h-4 w-4/5 rounded bg-(--skeleton)" />
    </div>

    <!-- Price -->
    <div class="hidden w-1/6 md:block">
      <div class="h-4 w-3/5 rounded bg-(--skeleton)" />
    </div>

    <!-- Stock -->
    <div class="hidden w-1/6 md:block">
      <div class="h-4 w-1/2 rounded bg-(--skeleton)" />
    </div>

    <!-- Status -->
    <div class="hidden w-1/6 md:block">
      <div class="h-6 w-16 rounded-full bg-(--skeleton)" />
    </div>

    <!-- Actions -->
    <div class="flex shrink-0 items-center gap-2">
      <div class="h-7 w-7 rounded bg-(--skeleton)" />
      <div class="h-7 w-7 rounded bg-(--skeleton)" />
    </div>
  </div>
</div>
</template>