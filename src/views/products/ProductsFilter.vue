<template>
  <form @submit.prevent="onSubmit">
    <div
      class="flex flex-col md:flex-row justify-between items-end w-full gap-3"
    >
      <div
        class="flex flex-col md:flex-row justify-center md:justify-start items-center w-full pr-0 md:pr-6 gap-3"
      >
        <Select
          v-model="isActif"
          name="isActif"
          label="Status"
          placeholder="Sélectionnez un rôle"
          :options="[
            { label: 'All', value: 'all' },
            { label: 'Actif', value: 'actif' },
            { label: 'Inactive', value: 'inactive' },
          ]"
        />
        <Select
          v-model="perishable"
          name="perishable"
          label="Type"
          placeholder="Sélectionnez un rôle"
          :options="[
            { label: 'All', value: 'all' },
            { label: 'perishable', value: 'perishable' },
            { label: 'Non perishable', value: 'nonperishable' },
          ]"
        />
        <!-- <Combobox
          endpoint="products"
          optionLabel="productName"
          optionValue="productName"
          v-model="productName"
          name="productName"
          label="Product name"
          placeholder="Select a product name"
        /> -->
      </div>
      <div
        class="flex flex-col md:flex-row justify-center md:justify-end items-end gap-3 pl-0 md:pl-6 w-full md:w-1/3"
      >
        <Select
          v-model="limit"
          name="items"
          label="Limit per page"
          :options="[
            { label: '20', value: 20 },
            { label: '52', value: 52 },
            { label: '100', value: 100 },
            { label: '200', value: 200 },
          ]"
        />

        <!-- <Tooltip text="Filter" position="bottom"> -->
        <Button
          name="filter"
          type="submit"
          variant="secondary"
          label="Filter"
          :loading="loading"
          :icon="IconFilter"
          w="full"
        />
        <!-- </Tooltip> -->
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import Select from "@/components/select/Select.vue";
// import Tooltip from "@/components/tooltip/Tooltip.vue";
import { filterProductSchema } from "@/handler/productsHandler";
import { useproductStore } from "@/store/productsStore";
import { IconFilter } from "@tabler/icons-vue";
import { toTypedSchema } from "@vee-validate/zod";
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";

const store = useproductStore();
const { pagination } = storeToRefs(store);

const { defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(filterProductSchema),
  initialValues: {
    isActif: "all" ,
    productName: "",
    perishable: "all",
    limit: pagination.value.limit,
  },
});
const [isActif] = defineField("isActif");
// const [productName] = defineField("productName");
const [perishable] = defineField("perishable");
const [limit] = defineField("limit");

const loading = ref(false);

const onSubmit = handleSubmit(async(values) => {
  loading.value = true;
  try {
    await store.filterProducts(values);
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
</script>
