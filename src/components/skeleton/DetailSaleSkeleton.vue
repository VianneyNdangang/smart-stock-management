<template>
  <Card>
    <div class="flex flex-col gap-5 animate-pulse">

      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div class="flex flex-col gap-2">
          <div class="h-4 w-16 rounded bg-(--skeleton)"></div>
          <div class="h-6 w-40 rounded bg-(--skeleton)"></div>
        </div>

        <!-- Status -->
        <div class="h-7 w-24 rounded-full bg-(--skeleton)"></div>
      </div>

      <!-- Informations générales -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="i in 4"
          :key="i"
          class="rounded-lg border border-(--border) p-3 flex flex-col gap-2"
        >
          <div class="h-4 w-20 rounded bg-(--skeleton)"></div>
          <div class="h-5 w-32 rounded bg-(--skeleton)"></div>
        </div>
      </div>

      <!-- Produits -->
      <div>
        <div class="h-6 w-24 rounded bg-(--skeleton) mb-3"></div>

        <div class="overflow-hidden rounded-lg border border-(--border)">
          <!-- Header table -->
          <div
            class="grid grid-cols-4 gap-4 px-4 py-3 border-b border-(--border)"
          >
            <div class="h-4 w-20 rounded bg-(--skeleton)"></div>

            <div
              class="h-4 w-16 rounded bg-(--skeleton) mx-auto"
            ></div>

            <div
              class="h-4 w-20 rounded bg-(--skeleton) ml-auto"
            ></div>

            <div
              class="h-4 w-16 rounded bg-(--skeleton) ml-auto"
            ></div>
          </div>

          <!-- Rows -->
          <div
            v-for="i in 2"
            :key="i"
            class="grid grid-cols-4 gap-4 px-4 py-4 border-b border-(--border) last:border-0"
          >
            <!-- Produit -->
            <div class="flex flex-col gap-2">
              <div class="h-4 w-32 rounded bg-(--skeleton)"></div>
              <div class="h-3 w-20 rounded bg-(--skeleton)"></div>
            </div>

            <!-- Quantité -->
            <div
              class="h-4 w-8 rounded bg-(--skeleton) mx-auto"
            ></div>

            <!-- Prix -->
            <div
              class="h-4 w-20 rounded bg-(--skeleton) ml-auto"
            ></div>

            <!-- Total -->
            <div
              class="h-4 w-24 rounded bg-(--skeleton) ml-auto"
            ></div>
          </div>
        </div>
      </div>

      <!-- Résumé -->
      <div class="flex justify-end">
        <div class="w-full sm:w-80 flex flex-col gap-3">

          <!-- Sous-total -->
          <div class="flex justify-between">
            <div class="h-4 w-20 rounded bg-(--skeleton)"></div>
            <div class="h-4 w-24 rounded bg-(--skeleton)"></div>
          </div>

          <!-- Remise -->
          <div class="flex justify-between">
            <div class="h-4 w-16 rounded bg-(--skeleton)"></div>
            <div class="h-4 w-20 rounded bg-(--skeleton)"></div>
          </div>

          <!-- Total -->
          <div
            class="flex justify-between border-t border-(--border) pt-3 mt-2"
          >
            <div class="h-6 w-14 rounded bg-(--skeleton)"></div>
            <div class="h-7 w-28 rounded bg-(--skeleton)"></div>
          </div>

        </div>
      </div>

    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/components/card/Card.vue";
</script>