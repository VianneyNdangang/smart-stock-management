<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="lg">
        <div class="max-w-sm max-h-md md:max-h-2xl md:max-w-2xl p-5">
          <h1 class="text-2xl font-bold text-(--text-secondary)">
            Update Your Password
          </h1>
          <div class="flex flex-col items-center justify-center w-full">
            <form @submit.prevent="onSubmit()" class="mt-4 w-full">
              <section>
                <p class="text-xs text-(--secondary) font-semibold mt-5">
                  Security
                </p>
                <div
                  class="flex flex-col justify-center items-center gap-1 md:gap-3 mb-2"
                >
                  <Input
                    :placeholder="t('form.password')"
                    type="password"
                    name="password"
                    :label="t('form.oldPassword')"
                    v-model="password"
                    :error="errors.password"
                    :icon="IconSearch"
                  />
                  <Input
                    :placeholder="t('form.newPassword')"
                    type="password"
                    name="newPassword"
                    :label="t('form.newPassword')"
                    v-model="newPassword"
                    :error="errors.newPassword"
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
import { updatePasswordSchema } from "@/handler/profileHanler";
import { ref } from "vue";
import { apiClient } from "@/store/api";
import { useToastStore } from "@/store/toastStore";
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  isOpen: boolean;
}>();

const loading = ref(false);
const emit = defineEmits<{
  (e: "close"): void;
}>();
const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(updatePasswordSchema),
});
const toast = useToastStore();

const [confirmPassword] = defineField("confirmPassword");
const [password] = defineField("password");
const [newPassword] = defineField("newPassword");
const message = ref<string>('')

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    const response = await apiClient.patch(`/profile`, values); 
    message.value = response.data?.message
    emit("close");
    toast.show(
      "Operation Effectuée",
      "success",
      message.value,
    );
    emit("close");
    resetForm();
  } catch (error) {
    toast.show(
      "Echec de l'operation",
      "danger",
      message.value,
    );
  } finally {
    loading.value = false;
  }
});
const { t } = useI18n();
</script>
