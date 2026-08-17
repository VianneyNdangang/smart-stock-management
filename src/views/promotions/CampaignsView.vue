<template>
  <div
    class="flex flex-col gap-5 transition-all duration-300"
    :class="rSidebarStore.isSidebar ? `ml-20` : ``"
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
          deleteUrl="/campaign"
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

  <Createcampaign
  :campaign="selectedcampaign"
  :isOpen="isCreatecampaign"
  @close="()=>isCreatecampaign = false"
  />
  <DeleteData
    :name="selectedcampaign?.campaignName"
    :id="selectedcampaign?.id"
    :loading="isLoading"
    message="Cette action supprimera définitivement cet utilisateur ainsi que les données qui lui sont associées. Cette opération est irréversible. Voulez-vous continuer ?"
    :title="`Supprimer le produit ${selectedcampaign?.campaignName ?? ''}`"
    :isOpen="isDeleteData"
    @close="
      () => {
        isDeleteData = false;
        selectedcampaign = null;
      }
    "
    :action="() => handleDelete"
  />
  <RightSideBare>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-lg text-(--text-primary)">
        {{ selectedcampaign?.campaignName }}
      </h1>
      <div class="border rounded border-(--border)">
        <img src="#" class="h-50 w-50" />
      </div>
    </div>
  </RightSideBare>
</template>
<script setup lang="ts">
import { ref, onMounted, h, computed, onUnmounted } from "vue";
import { useI18n } from 'vue-i18n'
import { useCampaignsStore } from "@/store/campaignsStore";
import PageHeader from "@/components/molecules/PageHeader.vue";
import { IconEdit, IconListDetailsFilled, IconSpeakerphone, IconTrash } from "@tabler/icons-vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import { storeToRefs } from "pinia";
import DeleteData from "../delateData/DeleteData.vue";
import RightSideBare from "@/components/sideBar/RightSideBare.vue";
// import Button from "@/components/button/Button.vue";
import { useRSidebarStore } from "@/store/rSideBareStore.ts";
import { useToastStore } from "@/store/toastStore.ts";
// import Createcampaign from "./Createcampaign.vue";
import { useRouter } from "vue-router";
import type { TTableheaders } from "@/components/dataTable/type.ts";

const campaignStore = useCampaignsStore();
const rSidebarStore = useRSidebarStore();
const toast = useToastStore();
onMounted(async () => {
  await campaignStore.fetchCampaigns();
  isLoading.value = campaignStore.loading;
});
onUnmounted(() => {
  rSidebarStore.isSidebar = false;
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
const isDeleteData = ref(false);

const { t } = useI18n()

const newcampaign = {
  label: t('users.new'),
  action: () => (isCreatecampaign.value = true),
  icon: IconSpeakerphone
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "createdAt",
    name: () => t('campaigns.columns.createdAt'),
    render: (record: any) =>
      // record?.role
      h(FormateDate, {
        date: record.createdAt || "-",
      }),
    width: "12%",
  },
  {
    textAlign: "left",
    accessor: "campaignName",
    name: () => t('campaigns.columns.campaignName'),
    render: (record: any) => (record?.campaignName ? record?.campaignName : "-"),
    width: "20%",
  },
  {
    textAlign: "left",
    accessor: "specification",
    name: () => t('campaigns.columns.specification'),
    render: (record: any) =>
      record?.specification ? record?.specification : "-",
    width: "25%",
  },
  {
    textAlign: "left",
    accessor: "description",
    name: () => t('campaigns.columns.description'),
    render: (record: any) => (record?.description ? record?.description : "-"),
    width: "25%",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: () => t('campaigns.columns.actions'),
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconListDetailsFilled, {
          // stroke: {1.75}
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
        h(IconTrash, {
          size: 18,
          class: "cursor-pointer text-(--danger) hover:text-red-700",
          onClick: () => {
            selectedcampaign.value = record;
            isDeleteData.value = true;
          },
        }),
      ]),
    width: "auto",
  },
];

const handleDelete = async () => {
  isLoading.value = true;
  try {
    await campaignStore.deleteCampaigns(selectedcampaign.value.id);
    isDeleteData.value = false;
    toast.show(
      "Opperation effectuer",
      "success",
      "Le produit " + selectedcampaign.value.campaignName + " a ete supprime",
    );
  } catch (error) {
    toast.show(
      "Echec de l'opperation",
      "danger",
      "Le produit " +
        selectedcampaign.value.campaignName +
        " n'a pas ete supprime",
    );
  } finally {
    isLoading.value = false;
  }
};
</script>
