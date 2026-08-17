<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="xl">
        <div class="max-w-sm max-h-md md:max-h-2xl md:max-w-2xl p-5">
            <h1 class="text-2xl font-bold text-(--text-secondary)">
            {{ props.user ? t('users.modify') : t('users.new') }}
          </h1>
          <div class="flex flex-col items-center justify-center w-full">
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
              <section>
                <p class="text-xs text-(--secondary) font-semibold mt-5">
                  Profil
                </p>
                <div
                  class="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-2"
                >
                  <!-- <Input
                v-model="image"
                type="image"
                name="image"
                label="Photo de profil"
                :error="errors.image"
              /> -->
                  <Select
                    v-model="role"
                    name="role"
                    :label="t('form_extra.role')"
                    :placeholder="t('form_extra.role')"
                    :options="[
                      { label: t('roles.admin'), value: 'admin' },
                      { label: t('roles.categoryManager'), value: 'CategoryManager' },
                      { label: t('roles.footWorker'), value: 'FootWorker' },
                    ]"
                  />
                </div>
              </section>
              <section>
                <p class="text-xs text-(--secondary) font-semibold mt-5">
                  Security
                </p>
                <div
                  class="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-3 mb-2"
                >
                  <Input
                    :placeholder="t('form.password')"
                    type="password"
                    name="password"
                    :label="t('form.password')"
                    v-model="password"
                    :error="errors.password"
                    :icon="IconSearch"
                  />
                  <Input
                    :placeholder="t('form.confirmPassword')"
                    type="password"
                    name="confirmPassword"
                    :label="t('form.confirmPassword')"
                    v-model="confirmPassword"
                    :error="errors.confirmPassword"
                    :icon="IconSearch"
                  />
                </div>
              </section>
              <div class="flex justify-end items-center gap-3 w-full mt-8">
                <Button
                  name="cancel"
                  variant="secondary"
                  type="button"
                  :label="t('form.cancel')"
                  w="40"
                  :click="
                    () => {
                      emit('close');
                      resetForm;
                    }
                  "
                />
                <Button
                  name="creat"
                  variant="primary"
                  type="submit"
                  :label="props.user ? t('users.modify') : t('users.new')"
                  w="40"
                  :loading="store.loading"
                />
              </div>
            </form>
          </div>
        </div>
      </Card>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/userStore.ts";
import { useForm } from "vee-validate";
import { IconSearch } from "@tabler/icons-vue";
import { toTypedSchema } from "@vee-validate/zod";
import Input from "@/components/input/Input.vue";
import Button from "@/components/button/Button.vue";
import Modal from "@/components/molecules/Modal.vue";
import Card from "@/components/card/Card.vue";
import Select from "@/components/select/Select.vue";
import { createUserSchema } from "@/handler/usersHandler";
import { useToastStore } from "@/store/toastStore";
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  user?: any;
  isOpen: boolean;
}>();

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(createUserSchema),
  initialValues: {
    userName: props.user ? props.user?.userName : "",
    firstName: props.user ? props.user?.firstName : "",
    lastName: props.user ? props.user?.lastName : "",
    email: props.user ? props.user?.email : "",
    phone: props.user ? props.user?.phone : "",
    //  image: props.user? props.user.image : "",
    role: props.user ? props.user?.role : "",
    confirmPassword: props.user ? props.user?.confirmPassword : "",
    password: props.user ? props.user?.password : "",
  },
});

const emit = defineEmits<{
  (e: "close"): void;
}>();
const store = useUserStore();

const [userName] = defineField("userName");
const [firstName] = defineField("firstName");
const [lastName] = defineField("lastName");
const [email] = defineField("email");
const [phone] = defineField("phone");
// const [image] = defineField("image");
const [role] = defineField("role");
const [confirmPassword] = defineField("confirmPassword");
const [password] = defineField("password");
const toast = useToastStore();
const { t } = useI18n();
const onSubmit = handleSubmit(async (values) => {
  try {
    await store.createUser(values, props?.user?.id);
    store.fetchUsers();
    emit("close");
    resetForm();
    if (props.user.id) {
      toast.show(
        "Operation effectuée avec succes",
        "success",
        "L'utilisateur " + props.user.userName + " a ete modifié avec succes",
      );
    } else {
      toast.show(
        "Operation effectuée avec succes",
        "success",
        "L'utilisateur " + values.userName + " a ete créé avec succes",
      );
    }
  } catch (error) {
    toast.show("Echec de l'operation", "danger", "");
  }
});
</script>
