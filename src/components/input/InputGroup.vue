<template>
    <div
      class="flex w-full rounded border h-9.5 bg-(--input-bg) focus:border-(--border) border-(--border) items-center"
      :class="props.w? `w-${props.w}`: `w-full`"
    >
     <VueIcon :name="props?.icon" class=" text-(--text-muted) pl-2" />
      <input
        v-model="model"
        type="text"
        :name="props.name"
        :placeholder="props.placeholder"
        @input="props.onInput" 
        class="w-full bg-transparent text-sm py-1 md:py-2 px-3 placeholder:text-(--text-muted) focus:outline-none"
      />
      <button
      name="acttion"
    :class="[
      ` cursor-not-allowed:{props.loading} py-1.5 px-4 font-semibold h-full flex items-center justify-center`,
      props.loading
        ? `cursor-not-allowed bg-(--secondary)/50 text-white/70`
        : `cursor-pointer hover:bg-(--secondary-hover) bg-(--secondary) text-white`,
    ]"
    type="button"
    @click="props.click"
  >
    <Spiner v-if="props?.loading" size="sm" :responsif="true" />
    <div v-else class="flex items-center justify-center gap-2">
      <VueIcon v-if="props.icon" :name="props?.icon" class="size-5" />
       <p class=" hidden md:flex">{{ props.label }}</p>
    </div>
  </button>
    </div>
</template>
<script setup lang="ts">
import VueIcon from '@kalimahapps/vue-icons/VueIcon';
import Spiner from '../spiner/Spiner.vue';

const model = defineModel<string|null>()
const props = defineProps<{
    icon?:any;
    label?: string;
    placeholder: string;
    loading?: boolean;
    name?: string;
    click?: ()=>any;
    w?:string;
    onInput?: (event: Event) => void;
}>()
</script>