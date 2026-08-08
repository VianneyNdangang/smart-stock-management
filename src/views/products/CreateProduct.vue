<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="xl">
        <div class="max-w-sm max-h-md md:max-h-2xl md:max-w-2xl p-5">
          <h1 class="text-2xl font-bold text-(--text-secondary)">
            {{ props.product ? `Modify product` : `New product` }}
          </h1>
          <div class="flex flex-col items-center justify-center w-full">
            <!-- <div class="mt-4 text-sm text-slate-600 w-full dark:text-gray-300">
        <p>Veuillez vous connecter pour continuer.</p>
        <p class="text-sm">Saisissez vos identifiants</p>
      </div> -->

            <form @submit.prevent="onSubmit()" class="mt-4 w-lg">
              <section>
                <div
                  class="flex flex-col justify-center items-center gap-0 md:gap-2"
                >
                  <Input
                    placeholder="Product Name"
                    type="text"
                    name="productName"
                    label="Product Name"
                    v-model="productName"
                    :error="errors.productName"
                  />
                  <Combobox
                    v-model="categoryId"
                    name="parentId"
                    label="Category Level 1"
                    placeholder="Sélectionner une categorie"
                    :options="categoriesOptions"
                    :error="errors.categoryId"
                  />
                </div>
              </section>
              <section>
                <div class="flex justify-between items-center gap-0 md:gap-2 my-2">
                  <p v-if="!perishable" class="text-lg font-semibold">
                    Switch if the product is perishable
                  </p>
                  <p v-if="perishable" class="text-lg font-semibold text-(--success)">
                    Perishable Product
                  </p>
                  <Switch v-model="perishable" />
                </div>
              </section>
              <section>
                <div
                  class="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-2"
                >
                  <Input
                :model="imageUrl"
                type="image"
                name="image"
                label="Photo de profil"
                :error="errors.imageUrl"
              />
                </div>
              </section>
              <section>
                <div
                  class="flex flex-col justify-center items-center gap-1 md:gap-3 mb-2"
                >
                  <Textarea
                    placeholder="Specification"
                    name="specification"
                    label="Specification"
                    v-model="specification"
                    :error="errors.specification"
                  />
                  <Textarea
                    placeholder="description"
                    name="description"
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
                  :label="props.product ? `Modify` : `Creat`"
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
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import Input from "@/components/input/Input.vue";
import Button from "@/components/button/Button.vue";
import Modal from "@/components/molecules/Modal.vue";
import Card from "@/components/card/Card.vue";
import { useToastStore } from "@/store/toastStore";
import { useproductStore } from "@/store/productsStore";
import Switch from "@/components/switch/Switch.vue";
import Textarea from "@/components/texterea/Textarea.vue";
import { createProductSchema } from "@/handler/productsHandler";
import Combobox from "@/components/combobox/Combobox.vue";
import { usecategoriesStore } from "@/store/categoryStore";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";

const props = defineProps<{
  product?: any;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(createProductSchema),
  initialValues: {
    productName: props.product ? props.product?.productName : "",
    description: props.product ? props.product?.description : "",
    specification: props.product ? props.product?.specification : "",
    perishable: props.product ? props.product?.perishable :false,
     imageUrl: props.product? props.product.imageUrl : "",
    categoryId: props.product ? props.product?.categoryId : "",
    // brandId: props.product ? props.product.brandId : "",
  },
});
const store = useproductStore();

const [productName] = defineField("productName");
const [description] = defineField("description");
const [specification] = defineField("specification");
const [perishable] = defineField("perishable");
// const [perishableDate] = defineField("perishableDate");
const [categoryId] = defineField("categoryId");
const [imageUrl] = defineField("imageUrl");
// const [brandId] = defineField("brandId");

onMounted(() => usecategoriesStore().fetchCategories());
const { categories } = storeToRefs(usecategoriesStore());
const categoriesOptions = computed(() =>
  (categories.value ?? []).map((category) => ({
    label: category.categoryName,
    value: category.id,
  })),
);
const toast = useToastStore();
const onSubmit = handleSubmit(async (values) => {
  try {
    await store.createProducts(values, props?.product?.id);
    store.fetchProducts();
    emit("close");
    resetForm();
    if (props.product.id) {
      toast.show(
        "Operation effectuée avec succes",
        "success",
        "Le produit " +
          props.product.productName +
          " a ete modifié avec succes",
      );
    } else {
      toast.show(
        "Operation effectuée avec succes",
        "success",
        "Le produit " + values.productName + " a ete créé avec succes",
      );
    }
  } catch (error) {
    toast.show("Echec de l'operation", "danger", "");
  }
});
</script>
