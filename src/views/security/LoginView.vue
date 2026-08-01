<template>
  <div class="flex items-center justify-center h-full">
    <div class="flex flex-col items-center justify-center p-10 rounded-lg shadow-xl border border-gray-300 bg-gray-100 dark:shadow-md dark:shadow-gray-700/25  dark:border-gray-600 dark:bg-gray-800 w-md">
      <img src="/images.jpg" alt="Logo" class="h-16 w-auto rounded-full" />
      <h1 class="text-2xl font-bold text-slate-900 dark:text-gray-100">Connexion</h1>
      <div class="mt-4 text-sm text-slate-600 w-full dark:text-gray-300">
        <p>Veuillez vous connecter pour continuer.</p>
        <p class="text-sm">Saisissez vos identifiants</p>
      </div>

      <form @submit.prevent="onSubmit" class="mt-4 w-full gap-3">
        <div class=" mb-2">
          <Input placeholder="email" type="text" name="email" label="Email" v-model="email"
            :error="errors.email" />
        </div>
        <div class=" mb-4">
          <Input placeholder="*******" type="password" name="password" label="Password" v-model="password"
            :error="errors.password" :icon="IconSearch"/>
        </div>
        <div class="mt-4">
          <Button variant="primary" type="submit" label="Login" w="full" :icon="IconLogin2"
          :loading="loading" />
        </div>
        
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { IconLogin2, IconSearch} from "@tabler/icons-vue";
import { loginSchema } from "@/handler/securityHandler";
import { toTypedSchema } from "@vee-validate/zod";
import Input from "@/components/input/Input.vue";
import Button from "@/components/button/Button.vue";
import { useProfileStore } from "@/store/profilStore";
import { ref } from "vue";

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});
const log = useProfileStore();
const [email] = defineField("email");
const [password] = defineField("password");
const loading = ref(false)

const onSubmit = handleSubmit((values) => {
  loading.value = true
  try {
    log.loginUser(values);
  } catch (error) {
    
  }finally{loading.value = false}
  
});
</script>
