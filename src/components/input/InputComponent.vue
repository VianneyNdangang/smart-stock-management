<template>
  <div class="space-y-1">
    <label :for="props.name" class="text-sm font-medium">
      {{ props.label }}
    </label>

    <div class="relative">
      <input
        v-if="type === 'text'"
        v-model="model"
        :type="props.type"
        :name="props.name"
        :placeholder="props.placeholder"
        class="w-full rounded border bg-(--input-bg) py-1 pl-3 placeholder:text-gray-500 focus:outline-none"
        :class="props.error ? 'border-(--danger)' : 'border-(--border)'"
      />

      <!-- <button v-if="props.placeholder === `Search ...`" type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <VueIcon :name="props.icon" />
                <IconSearch stroke={2} />
            </button> -->

      <input
        v-if="type === 'number'"
        v-model="model"
        :type="props.type"
        :name="props.name"
        :placeholder="props.placeholder"
        class="w-full rounded border bg-(--input-bg) py-1 pl-3 placeholder:text-gray-500 focus:outline-none"
        :class="props.error ? 'border-(--danger)' : 'border-(--border)'"
      />

      <div
        v-if="type === 'password'"
        class="flex justify-center items-center w-full rounded border bg-(--input-bg)"
        :class="props.error ? 'border-(--danger)' : 'border-(--border)'"
      >
        <input
          v-model="model"
          :type="showPassword ? 'text' : 'password'"
          :name="props.name"
          :placeholder="props.placeholder"
          class="w-full py-1 pl-3 placeholder:text-gray-500 focus:outline-none"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="adsolute p-2 cursor-pointer"
        >
          <AkEyeOpen v-if="!showPassword" /><AkEyeClosed v-if="showPassword" />
        </button>
      </div>
    </div>

    <p class="text-xs text-(--danger)">
      {{ props.error }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { AkEyeClosed, AkEyeOpen } from "@kalimahapps/vue-icons";
import { ref } from "vue";

// import { IconSearch } from '@tabler/icons-vue';

const showPassword = ref(false);
const model = defineModel<string>();
const props = defineProps<{
  label?: string;
  type: "email" | "password" | "text" | "number";
  name: string;
  placeholder: string;
  error?: string;
  icon?: any;
}>();
</script>
