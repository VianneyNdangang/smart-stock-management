<template>
  <form @submit.prevent="onSubmit">
    <div
      class="flex flex-col md:flex-row justify-between items-end w-full gap-3"
    >
      <div
        class="flex flex-col md:flex-row justify-center md:justify-start items-center w-full pr-0 md:pr-6 gap-3"
      >
        <Select
          v-model="status"
          name="status"
          label="Status"
          placeholder="Sélectionnez un statu"
          :options="[
            { label: t('sales.columns.status.all'), value: 'all' },
            { label: t('sales.columns.status.pending'), value: 'pending' },
            { label: t('sales.columns.status.completed'), value: 'completed' },
            { label: t('sales.columns.status.cancelled'), value: 'cancelled' },
          ]"
        />
        <Combobox
          endpoint="staff"
          optionLabel="userName"
          optionValue="userId"
          v-model="creator"
          name="creator"
          :label="t('sales.columns.createby')"
          placeholder="Select a user name"
        />
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
import Combobox from "@/components/combobox/Combobox.vue";
import Select from "@/components/select/Select.vue";
// import Tooltip from "@/components/tooltip/Tooltip.vue";
import { filterSalesSchema } from "@/handler/salesHandler";
import { useSalesStore } from "@/store/salesSotre";
import { IconFilter } from "@tabler/icons-vue";
import { toTypedSchema } from "@vee-validate/zod";
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const store = useSalesStore();
const { pagination } = storeToRefs(store);
const {t} = useI18n() 

const { defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(filterSalesSchema),
  initialValues: {
    status: "all" ,
    creator: "",
    limit: pagination.value.limit,
  },
});
const [status] = defineField("status");
const [creator] = defineField("creator");
const [limit] = defineField("limit");

const loading = ref(false);

const onSubmit = handleSubmit(async(values) => {
  loading.value = true;
  try {
    await store.filterSales(values);
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
</script>
