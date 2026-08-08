<template>
  <div class="flex flex-col gap-5">
    <PageHeader
      title="Stock Entries"
      subtitle="Manage stock entries and inventory"
      :refresh="async() => {await store.fetchstock()}"
      :new="newUser"
    />
    <div class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-5">
      <DataSommary title="Batches" :value="pagination.total" state="success" />
      <!-- <DataSommary title="Total Administrators" :value="users.filter((u: any)=>u.role === 'admin').length" state="success" />
      <DataSommary title="Total Category Managers" :value="users.filter((u: any)=>u.role === 'CategoryManager').length" state="success" />
      <DataSommary title="Total Foot Workers" :value="users.filter((u: any)=>u.role === 'FootWorker').length" state="success" /> -->
    </div>
    <div>
      <!-- <LoadingView v-if="" /> -->
      <div class="flex">
       <DataTable
          title="batches"
          :records="batches"
          :headers="header"
          :total="pagination?.total"
          :loading="store.loading"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination?.hasNext"
          :hasPrev="pagination?.hasPrev"
          @changePage="handlePageChange"
        />
      </div>
    </div>
  </div>

  <DeleteData
  :action="()=>handleDelete"
    :id="selectedBatche?.id"
    :name="selectedBatche?.productName"
    message="Cette action supprimera définitivement cette batch ainsi que les données qui lui sont associées. Cette opération est irréversible. Voulez-vous continuer ?"
    title="Supprimer la batch"
    :isOpen="isDeleteData"
    @close="()=>{isDeleteData = false; selectedBatche = null}"
  />
</template>
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import PageHeader from "@/components/molecules/PageHeader.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { storeToRefs } from "pinia";
import { useStockStore } from "@/store/stockStore";
import { IconEdit, IconListDetailsFilled, IconTrash } from "@tabler/icons-vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import type { TTableheaders } from "@/components/dataTable/DataTable.vue";
import { useRouter } from "vue-router";
import DeleteData from "../delateData/DeleteData.vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import BarCode from "@/components/barCode/BarCode.vue";

const isCreateUser = ref(false);
const isDeleteData = ref(false)
const newUser = {
  label: "New User",
  action: () => (isCreateUser.value = true),
};
const router = useRouter();

const selectedBatche = ref();
const isCreateBatche = ref(false);
const store = useStockStore();
const { batches } = storeToRefs(store);
const { pagination } = storeToRefs(store);
// const {loading} = storeToRefs(userStore);

const handleDelete = async () => {
  await store.deletestock(selectedBatche.value.id);
};
onMounted(async () => {
  await store.fetchstock();
});

const handlePageChange = async (page: number) => {
  await store.fetchstock(page);
};

const header: TTableheaders[] = [
   {
    textAlign: "left",
    accessor: "batchName",
    name: "Batch Name",
    render: (record: any) => 
        h("p", {
          class: "text-(--text-primary)",
        },
      (record?.batchName ? record?.batchName : "-")),
    width: "15%",
  },
  {
    textAlign: "left",
    accessor: "createdAt",
    name: "Created At",
    render: (record: any) =>
      // record?.role
      h(FormateDate, {
        date: record.createdAt || "-",
      }),
    width: "15%",
  },
  {
    textAlign: "left",
    accessor: "units",
    name: "Units",
    render: (record: any) =>
      record?.units ? record?.units : "-",
    width: "10%",
  },
  {
    textAlign: "left",
    accessor: "barcode",
    name: "Barcode",
    render: (record: any) => 
    (
      h(BarCode, {
        value: record?.barcode || "-",
      })),
    width: "auto",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: "Actions",
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconListDetailsFilled, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            router.push({ name: 'batch_detail', params: { id: record?.id } })
          },
        }),
        h(IconEdit, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            selectedBatche.value = record;
            isCreateBatche.value = true;
          },
        }),
        h(IconTrash, {
          size: 18,
          class: "cursor-pointer text-(--danger) hover:text-red-700",
          onClick: () => {
            selectedBatche.value = record;
            isDeleteData.value = true;
          },
        }),
      ]),
    width: "auto",
  },
];


</script>
