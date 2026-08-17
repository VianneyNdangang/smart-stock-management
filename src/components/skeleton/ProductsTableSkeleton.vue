<template>
  <div class="w-full animate-pulse">
    <div
      v-for="i in 10"
      :key="i"
      class="grid grid-cols-[40px_2fr_1fr_1fr_1fr_100px_80px] items-center gap-4 border-b border-(--border) px-4 py-3"
    >
      <!-- Checkbox -->
      <div class="h-4 w-4 rounded bg-(--skeleton)" />

      <!-- Product -->
      <div class="flex min-w-0 items-center gap-3">
        <!-- Product image rectangulaire -->
        <div
          class="h-11 w-14 shrink-0 rounded-md bg-(--skeleton)"
        />

        <!-- Product name / reference -->
        <div class="flex min-w-0 flex-1 flex-col gap-2">
          <div class="h-4 w-3/5 rounded bg-(--skeleton)" />
          <div class="h-3 w-2/5 rounded bg-(--skeleton)" />
        </div>
      </div>

      <!-- Category -->
      <div class="h-4 w-3/4 rounded bg-(--skeleton)" />

      <!-- Price -->
      <div class="h-4 w-1/2 rounded bg-(--skeleton)" />

      <!-- Stock -->
      <div class="h-4 w-1/2 rounded bg-(--skeleton)" />

      <!-- Status -->
      <div class="h-6 w-16 rounded-full bg-(--skeleton)" />

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <div class="h-7 w-7 rounded bg-(--skeleton)" />
        <div class="h-7 w-7 rounded bg-(--skeleton)" />
      </div>
    </div>
  </div>
</template>