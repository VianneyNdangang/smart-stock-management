<template>
  <div class="flex flex-col gap-5">
    <PageHeader
      title="Users"
      subtitle="Manage user accounts, permissions, and access le"
      :refresh="async() => {await userStore.fetchUsers()}"
      :new="newUser"
    />
    <div class="flex justify-center items-center flex-col md:flex-row gap-5">
      <DataSommary title="Total Users" :value="users.length" state="success" />
      <DataSommary title="Total Administrators" :value="users.filter((u: any)=>u.role === 'admin').length" state="success" />
      <DataSommary title="Total Category Managers" :value="users.filter((u: any)=>u.role === 'CategoryManager').length" state="success" />
      <DataSommary title="Total Foot Workers" :value="users.filter((u: any)=>u.role === 'FootWorker').length" state="success" />
    </div>
    <div>

    </div>
  </div>
  <!-- <CreateUser
    v-if="isCreateUser"
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
  /> -->
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";
import PageHeader from "@/components/molecules/PageHeader.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { storeToRefs } from "pinia";

const isCreateUser = ref(false);
const newUser = {
  label: "New User",
  action: () => (isCreateUser.value = true),
};


const userStore = useUserStore();
const { users } = storeToRefs(userStore);

// const handleDelete = async () => {
//   await userStore.deleteUser(selectedUser.value.id);
// };
// onMounted(async () => {
//   await userStore.fetchUsers();
// });

</script>
