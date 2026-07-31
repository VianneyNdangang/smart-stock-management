<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="xl">
        <div class="max-w-sm max-h-md md:max-h-2xl md:max-w-2xl p-5">
          <h1 class="text-2xl font-bold text-(--text-secondary)">Update Your Password</h1>
          <div class="flex flex-col items-center justify-center w-full">
            <!-- <div class="mt-4 text-sm text-slate-600 w-full dark:text-gray-300">
        <p>Veuillez vous connecter pour continuer.</p>
        <p class="text-sm">Saisissez vos identifiants</p>
      </div> -->

            <form @submit.prevent="onSubmit()" class="mt-4 w-full">
              <section>
                <p class="text-xs text-(--btt-bg) font-semibold mt-5">
                  Security
                </p>
                <div
                  class="flex flex-col justify-center items-center gap-1 md:gap-3 mb-2"
                >
                  <Input
                    placeholder="*******"
                    type="password"
                    name="password"
                    label="Old Password"
                    v-model="password"
                    :error="errors.password"
                    :icon="IconSearch"
                  />
                  <Input
                    placeholder="*******"
                    type="password"
                    name="newPassword"
                    label="New Password"
                    v-model="newPassword"
                    :error="errors.newPassword"
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
                  :click="() => {emit('close'); resetForm()}"
                />
                <Button
                  variant="primary"
                  type="submit"
                  label="Update"
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
import { useForm } from "vee-validate";
import { IconSearch } from "@tabler/icons-vue";
import { toTypedSchema } from "@vee-validate/zod";
import Input from "@/components/input/Input.vue";
import Button from "@/components/button/Button.vue";
import Modal from "@/components/molecules/Modal.vue";
import Card from "@/components/card/Card.vue";
import { useProfileStore } from "@/store/profilStore";
import { updatePasswordSchema } from "@/handler/profileHanler";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(updatePasswordSchema)
});
const store = useProfileStore();


const [confirmPassword] = defineField("confirmPassword");
const [password] = defineField("password");
const [newPassword] = defineField('newPassword')

const onSubmit = handleSubmit(async (values) => {
  await store.updateProfile(values);
  emit('close');
  resetForm();
});
</script>
