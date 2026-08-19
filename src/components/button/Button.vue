<template>
  <!-- Primary Button -->

  <button
    v-if="variant === 'primary'"
    :name="name"
    :class="[
      ` w-${props.w}`,
      ` cursor-not-allowed:{props.loading} h-9.5 py-1.5 px-4 rounded font-semibold  flex items-center justify-center`,
      props.loading
        ? `cursor-not-allowed bg-(--secondary)/50 text-white/70`
        : `cursor-pointer hover:bg-(--secondary-hover) bg-(--secondary) text-white`,
    ]"
    @type="[props.type]"
    @click="props.click"
  >
    <Spiner v-if="props?.loading" size="sm" :responsif="responsif"/>
    <div v-else class="flex items-center justify-center gap-2">
      <VueIcon v-if="props.icon" :name="props?.icon" class="size-5" />
      <p :class="responsif?` hidden md:flex`:`flex`">{{ props.label }}</p>
    </div>
  </button>

  <!-- Secondary Button -->
  <button
    v-if="variant === 'secondary'"
    :name="name"
    :class="[
      ` w-${props.w}`,
      `border-2  cursor-not-allowed:{props.loading} py-1 px-3 h-9.5 rounded font-semibold flex items-center justify-center`,
      props.loading
        ? `cursor-not-allowed border-(--secondary)/50 text-(--secondary)/50`
        : `cursor-pointer hover:bg-(--secondary)/20  border-(--secondary) text-(--secondary)`,
    ]"
    @type="[props.type]"
    @click="props.click"
  >
    <Spiner v-if="props?.loading" size="sm" :responsif="responsif"/>
    <div v-else class="flex items-center justify-center gap-2">
      <VueIcon
        v-if="props.icon"
        :name="props.icon"
        class="size-5"
      />
      <p :class="responsif?` hidden md:flex`:`flex`">{{ props.label }}</p>
    </div>
  </button>

  <!-- Ghost Button -->
  <button
    v-if="variant === 'ghost'"
    :name="name"
    :disabled="props?.disabled"
    :class="[
      `w-${props.w}`,
      ` cursor-not-allowed:{props.loading} py-1.5 px-4 rounded h-9.5 font-semibold flex items-center justify-center`,
      props.loading || props.disabled
        ? `cursor-not-allowed text-(--secondary)/50`
        : `cursor-pointer text-(--secondary) hover:bg-(--secondary)/20 `,
    ]"
    @type="[props.type]"
    @click="props.click"
  >
    <Spiner v-if="props?.loading" size="sm" :responsif="responsif"/>
    <div v-else class="flex items-center justify-center gap-2">
      <VueIcon v-if="props.icon" :name="props?.icon" class="size-5" />
      <p :class="responsif?` hidden md:flex`:`flex`">{{ props.label }}</p>
    </div>
  </button>
</template>
<script setup lang="ts">
import VueIcon from "@kalimahapps/vue-icons/VueIcon";
import Spiner from "../spiner/Spiner.vue";

const props = withDefaults(defineProps<{
  label?: string;
  variant: "primary" | "secondary" | "ghost";
  loading?: boolean;
  name: string;
  type: "submit" | "button";
  icon?: any;
  disabled?: boolean;
  click?: () => any;
  w?: string;
  responsif?: boolean;
}>(),{
  responsif: false
});
</script>
