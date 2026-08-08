<template>
  <PageHeader title="Sales" />
  <div>
    <LoadingView v-if="userStore.loading" />

    <!-- <div
  class="--animate-scale-fade-in"
> -->

    <!-- </div> -->
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import PageHeader from "@/components/molecules/PageHeader.vue";
import LoadingView from "@/components/molecules/LoadingView.vue";
const users = ref<any[]>([]);
const isLoading = ref<boolean>(false);


const userStore = useUserStore();
onMounted(async () => {
  await userStore.fetchUsers();
  users.value = userStore.users;
  isLoading.value = userStore.loading;
});
</script>
