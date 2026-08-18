<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-(--text-primary)">
    <section
      class="w-full h-scren flex flex-col justify-center text-center items-center p-4"
    >
      <h1 class=" text-(--background) text-2xl md:text-3xl font-black">
        Smart Stock Management Systeme
      </h1>
      <LoginAnimation />
    </section>
    <section
      class="flex justify-center rounded-t-4xl md:rounded-t-none rounded-l-none md:rounded-l-[100px] items-center w-full bg-(--surface)"
    >
      <!-- <Card w="lg"> -->
      <div
        class="flex flex-col items-center justify-center p-4 w-lg gap-1 md:gap-3"
      >
        <img src="/images/images.jpg" alt="Logo" class="h-20 w-auto rounded" />
        <h1
          class="text-(--text-primary) text-2xl md:text-3xl font-black mb-2 md:mb-5"
        >
          {{ t('auth.welcome') }}
        </h1>
        <h2
          class="text-(--text-secondary) text-lg md:text-xl font-bold text-center mb-2 md:mb-5"
        >
          {{ t('auth.signin') }}
        </h2>

        <!-- <div class=" text-sm w-full">
          <p>Veuillez vous connecter pour continuer.</p>
          <p class="text-sm text-(--text-secondary)">Saisissez vos identifiants</p>
        </div> -->

        <form @submit.prevent="onSubmit" class="w-full flex flex-col gap-y-5">
          <div class="mb-2">
            <Input
              :placeholder="t('form.email')"
              type="text"
              name="email"
              :label="t('form.email')"
              v-model="email"
              :error="errors.email"
            />
          </div>
          <div class="mb-4">
            <Input
              :placeholder="t('form.password')"
              type="password"
              name="password"
              :label="t('form.password')"
              v-model="password"
              :error="errors.password"
              :icon="IconSearch"
            />
          </div>
          <div class="">
            <Button
              name="login"
              variant="primary"
              type="submit"
              :label="t('auth.login')"
              w="full"
              :icon="IconLogin2"
              :loading="loading"
            />
          </div>
        </form>
      </div>
      <!-- </Card> -->
    </section>
  </div>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { IconLogin2, IconSearch } from "@tabler/icons-vue";
import { loginSchema } from "@/handler/securityHandler";
import { toTypedSchema } from "@vee-validate/zod";
import Input from "@/components/input/Input.vue";
import Button from "@/components/button/Button.vue";
import { useProfileStore } from "@/store/profilStore";
import { ref } from "vue";
import LoginAnimation from "./LoginAnimation.vue";
import { useI18n } from 'vue-i18n'

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});
const log = useProfileStore();
const [email] = defineField("email");
const [password] = defineField("password");
const loading = ref(false);

const onSubmit = handleSubmit((values) => {
  loading.value = true;
  try {
    log.loginUser(values);
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
const { t } = useI18n();
</script>
