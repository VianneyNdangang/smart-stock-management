<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="xl">
        <div class="max-w-sm max-h-md md:max-h-2xl md:max-w-2xl p-5">
          <h1 class="text-2xl font-bold text-(--text-secondary)">{{props.user? `Modify User`: `New User`}}</h1>
          <div class="flex flex-col items-center justify-center w-full">
            <!-- <div class="mt-4 text-sm text-slate-600 w-full dark:text-gray-300">
        <p>Veuillez vous connecter pour continuer.</p>
        <p class="text-sm">Saisissez vos identifiants</p>
      </div> -->

            <form @submit.prevent="onSubmit()" class="mt-4 w-full">
              <section>
                <p class="text-xs text-(--secondary) font-semibold">Personnal</p>
                <div
                  class="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-2"
                >
                  <Input
                    placeholder="Username"
                    type="text"
                    name="firstName"
                    label="First Name"
                    v-model="firstName"
                    :error="errors.firstName"
                  />
                  <Input
                    placeholder="Username"
                    type="text"
                    name="lastName"
                    label="Last Name"
                    v-model="lastName"
                    :error="errors.lastName"
                  />
                </div>
                <div>
                  <Input
                    placeholder="User Name"
                    type="text"
                    name="userName"
                    label="User Name"
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
                    placeholder="example@gmail.com"
                    type="email"
                    name="email"
                    label="Email"
                    v-model="email"
                    :error="errors.email"
                  />
                  <Input
                    placeholder="+237 6..."
                    type="text"
                    name="phone"
                    label="Phone number"
                    v-model="phone"
                    :error="errors.phone"
                  />
                </div>
              </section>
              <section>
                <p class="text-xs text-(--secondary) font-semibold mt-5">Profil</p>
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
                    label="Rôle"
                    placeholder="Sélectionnez un rôle"
                    :options="[
                      { label: 'Administrator', value: 'admin' },
                      { label: 'Category Manager', value: 'CategoryManager' },
                      { label: 'Foot Worker', value: 'FootWorker' },
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
                    placeholder="*******"
                    type="password"
                    name="password"
                    label="Password"
                    v-model="password"
                    :error="errors.password"
                    :icon="IconSearch"
                  />
                  <Input
                    placeholder="*******"
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    v-model="confirmPassword"
                    :error="errors.confirmPassword"
                    :icon="IconSearch"
                  />
                </div>
              </section>
              <div class="flex justify-end items-center gap-3 w-full mt-8">
                <Button
                  variant="secondary"
                  type="button"
                  label="Cancel"
                  w="40"
                  :click="() => {emit('close'); resetForm()}"
                />
                <Button
                  variant="primary"
                  type="submit"
                  :label="props.user?`Modify`: `Creat`"
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

const props = defineProps<{
  user?: any;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(createUserSchema),
  initialValues: {
    userName: props.user ? props.user.userName : "",
    firstName: props.user ? props.user.firstName : "",
    lastName: props.user ? props.user.lastName : "",
    email: props.user ? props.user.email : "",
    phone: props.user ? props.user.phone : "",
    //  image: props.user? props.user.image : "",
    role: props.user ? props.user.role : "",
    confirmPassword: props.user ? props.user.confirmPassword : "",
    password: props.user ? props.user.password : "",
  },
});
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
const toast = useToastStore()
const onSubmit = handleSubmit(async (values) => {
  try {
     await store.createUser(values, props?.user?.id);
  store.fetchUsers();
  emit('close')
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
    toast.show(
            "Echec de l'operation",
            "danger",
            "",
          );
  }
 
});
</script>
