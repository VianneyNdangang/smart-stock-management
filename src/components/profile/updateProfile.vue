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
                <p class="text-xs text-(--btt-bg) font-semibold">Personnal</p>
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
                <p class="text-xs text-(--btt-bg) font-semibold mt-5">
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
              <!-- <section>
                <p class="text-xs text-(--btt-bg) font-semibold mt-5">Profil</p>
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
                <div class="w-full flex justify-center items-center">
                  <Button
                    variant="ghost"
                    type="button"
                    label="Update Password"
                    w="full"
                    :click="
                      () => {
                        isPass = true;
                      }
                    "
                  />
                </div>

                <div class="flex justify-end items-center gap-3 w-full">
                  <Button
                    variant="secondary"
                    type="button"
                    label="Cancel"
                    :click="
                      () => {
                        emit('close');
                        resetForm();
                      }
                    "
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    label="Update"
                    :loading="loading"
                  />
                </div>
              </div>
            </form>
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
import UpdatePwd from "./UpdatePwd.vue";
import { storeToRefs } from "pinia";

const props = defineProps<{
  isOpen: boolean;
}>();

const store = useProfileStore();
const {connectedUser} = storeToRefs(store);

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
  { immediate: true }
);

const [userName] = defineField("userName");
const [firstName] = defineField("firstName");
const [lastName] = defineField("lastName");
const [email] = defineField("email");
const [phone] = defineField("phone");
// const [image] = defineField("image");

const loading = ref(false)
const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  try {
    await store.updateProfile(values);
    emit('close')
  } catch (error) {

  }finally{loading.value=false}

});

const isPass = ref(false);
</script>
