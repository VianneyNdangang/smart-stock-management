<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      :title="t('menu.users')"
      :subtitle="t('users.subtitle')"
      :refresh="async() => {await userStore.fetchUsers()}"
      :new="newUser"
      :loading="userStore.loading"
    />
    
    <div class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-3">
      <DataSommary :title="t('users.summary.total')" :value="users?.length" state="primary" :icon="IconUsers"/>
      <DataSommary :title="t('users.summary.active')" :value="users?.filter((u: any)=>u.role === 'FootWorker').length" state="success" :icon="IconUserCheck"/>
      <DataSommary :title="t('users.summary.administrators')" :value="users?.filter((u: any)=>u.role === 'admin').length" state="warning" :icon="IconSettings" />
      <DataSommary :title="t('users.summary.categoryManagers')" :value="users?.filter((u: any)=>u.role === 'CategoryManager').length" state="warning" :icon="IconUserCog"/>
      <DataSommary :title="t('users.summary.footWorkers')" :value="users?.filter((u: any)=>u.role === 'FootWorker').length" state="warning" :icon="IconWalk"/>
    </div>
    <div>
      <div class="flex">
        <!-- <Card v-if="userStore.loading">
          
        </Card> -->
        <DataTable
          :title="t('menu.users')"
          :records="users"
          :headers="header"
          :total="pagination?.total"
          :loading="userStore.loading"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination?.hasNext"
          :hasPrev="pagination?.hasPrev"
          :changePage="handlePageChange"
        ><UsersTableSkeleton/></DataTable>
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
import { IconEdit, IconSettings, IconTrash, IconUserCheck, IconUserCog, IconUserPlus, IconUsers, IconWalk } from "@tabler/icons-vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import CreateUser from "./CreateUser.vue";
import Badge from "@/components/badge/Badge.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { storeToRefs } from "pinia";
import DeleteData from "../delateData/DeleteData.vue";
import Profile from "@/components/profile/Profile.vue";
import type { TTableheaders } from "@/components/dataTable/type.ts";
import UsersTableSkeleton from "@/components/skeleton/UsersTableSkeleton.vue";

const isCreateUser = ref(false);
const isDeleteData = ref(false);
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const newUser = {
  label: t('users.new'),
  action: () => (isCreateUser.value = true),
  icon: IconUserPlus
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "userName",
    name: () => t('users.columns.userName'),
    render: (record: any) => 
      h("div", { class: "flex justify-start gap-2 items-center" }, [
        h(Profile, {
          src: record.profileUrl,
          name: record?.userName,
          h: "10"
          ,
        }),
        h("p", {
          class: "text-(--text-primary) text-md font-bold",
        },
      (record?.userName ? record?.userName : "-")),
      ]),
    width: "20%",
  },
  {
    textAlign: "left",
    accessor: "firstName",
    name: () => t('users.columns.firstName'),
    render: (record: any) => (record?.firstName ? record?.firstName : "-"),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "lastName",
    name: () => t('users.columns.lastName'),
    render: (record: any) => (record?.lastName ? record?.lastName : "-"),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "email",
    name: () => t('users.columns.email'),
    render: (record: any) => (record?.email ? record?.email : "-"),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "role",
    name: () => t('users.columns.role'),
    render: (record: any) =>
      // record?.role
         h(Badge, {
            type: "primary",
            message: record.role || "-"
          }),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "phone",
    name: () => t('users.columns.phone'),
    render: (record: any) => (record?.phone ? record?.phone : "-"),
    width: "auto",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: () => t('users.columns.actions'),
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconEdit, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: ()=>{
            selectedUser.value = record;
            isCreateUser.value = true;
            console.log("selectedUserselectedUserselectedUser",selectedUser.value)
          }
         
        }),
        h(IconTrash, {
          size: 18,
          class: "cursor-pointer text-(--danger) hover:text-red-700",
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
