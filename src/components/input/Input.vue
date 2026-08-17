<template>
  <div class="w-full space-y-1">
    <label
      v-if="label"
      :for="name"
      class="text-sm font-medium text-(--text-primary)"
    >
      {{ label }}
    </label>

    <div
      v-if="type !== 'password' && type !== 'image' && type != 'date'"
      class="flex w-full rounded border  focus:border-(--border) justify-center h-9.5 items-center"
      :class="props.error ? 'border-(--danger)' : 'border-(--border)'"
    >
     <VueIcon v-if="props.icon" :name="props?.icon" class=" text-(--text-muted) pl-2" />
      <input
        v-model="model"
        :type="props.type"
        :name="props.name"
        :placeholder="props.placeholder"
        class="w-full bg-transparent text-sm py-1 md:py-2 px-3 placeholder:text-sm placeholder:text-(--text-muted) focus:outline-none"
      />
    </div>

    <!--Date-->

    <input
      v-if="type === 'date'"
      :id="name"
      v-model="model"
      type="date"
      :name="name"
      class="w-full rounded border py-2 px-3 transition-all placeholder:text-sm h-9.5 duration-200 outline-none text-(--text-secondary)"
      :class="[
        error
          ? 'border-(--danger)'
          : 'border-(--border) focus:border-(--secondary)',
      ]"
    />

    <!-- Password -->
    <div
      v-else-if="type === 'password'"
      class="flex w-full items-center rounded border h-9.5"
      :class="error ? 'border-(--danger)' : 'border-(--border)'"
    >
      <input
        v-model="model"
        :type="showPassword ? 'text' : 'password'"
        :name="name"
        :placeholder="placeholder"
        class="flex-1 bg-transparent text-sm px-3 placeholder:text-sm py-1 md:py-2 focus:outline-none"
      />

      <button name="visible" type="button" class="px-3" @click="showPassword = !showPassword">
        <AkEyeOpen v-if="!showPassword" />
        <AkEyeClosed v-else />
      </button>
    </div>

    <!-- Image -->
    <div
      v-if="type === 'image'"
      class="relative rounded border transition-all duration-200 h-9.5 overflow-hidden"
      :class="[error ? 'border-(--danger)' : 'border-(--border)']"
    >
      <label
        :for="name"
        class="flex flex-col items-center justify-center gap-2 py-6 cursor-pointer hover:bg-(--hover) transition-colors"
      >
        <img
          v-if="preview"
          :src="preview"
          alt="Preview"
          class="h-36 w-full object-cover"
        />

        <template v-else>
          <div
            class="h-16 w-16 rounded-full bg-(--hover) flex items-center justify-center"
          >
            📷
          </div>

          <span class="text-sm text-(--text-muted)"> Choisir une image </span>
        </template>

        <input
          :id="name"
          type="file"
          accept="image/*"
          class="hidden placeholder:text-sm"
          @change="handleFile"
        />
      </label>
    </div>

    <p v-if="error" class="text-xs text-(--danger)">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AkEyeClosed, AkEyeOpen } from "@kalimahapps/vue-icons";
import VueIcon from "@kalimahapps/vue-icons/VueIcon";

const showPassword = ref(false);

const model = defineModel<string | File>();

const props = defineProps<{
  label?: string;
  type: "text" | "email" | "password" | "number" | "image" | "date";
  name: string;
  placeholder?: string;
  error?: string;
  accept?: string;
  icon?: any
}>();

// const onFileChange = (event: Event) => {
//   const target = event.target as HTMLInputElement;

//   if (target.files?.length) {
//     model.value = target.files[0];
//   }
// };

// Image
const preview = ref("");

const handleFile = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const file = target.files?.[0];

  if (!file) return;

  model.value = file;

  preview.value = URL.createObjectURL(file);
};
</script>
