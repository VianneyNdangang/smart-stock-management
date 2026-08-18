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
          name="status"
          label="Status"
          placeholder="Sélectionnez un rôle"
          :options="[
            { label: 'All', value: 'all' },
            { label: 'Actif', value: 'actif' },
            { label: 'Inactive', value: 'inactive' },
          ]"
        />
        <Input type="text" name="level" label="Level" v-model="level" />
        <Combobox
          endpoint="products"
          optionLabel="productName"
          optionValue="id"
          v-model="productId"
          name="productName"
          label="Product name"
          placeholder="Select a product name"
        />
      </div>
      <div
        class="flex flex-col md:flex-row justify-center md:justify-end items-end gap-3 pl-0 md:pl-6 w-full md:w-1/3"
      >
        <Select
          v-model="limit"
          name="items"
          label="Items per page"
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
import Combobox from "@/components/combobox/Combobox.vue";
import Input from "@/components/input/Input.vue";
import Select from "@/components/select/Select.vue";
// import Tooltip from "@/components/tooltip/Tooltip.vue";
import { filterCategorySchema } from "@/handler/categoriesHandler";
import { usecategoriesStore } from "@/store/categoryStore";
import { IconFilter } from "@tabler/icons-vue";
import { toTypedSchema } from "@vee-validate/zod";
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";

const store = usecategoriesStore();
const { pagination } = storeToRefs(store);

const { defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(filterCategorySchema),
  initialValues: {
    isActif: "all" ,
    productId: "",
    level: "",
    limit: pagination.value.limit,
  },
});
const [isActif] = defineField("isActif");
const [productId] = defineField("productId");
const [level] = defineField("level");
const [limit] = defineField("limit");

const loading = ref(false);

const onSubmit = handleSubmit(async(values) => {
  loading.value = true;
  try {
    await store.filterCategories(values);
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
</script>
