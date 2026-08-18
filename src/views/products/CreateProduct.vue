<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="md">
        <div class=" max-h-md md:max-h-2xl p-5">
          <h1 class="text-lg md:text-2xl font-bold text-(--text-secondary)">
            {{ props.product ? t("products.modify") : t("products.new") }}
          </h1>
          <div class="flex flex-col items-center justify-center w-full">
            <form @submit.prevent="onSubmit()" class="mt-4 w-lg">
              <section>
                <div
                  class="flex flex-col justify-center items-center gap-0 md:gap-2"
                >
                  <Input
                    placeholder=""
                    type="text"
                    name="productName"
                    :label="t('products.form.productName')"
                    v-model="productName"
                    :error="errors.productName"
                  />
                  <Combobox
                    endpoint="brands"
                    optionLabel="brandName"
                    optionValue="id"
                    v-model="brandId"
                    name="categoryId"
                    :label="t('products.form.categoryLevel1')"
                    placeholder="type brand's name"
                    :error="errors.brandId"
                  />
                  <Combobox
                    endpoint="categories"
                    optionLabel="categoryName"
                    optionValue="id"
                    v-model="categoryId"
                    name="categoryId"
                    :label="t('products.form.categoryLevel1')"
                    placeholder="type category's name"
                    :error="errors.categoryId"
                  />
                </div>
              </section>
              <section>
                <div
                  class="flex justify-between items-center gap-0 md:gap-2 my-2"
                >
                  <p v-if="!perishable" class="text-lg font-semibold">
                    {{ t("products.form.perishableSwitch") }}
                  </p>
                  <p
                    v-if="perishable"
                    class="text-lg font-semibold text-(--success)"
                  >
                    {{ t("products.form.perishable") }}
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
                    :label="t('products.form.photo')"
                    :error="errors.imageUrl"
                  />
                </div>
              </section>
              <section>
                <div
                  class="flex flex-col justify-center items-center gap-1 md:gap-3 mb-2"
                >
                  <Textarea
                    placeholder=""
                    name="specification"
                    :label="t('products.form.specification')"
                    v-model="specification"
                    :error="errors.specification"
                  />
                  <Textarea
                    placeholder=""
                    name="description"
                    :label="t('products.form.description')"
                    v-model="description"
                    :error="errors.description"
                  />
                </div>
              </section>
              <div class="flex justify-end items-center gap-3 w-full mt-8">
                <Button
                  name="cancel"
                  variant="secondary"
                  type="button"
                  :label="t('common.cancel')"
                  w="36"
                  :click="
                    () => {
                      emit('close');
                      resetForm();
                    }
                  "
                />
                <Button
                  name="creat"
                  variant="primary"
                  type="submit"
                  :label="
                    props.product ? t('products.modify') : t('products.new')
                  "
                  w="36"
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
import { useI18n } from "vue-i18n";
import Combobox from "@/components/combobox/Combobox.vue";

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
    perishable: props.product ? props.product?.perishable : false,
    imageUrl: props.product ? props.product.imageUrl : "",
    categoryId: props.product ? props.product?.categoryId : "",
    brandId: props.product ? props.product.brandId : "",
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
const [brandId] = defineField("brandId");

const toast = useToastStore();
const { t } = useI18n();
const onSubmit = handleSubmit(async (values) => {
  try {
    await store.createProducts(values, props?.product?.id);
    store.fetchProducts();
    emit("close");
    resetForm();
    if (props.product.id) {
      toast.show(
        t("products.modifiedSuccess", { name: props.product.productName }),
        "success",
        "",
      );
    } else {
      toast.show(
        t("products.createdSuccess", { name: values.productName }),
        "success",
        "",
      );
    }
  } catch (error) {
    toast.show("Echec de l'operation", "danger", "");
  }
});
</script>
