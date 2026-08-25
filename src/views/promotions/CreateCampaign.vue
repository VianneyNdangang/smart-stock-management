<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="2xl">
        <div class="max-h-md md:max-h-2xl md:min-w-xl p-5">
          <h1 class="text-2xl font-bold text-(--text-secondary)">
            {{ props.campaign ? `Modify campaign` : `New campaign` }}
          </h1>
          <div class="flex flex-col items-center w-full">
            <form @submit.prevent="onSubmit()" class="mt-4 w-full">
              <section>
                <div class="flex flex-col justify-center items-center gap-3">
                  <div class="flex flex-col w-full">
                    <div class="flex justify-between items-center w-full">
                      <span>{{ fields.length }} Produit</span>
                      <Button
                        name="addProduct"
                        type="button"
                        variant="ghost"
                        label="Ajouter un produit"
                        :click="
                          () => {
                            push({ name: '', units: 1 });
                          }
                        "
                      />
                    </div>
                    <p
                      v-if="errors.products"
                      class="flex justify-start text-xs text-(--danger) w-full"
                    >
                      {{ errors.products }}
                    </p>
                  </div>

                  <Input
                    placeholder="campaign Name"
                    type="text"
                    name="campaignName"
                    label="campaign Name"
                    v-model="campaignName"
                    :error="errors.campaignName"
                  />
                  <Combobox
                    endpoint="type"
                    optionLabel="typeName"
                    optionValue="id"
                    v-model="typeId"
                    name="typeId"
                    label="Campaign type"
                    placeholder="Select a campaign type"
                    :error="errors.TypeId"
                  />
                  <div
                    class="w-full max-h-50 overflow-scroll scrollbar-none p-1 border rounded"
                  >
                    <div
                      v-for="(field, index) in fields"
                      :key="field.key"
                      class="grid grid-cols-2 gap-2 mb-3 w-full border rounded p-1"
                    >
                      <Combobox
                        endpoint="products"
                        optionLabel="productName"
                        optionValue="id"
                        v-model="field.value.productId"
                        name="productId"
                        label="Product"
                        placeholder="Select a product"
                        :error="errors[`products[${index}].productId`]"
                      />

                      <Input
                        placeholder="Quantity"
                        type="number"
                        name="units"
                        label="Units"
                        v-model="field.value.units"
                        :error="errors[`products[${index}].units`]"
                      />
                      <IconX
                        @click="remove(index)"
                        class="text-(--danger) cursor-pointer"
                      />
                      <!-- <button type="button" @click="remove(index)" class="">
                        Supp
                      </button> -->
                    </div>
                  </div>
                </div>
              </section>
              <div class="flex justify-end items-center gap-3 w-full mt-8">
                <Button
                  name="cancel"
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
                  name="creat"
                  variant="primary"
                  type="submit"
                  :label="props.campaign ? `Modify` : `Creat`"
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
import Button from "@/components/button/Button.vue";
import Card from "@/components/card/Card.vue";
import Combobox from "@/components/combobox/Combobox.vue";
import Input from "@/components/input/Input.vue";
import Modal from "@/components/molecules/Modal.vue";
import { createCampaignsSchema } from "@/handler/campaignHandler";
import { useCampaignsStore } from "@/store/campaignsStore";
import { useToastStore } from "@/store/toastStore";
import { IconX } from "@tabler/icons-vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useFieldArray, useForm } from "vee-validate";
import { ref } from "vue";
// import { useI18n } from "vue-i18n";

// const {t} = useI18n()
const props = defineProps<{
  campaign?: any;
  isOpen: boolean;
}>();

type Product = {
  productId: string;
  units: number;
};

type CampaignForm = {
  campaignName?: string;
  typeId?: string;
  products: Product[];
};

const emit = defineEmits<{
  (e: "close"): void;
}>();
const { defineField, errors, handleSubmit, resetForm } = useForm<CampaignForm>({
  validationSchema: toTypedSchema(createCampaignsSchema),
  initialValues: {
    campaignName: props.campaign ? props.campaign.campaignName : "",
    typeId: props.campaign ? props.campaign.typeId : "",
    products: [
      {
        productId: "a",
        units: 1,
      },
    ],
  },
});
const store = useCampaignsStore();
const [campaignName] = defineField("campaignName");
const [typeId] = defineField("typeId");
const { fields, push, remove } = useFieldArray("products");

const loading = ref(false);
const toast = useToastStore();

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    const data = {
      campaignName: values.campaignName,
      typeId: values.typeId,
      products: values.products,
    };
    store.createCampaigns(data);
    store.fetchCampaigns();
    emit("close");
    resetForm();
    toast.show(
      "Operation effectuée avec succes",
      "success",
      "La categorie " + data.campaignName + " a ete créé avec succes",
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
