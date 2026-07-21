<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center justify-center p-10 rounded-lg shadow-xl border border-gray-300 bg-gray-100 dark:shadow-md dark:shadow-gray-700/25  dark:border-gray-600 dark:bg-gray-800 w-md">
      <img src="/images.jpg" alt="Logo" class="h-16 w-auto rounded-full" />
      <h1 class="text-2xl font-bold text-slate-900 dark:text-gray-100">Connexion</h1>
      <div class="mt-4 text-sm text-slate-600 w-full dark:text-gray-300">
        <p>Veuillez vous connecter pour continuer.</p>
        <p class="text-sm">Saisissez vos identifiants</p>
      </div>

      <form @submit.prevent="onSubmit" class="mt-4 w-full gap-3">
        <div class=" mb-2">
          <InputComponent placeholder="Username" type="text" name="username" label="Username" v-model="username"
            :error="errors.username" />
        </div>
        <div class=" mb-4">
          <InputComponent placeholder="*******" type="password" name="password" label="Password" v-model="password"
            :error="errors.password" :icon="IconSearch"/>
        </div>
        <div class="mt-4">
          <Button variant="primary" type="submit" label="Login" bg="[#c79e46]" w="full" :icon="IconLogin2"
          :loading="log.loading" />
        </div>
        
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/userStore.ts";
import { useForm } from "vee-validate";
import { IconLogin2, IconSearch} from "@tabler/icons-vue";
import { loginSchema } from "@/handler/securityHandler";
import { toTypedSchema } from "@vee-validate/zod";
import InputComponent from "@/components/input/InputComponent.vue";
import Button from "@/components/button/Button.vue";

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});
const log = useUserStore();
const [username] = defineField("username");
const [password] = defineField("password");

const onSubmit = handleSubmit((values) => {
  console.log("valuesvalues",values)
  log.loginUser(values);
});
</script>
