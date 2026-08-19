<template> 
<h3 class="text-(--text-primary) font-bold text-lg flex justify-center items-center ">Filter</h3>
  <form @submit.prevent="onSubmit">
   
      <div
        class="flex flex-col justify-center md:justify-start p-3 items-center w-full gap-3"
      >
        <Select
          v-model="status"
          name="isActif"
          label="Status"
          placeholder="Sélectionnez un rôle"
          :options="[
            { label: 'All', value: 'all' },
            { label: 'Actif', value: 'actif' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Inactive', value: 'inactive' },
          ]"
        />
        <Combobox
          endpoint="type"
          optionLabel="typeName"
          optionValue="typesName"
          v-model="type"
          name="type"
          label="Campaign type"
          placeholder="Type a campaign type"
        />
       
        <Input
          placeholder="t('form.email')"
          type="date"
          name="email"
          label="Starting date"
          v-model="startDate"
          :error="errors.startDate"
        />
        <Input
          placeholder="t('form.email')"
          type="date"
          name="email"
          label="Ending date"
          v-model="endDate"
          :error="errors.startDate"
        />
      <!-- </div> -->
      <!-- <div
        class="flex flex-col md:flex-row justify-center md:justify-end items-end gap-3 pl-0 md:pl-6 w-full md:w-1/3"
      > -->
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
        <Button
          name="filter"
          type="submit"
          variant="secondary"
          label="Filter"
          :loading="loading"
          :icon="IconFilter"
          w="full"
        />
    </div>
  </form>
</template>
<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import Combobox from "@/components/combobox/Combobox.vue";
import Input from "@/components/input/Input.vue";
import Select from "@/components/select/Select.vue";
import { filterCampaignsSchema } from "@/handler/campaignHandler";
import { useCampaignsStore } from "@/store/campaignsStore";
import { IconFilter } from "@tabler/icons-vue";
import { toTypedSchema } from "@vee-validate/zod";
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";

const store = useCampaignsStore();
const { pagination } = storeToRefs(store);

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(filterCampaignsSchema),
  initialValues: {
    status: "all",
    startDate: undefined,
    endDate: undefined,
    type: undefined,
    limit: pagination.value.limit,
  },
});
const [status] = defineField("status");
const [startDate] = defineField("startDate");
const [endDate] = defineField("endDate");
const [type] = defineField("type");
const [limit] = defineField("limit");

const loading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  console.log("valuesvaluesvalues", values);
  loading.value = true;
  try {
    store.filterCampaigns(values);
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
</script>
