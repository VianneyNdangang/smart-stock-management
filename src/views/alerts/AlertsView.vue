<template>
  <PageHeader title="Alerts" />
  <div>
    <LoadingView v-if="userStore.loading" />

    <motion.div
      v-else
      :initial="{ opacity: 0, scale: 0 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0 }"
      :transition="{
        duration: 0.4,
      }"
    >
      <DataTable
        title="Users"
        :records="users"
        :headers="header"
        v-if="users"
      />
    </motion.div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { useUserStore } from "@/store/userStore";
import PageHeader from "@/components/molecules/PageHeader.vue";
import { motion } from "motion-v";
import { IconEdit, IconTrash } from "@tabler/icons-vue";
import LoadingView from "@/components/molecules/LoadingView.vue";
import type { TTableheaders } from "@/components/dataTable/DataTable.vue";
import DataTable from "@/components/dataTable/DataTable.vue";
const users = ref<any[]>([]);
const isLoading = ref<boolean>(false);

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "Id",
    name: "id",
    render: (record: any) => record?.id ?? record?.id,
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "username",
    name: "Username",
    render: (record: any) => record?.username ?? record?.username,
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "email",
    name: "E-mail",
    render: (record: any) => record?.email ?? record?.email,
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "phone",
    name: "Phone",
    render: (record: any) => record?.phone ?? record?.phone,
    width: "44",
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
        }),
        h(IconTrash, {
          size: 18,
          class: "cursor-pointer text-red-500 hover:text-red-700",
        }),
      ]),
    width: "28",
  },
];

const userStore = useUserStore();
onMounted(async () => {
  await userStore.fetchUsers();
  users.value = userStore.users;
  isLoading.value = userStore.loading;
});
</script>
