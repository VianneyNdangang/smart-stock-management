<template>
  <!-- Primary Button -->

  <button
    v-if="variant === 'primary'"
    :class="[
      ` w-${props.w}`,
      ` cursor-not-allowed:{props.loading} py-1.5 px-4 rounded font-semibold  flex items-center justify-center`,
      props.loading ? `cursor-not-allowed bg-(--btt-bg)/50 text-white/70` : `cursor-pointer hover:bg-(--btt-hover) bg-(--btt-bg) text-white`,
    ]"
    @type="[props.type]"
    @click="props.click"
  >
    <div v-if="props?.loading" class="flex gap-2">
      <div
        class="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
      ></div>
      Loading...
    </div>
    <div v-else class="flex items-center justify-center gap-2">
      <VueIcon v-if="props.icon" :name="props?.icon" class="size-5" />
      {{ props.label }}
    </div>
  </button>

  <!-- Secondary Button -->
  <button
    v-if="variant === 'secondary'"
    :class="[
      ` w-${props.w}`,
      `border-2  cursor-not-allowed:{props.loading} py-1 px-3 rounded font-semibold flex items-center justify-center`,
      props.loading ? `cursor-not-allowed border-(--btt-bg)/50 text-(--btt-bg)/50` : `cursor-pointer hover:bg-(--btt-bg)/20 border-(--btt-bg) text-(--btt-bg)`,
    ]"
    @type="[props.type]"
    @click="props.click"
  >
    <div v-if="props?.loading" class="flex gap-2">
      <div
        class="h-5 w-5 animate-spin rounded-full border-2 border-(--btt-bg)/40 border-t-(--btt-bg)"
      ></div>
      Loading...
    </div>
    <div v-else class="flex items-center justify-center gap-2">
      <VueIcon v-if="props.icon" :name="props?.icon" class="size-5" />
      {{ props.label }}
    </div>
  </button>

  <!-- Ghost Button -->
  <button
    v-if="variant === 'ghost'"
    :class="[
      `bg-(--bttg-bg) w-${props.w}`,
      ` cursor-not-allowed:{props.loading} py-1.5 px-4 rounded font-semibold flex items-center justify-center`,
      props.loading ? `cursor-not-allowed text-(--btt-bg)/50` : `cursor-pointer text-(--btt-bg) hover:bg-(--btt-bg)/20 `,
    ]"
    @type="[props.type]"
    @click="props.click"
  >
    <div v-if="props?.loading" class="flex gap-2">
      <div
        class="h-5 w-5 animate-spin rounded-full border-2 border-(--btt-bg)/40 border-t-(--btt-bg)"
      ></div>
      Loading...
    </div>
    <div v-else class="flex items-center justify-center gap-2">
      <VueIcon v-if="props.icon" :name="props?.icon" class="size-5" />
      {{ props.label }}
    </div>
  </button>
</template>
<script setup lang="ts">
import VueIcon from "@kalimahapps/vue-icons/VueIcon";

const props = defineProps<{
  label: string;
  variant: "primary" | "secondary" | "ghost";
  loading?: boolean;
  type: "submit" | "button";
  icon?: any;
  click?: () => any;
  w?: string;
}>();
</script>
