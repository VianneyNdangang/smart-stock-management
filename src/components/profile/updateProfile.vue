<template>
  <div v-if="isOpen" class="z-100">
    <Modal>
      <Card w="xl">
        <div class="max-w-sm max-h-md md:max-h-2xl md:max-w-2xl p-5">
          <h1 class="text-2xl font-bold text-(--text-secondary)">
            Update Your Profile
          </h1>
          <div class="flex flex-col items-center justify-center w-full">
            <!-- <div class="mt-4 text-sm text-slate-600 w-full dark:text-gray-300">
        <p>Veuillez vous connecter pour continuer.</p>
        <p class="text-sm">Saisissez vos identifiants</p>
      </div> -->

            <form @submit.prevent="onSubmit()" class="mt-4 w-full">
              <section>
                <p class="text-xs text-(--secondary) font-semibold">
                  Personnal
                </p>
                <div
                  class="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-2"
                >
                  <Input
                    :placeholder="t('form.userName')"
                    type="text"
                    name="firstName"
                    :label="t('form.firstName')"
                    v-model="firstName"
                    :error="errors.firstName"
                  />
                  <Input
                    :placeholder="t('form.userName')"
                    type="text"
                    name="lastName"
                    :label="t('form.lastName')"
                    v-model="lastName"
                    :error="errors.lastName"
                  />
                </div>
                <div>
                  <Input
                    :placeholder="t('form.userName')"
                    type="text"
                    name="userName"
                    :label="t('form.userName')"
                    v-model="userName"
                    :error="errors.userName"
                  />
                </div>
              </section>
              <section>
                <p class="text-xs text-(--secondary) font-semibold mt-5">
                  Contacts
                </p>
                <div
                  class="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-2"
                >
                  <Input
                    :placeholder="t('form.email')"
                    type="email"
                    name="email"
                    :label="t('form.email')"
                    v-model="email"
                    :error="errors.email"
                  />
                  <Input
                    :placeholder="t('form.phone')"
                    type="text"
                    name="phone"
                    :label="t('form.phone')"
                    v-model="phone"
                    :error="errors.phone"
                  />
                </div>
              </section>
              <!-- <section>
                <p class="text-xs text-(--secondary) font-semibold mt-5">Profil</p>
                <div
                  class="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-2"
                >
                  <Input
                v-model="image"
                type="image"
                name="image"
                label="Photo de profil"
                :error="errors.image"
              />
                </div>
              </section> -->
              <div
                class="flex flex-col md:flex-row justify-between items-center gap-3 w-full mt-8"
              >
                <div class="flex justify-end items-center gap-3 w-full">
                  <Button
                    name="cancel"
                    variant="secondary"
                    type="button"
                    :label="t('form.cancel')"
                    :click="
                      () => {
                        emit('close');
                        resetForm();
                      }
                    "
                  />
                  <Button
                    name="update"
                    variant="primary"
                    type="submit"
                    :label="t('form.update')"
                    :loading="loading"
                  />
                </div>
              </div>
            </form>
            <div class="w-full flex justify-center items-center">
              <Button
                name="update"
                variant="ghost"
                type="button"
                :label="t('form.updatePassword')"
                w="full"
                :click="
                  () => {
                    isPass = true;
                  }
                "
              />
            </div>
          </div>
        </div>
      </Card>
    </Modal>
  </div>
  <UpdatePwd :isOpen="isPass" @close="isPass = false" />
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import Input from "@/components/input/Input.vue";
import Button from "@/components/button/Button.vue";
import Modal from "@/components/molecules/Modal.vue";
import Card from "@/components/card/Card.vue";
import { useProfileStore } from "@/store/profilStore";
import { updateProfileSchema } from "@/handler/profileHanler";
import { ref, watch } from "vue";
import { useI18n } from 'vue-i18n'
import UpdatePwd from "./UpdatePwd.vue";
import { storeToRefs } from "pinia";
import { apiClient } from "@/store/api.ts";
import { useToastStore } from "@/store/toastStore.ts";

const props = defineProps<{
  isOpen: boolean;
}>();

const store = useProfileStore();
const { connectedUser } = storeToRefs(store);

const emit = defineEmits<{
  (e: "close"): void;
}>();
const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(updateProfileSchema),
});
watch(
  connectedUser,
  (user) => {
    if (!user) return;
    resetForm({
      values: {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  },
  { immediate: true },
);

const [userName] = defineField("userName");
const [firstName] = defineField("firstName");
const [lastName] = defineField("lastName");
const [email] = defineField("email");
const [phone] = defineField("phone");
// const [image] = defineField("image");

const toast = useToastStore();
const loading = ref(false);
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    const response = await apiClient.patch(`/profile`, values);
    connectedUser.value = response.data;
    emit("close");
    toast.show(
      "Operation Effectuée",
      "success",
      "Votre Profile a ete mis a jours",
    );
  } catch (error) {
    toast.show(
      "Echec de l'operation",
      "danger",
      "Votre Profile n'a pas ete mis a jours",
    );
  } finally {
    loading.value = false;
  }
});

const isPass = ref(false);
const { t } = useI18n();
</script>
