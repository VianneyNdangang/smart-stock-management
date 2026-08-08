<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="xl">
        <div class="max-w-sm max-h-md md:max-h-2xl md:min-w-xl p-5">
          <h1 class="text-2xl font-bold text-(--text-secondary)">
            {{ props.category ? `Modify Category` : `New Category` }}
          </h1>
          <div class="flex flex-col items-center w-full">
            <div
              v-if="!props.category"
              class="flex items-center w-full mt-4"
              :class="isLevel2 ? `justify-end` : `justify-between`"
            >
              <p v-if="!isLevel2" class="text-lg font-semibold">
                Switch to have the Level 2 category form
              </p>
              <Switch
                v-model="isLevel2"
                :activeIcon="IconCircleNumber2"
                :inactiveIcon="IconCircleNumber1"
              />
            </div>
            <form @submit.prevent="onSubmit()" class="mt-4 w-full">
              <section>
                <!-- <p class="text-xs text-(--secondary) font-semibold">Informations</p> -->
                <div class="flex flex-col justify-center items-center gap-2">
                  <Combobox
                    v-if="isLevel2"
                    v-model="parentId"
                    name="parentId"
                    label="Category Level 1"
                    placeholder="Sélectionner une categorie"
                    :options="options"
                    :error="errors.parentId"
                  />
                  <Input
                    placeholder="Category Name"
                    type="text"
                    name="categoryName"
                    label="category Name"
                    v-model="categoryName"
                    :error="errors.categoryName"
                  />
                  <Textarea
                    placeholder="Description"
                    type="text"
                    name="Description"
                    label="Description"
                    v-model="description"
                    :error="errors.description"
                  />
                </div>
              </section>
              <div class="flex justify-end items-center gap-3 w-full mt-8">
                <Button
                  variant="secondary"
                  type="button"
                  label="Cancel"
                  w="40"
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
                  :label="props.category ? `Modify` : `Creat`"
                  w="40"
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
import { toTypedSchema } from "@vee-validate/zod";
import Input from "@/components/input/Input.vue";
import Button from "@/components/button/Button.vue";
import Modal from "@/components/molecules/Modal.vue";
import Card from "@/components/card/Card.vue";
import { usecategoriesStore } from "@/store/categoryStore";
import { createCategorySchema } from "@/handler/categoriesHandler.ts";
import { computed, ref } from "vue";
import Textarea from "@/components/texterea/Textarea.vue";
import Combobox from "@/components/combobox/Combobox.vue";
import { storeToRefs } from "pinia";
import Switch from "@/components/switch/Switch.vue";
import { IconCircleNumber1, IconCircleNumber2 } from "@tabler/icons-vue";
import { useToastStore } from "@/store/toastStore";

const props = defineProps<{
  category?: any;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(createCategorySchema),
  initialValues: {
    categoryName: props.category ? props.category.categoryName : "",
    description: props.category ? props.category.description : "",
    parentId: props.category?.level === 2 ? props.category.parentId : "",
    isLevel2: false,
  },
});
const store = usecategoriesStore();
const { categories } = storeToRefs(store);
const options = computed(() =>
  categories.value
    .filter((category) => category.level === 1)
    .map((category) => ({
      label: category.categoryName,
      value: category.id,
    })),
);
const [categoryName] = defineField("categoryName");
const [description] = defineField("description");
const [parentId] = defineField("parentId");
const [isLevel2] = defineField("isLevel2");
const loading = ref(false);
const toast = useToastStore();

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  const data = ref();
  try {
    if (values.isLevel2) {
      data.value = {
        categoryName: values.categoryName,
        description: values.description,
        parentId: values.parentId,
      };
    } else {
      data.value = {
        categoryName: values.categoryName,
        description: values.description,
      };
    }
    store.createCategory(data.value, props.category?.id);
    store.fetchCategories();
    emit("close");
    resetForm();
    toast.show(
      "Operation effectuée avec succes",
      "success",
      "La categorie " + data.value.categoryName + " a ete créé avec succes",
    );
  } catch (error) {
    toast.show(
      "Erreur",
      "danger",
      "Une erreure est survenue lors de la creation",
    );
  } finally {
    loading.value = false;
  }
});
</script>
