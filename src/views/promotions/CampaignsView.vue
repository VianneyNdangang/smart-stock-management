<template>
  <div
    class="flex flex-col gap-5"
  >
    <PageHeader
      title="campaigns"
      subtitle="Manage your campaign catalog, pricing, and inventory information."
      :refresh="
        async () => {
          await campaignStore.fetchCampaigns();
        }
      "
      :new="newcampaign"
      :loading="campaignStore.loading"
    />
    <div class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-5">
      <DataSommary
        title="Total campaigns"
        :value="campaigns.length"
        state="primary"
      />
      <DataSommary
        title="Active campaigns"
        :value="activecampaigns.length"
        state="success"
      />
      <DataSommary
        title="Non Active campaigns"
        :value="noncampaigns.length"
        state="warning"
      />
    </div>
    <div>
      <div class="flex flex-col gap-5">

        <DataTable
          title="Categories: Level 1"
          :records="campaigns"
          :headers="header"
          :total="pagination?.total"
          :loading="campaignStore.loading"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination?.hasNext"
          :hasPrev="pagination?.hasPrev"
          :changePage="handlePageChange"
        />

      </div>
    </div>
  </div>

  <!-- <Createcampaign
  :campaign="selectedcampaign"
  :isOpen="isCreatecampaign"
  @close="()=>isCreatecampaign = false"
  /> -->
</template>
<script setup lang="ts">
import { ref, onMounted, h, computed } from "vue";
import { useI18n } from 'vue-i18n'
import { useCampaignsStore } from "@/store/campaignsStore";
import PageHeader from "@/components/molecules/PageHeader.vue";
import { IconEdit, IconEye, IconSpeakerphone } from "@tabler/icons-vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import type { TTableheaders } from "@/components/dataTable/type.ts";

const campaignStore = useCampaignsStore();
onMounted(async () => {
  await campaignStore.fetchCampaigns();
  isLoading.value = campaignStore.loading;
});
const { campaigns } = storeToRefs(campaignStore);
const { pagination } = storeToRefs(campaignStore)
const isLoading = ref<boolean>(false);
const selectedcampaign = ref();

const activecampaigns = computed(() =>
  campaigns.value?.filter((u: any) => u.active),
);
const noncampaigns = computed(() =>
  campaigns.value.filter((u: any) => !u.active),
);

const handlePageChange = async (page: number) => {
  await campaignStore.fetchCampaigns(page);
};

const isCreatecampaign = ref(false);

const { t } = useI18n()

const newcampaign = {
  label: t('users.new'),
  action: () => (isCreatecampaign.value = true),
  icon: IconSpeakerphone
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "campaignName",
    name: () => t('campaigns.columns.campaignName'),
    render: (record: any) => (record?.campaignName ? record?.campaignName : "-"),
    width: "20%",
  },
  {
    textAlign: "left",
    accessor: "typeName",
    name: () => t('campaigns.columns.type'),
    render: (record: any) =>
      record?.type?.typeName ? record?.type?.typeName : "-",
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "totalProducts",
    name: () => t('campaigns.columns.totalProducts'),
    render: (record: any) => (record?.totalProducts ? record?.totalProducts : "-"),
    width: "auto",
  },
   {
    textAlign: "left",
    accessor: "startDate",
    name: () => t('campaigns.columns.startDate'),
    render: (record: any) =>
      h(FormateDate, {
        class: 'text-(--success) font-semibold',
        date: record.startDate || "-",
      }),
    width: "auto",
  },
   {
    textAlign: "left",
    accessor: "endDate",
    name: () => t('campaigns.columns.endDate'),
    render: (record: any) =>
      h(FormateDate, {
        class: 'text-(--warning) font-semibold',
        date: record.endDate || "-",
      }),
    width: "auto",
  },
   {
    textAlign: "left",
    accessor: "createdAt",
    name: () => t('campaigns.columns.createdAt'),
    render: (record: any) =>
      h(FormateDate, {
        date: record.createdAt || "-",
      }),
    width: "auto",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: () => t('campaigns.columns.actions'),
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconEye, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            useRouter().push(`/campaign-detail/${record.id}`);
          },
        }),
        h(IconEdit, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            selectedcampaign.value = record;
            isCreatecampaign.value = true;
          },
        }),
      ]),
    width: "auto",
  },
];
</script>
