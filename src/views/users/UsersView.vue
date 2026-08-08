<template>
  <div class="flex flex-col gap-5">
    <PageHeader
      title="Users"
      subtitle="Manage user accounts, permissions, and access le"
      :refresh="async() => {await userStore.fetchUsers()}"
      :new="newUser"
    />
    
    <div class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-5">
      <DataSommary title="Total Users" :value="users?.length" state="success" />
      <DataSommary title="Total Administrators" :value="users?.filter((u: any)=>u.role === 'admin').length" state="success" />
      <DataSommary title="Total Category Managers" :value="users?.filter((u: any)=>u.role === 'CategoryManager').length" state="success" />
      <DataSommary title="Total Foot Workers" :value="users?.filter((u: any)=>u.role === 'FootWorker').length" state="success" />
    </div>
    <div>
      <!-- <LoadingView v-if="" /> -->
      <div class="flex">
        <DataTable
          title="Users"
          :records="users"
          :headers="header"
          :total="pagination?.total"
          :loading="userStore.loading"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination?.hasNext"
          :hasPrev="pagination?.hasPrev"
          @changePage="handlePageChange"
        />
      </div>
    </div>
  </div>
  <CreateUser
    :user = "selectedUser"
    :isOpen="isCreateUser"
    @close="()=>{isCreateUser = false; selectedUser = null}"
  />
  <DeleteData
  :action="()=>handleDelete"
    :id="selectedUser?.id"
    :name="selectedUser?.userNme"
    message="Cette action supprimera définitivement cet utilisateur ainsi que les données qui lui sont associées. Cette opération est irréversible. Voulez-vous continuer ?"
    title="Supprimer l'utilisateur"
    :isOpen="isDeleteData"
    @close="()=>{isDeleteData = false; selectedUser = null}"
  />
</template>
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { useUserStore } from "@/store/userStore";
import PageHeader from "@/components/molecules/PageHeader.vue";
import { IconEdit, IconTrash } from "@tabler/icons-vue";
// import LoadingView from "@/components/molecules/LoadingView.vue";
// import CategoriesSidebarView from "@/components/CategoriesSidebarView.vue";
import type { TTableheaders } from "@/components/dataTable/DataTable.vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import CreateUser from "./CreateUser.vue";
import Badge from "@/components/badge/Badge.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { storeToRefs } from "pinia";
import DeleteData from "../delateData/DeleteData.vue";
import Profile from "@/components/profile/Profile.vue";

const isCreateUser = ref(false);
const isDeleteData = ref(false);

const newUser = {
  label: "New User",
  action: () => (isCreateUser.value = true),
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "userName",
    name: "User Name",
    render: (record: any) => 
      h("div", { class: "flex justify-start gap-2 items-center" }, [
        h(Profile, {
          src: record.profileUrl,
          h: "10"
          ,
        }),
        h("p", {
          class: "text-(--text-primary)",
        },
      (record?.userName ? record?.userName : "-")),
      ]),
    width: "15%",
  },
  {
    textAlign: "left",
    accessor: "lastName",
    name: "Last Name",
    render: (record: any) => (record?.lastName ? record?.lastName : "-"),
    width: "12%",
  },
  {
    textAlign: "left",
    accessor: "email",
    name: "E-mail",
    render: (record: any) => (record?.email ? record?.email : "-"),
    width: "20%",
  },
  {
    textAlign: "left",
    accessor: "role",
    name: "Role",
    render: (record: any) =>
      // record?.role
         h(Badge, {
            type: "primary",
            message: record.role || "-"
          }),
    width: "12%",
  },
  {
    textAlign: "left",
    accessor: "phone",
    name: "Phone",
    render: (record: any) => (record?.phone ? record?.phone : "-"),
    width: "12%",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: "Actions",
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconEdit, {
          size: 18,
          class: "cursor-pointer text-slate-900 hover:text-blue-700",
          onClick: ()=>{
            selectedUser.value = record;
            isCreateUser.value = true;
          }
         
        }),
        h(IconTrash, {
          size: 18,
          class: "cursor-pointer text-red-500 hover:text-red-700",
          onClick: ()=>{
            selectedUser.value = record;
            isDeleteData.value = true;
          }
        }),
      ]),
    width: "auto",
  },
];
const selectedUser = ref();
const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const {pagination} = storeToRefs(userStore)

const handlePageChange = async (page: number) => {
  await userStore.fetchUsers(page);
};
const handleDelete = async () => {
  await userStore.deleteUser(selectedUser.value.id);
};
onMounted(async () => {
  await userStore.fetchUsers();
});

</script>
