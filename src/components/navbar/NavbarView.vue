

<template>
  <nav class="fixed z-50 bg-(--surface) text-(--text-prmary) px-4 flex left-0 right-0 shadow-sm transition-all duration-300 ease-in-out"
  :class="uiStore.isSidebar? `md:left-70`:`md:left-20`"
  >
    <div class="flex justify-between py-4 w-full ">
      <div class="cursor-pointer flex justify-center items-center md:hidden">
        <IconMenu2 size="40" @click="()=>isMenu = true"/>
      </div>
      <div>
        <h1 class="font-bold text-2xl capitalize">
          Welcome, {{ authUser?.username }} !
        </h1>
        <p class="class text-sm text-gray-500">{{ authUser?.role }} Manager</p>
      </div>
      <div
        class="cursor-pointer flex justify-center items-center md:hidden p-3 bg-gray-200 rounded-full text-gray-700 dark:bg-gray-700 dark:text-gray-300">
        <IconUserFilled size="30" @click="() => (isMenu = true)" />
      </div>
      <div class="hidden md:flex gap-2 items-center justify-center">
        <div class="flex items-center justify-center h-9 w-9 rounded-full text-gray-400 border border-gray-400">
          <IconSearch />
        </div>
        <div class="flex items-center justify-center h-9 w-9 rounded-full border text-gray-400 border-gray-400">
          <IconBellRinging />
        </div>
        <img :src="authUser?.image" alt="Logo" class="ml-3 h-10 w-10 rounded-full border border-gray-400" />
        
      </div>
    </div>
  </nav>

  <Drawer
    :isOpen="isMenu"
    @close="isMenu = false"
    placement="start"
>
<SidebarView/>
</Drawer>

</template>
<script setup lang="ts">
import { useUiStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import { IconBellRinging, IconMenu2, IconUserFilled } from "@tabler/icons-vue";
import { IconSearch } from "@tabler/icons-vue";
import { ref } from "vue";
import Drawer from "../drawer/Drawer.vue";

import SidebarView from "../sideBar/SidebarView.vue";

const store = useUserStore();
const uiStore = useUiStore();
const isMenu = ref(false)

const authUser = store.connectedUser;
</script>