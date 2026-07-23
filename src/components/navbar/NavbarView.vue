<template>
  <nav
    class="fixed z-50 bg-(--surface) text-(--text-prmary) px-4 flex left-0 right-0 shadow-sm transition-all duration-300 ease-in-out"
    :class="uiStore.isSidebar ? `md:left-70` : `md:left-20`"
  >
    <div class="flex justify-between py-4 w-full">
      <div class="cursor-pointer flex justify-center items-center md:hidden">
        <IconMenu2 size="40" @click="() => (isMenu = true)" />
      </div>
      <div>
        <h1 class="font-bold text-2xl capitalize">
          Welcome, {{ authUser?.username }} !
        </h1>
        <p class="class text-sm text-gray-500">{{ authUser?.role }} Manager</p>
      </div>
      <div
        class="cursor-pointer flex justify-center items-center md:hidden p-3 bg-gray-200 rounded-full text-gray-700 dark:bg-gray-700 dark:text-gray-300"
      >
        <IconUserFilled size="30" @click="() => (isMenu = true)" />
      </div>
      <div class="hidden md:flex gap-2 items-center justify-center">
        <div
          class="flex items-center justify-center h-9 w-9 rounded-full text-gray-400 border border-gray-400"
        >
          <IconSearch />
        </div>
        <div
          class="flex items-center justify-center h-9 w-9 rounded-full border text-gray-400 border-gray-400"
        >
          <IconBellRinging />
        </div>
        <img
          :src="authUser?.image"
          alt="Logo"
          class="ml-3 h-10 w-10 rounded-full border border-gray-400"
        />
      </div>
    </div>
    <!-- <BreadCrumb :items="MenuList"/> -->
  </nav>
  
  <Drawer :isOpen="isMenu" @close="isMenu = false" placement="start">
    <div class="p-5 fixed z-50 flex-col h-screen flex">
      <section class="w-full pb-2">
        <img src="/logo.jpg" alt="logo" class="w-auto h-15 rounded mb-4" />
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">Menu</h2>
          <div>
            <button
              @click="uiStore.handleChange()"
              class="cursor-pointer flex justify-center items-center p-2"
            >
              <IconTransitionLeftFilled
                v-if="uiStore.isSidebar"
              /><IconTransitionRightFilled v-else />
            </button>
          </div>
        </div>
      </section>
      <section
        class="h-full w-full text-slate-900 scrollbar-thumb-transparent overflow-scroll"
      >
        <div @click="() => (isMenu = false)">
          <MenuLabel :item="item" v-for="item in MenuList" :key="item.name" />
        </div>
      </section>
      <section class="w-full">
        <div class="flex flex-col justify-center items-center gap-4">
          <ThemeButton />
          <Button
            variant="primary"
            :click="store.logoutUser"
            type="button"
            label="Log Out"
            w="full"
            :icon="IconLogout2"
          />
        </div>
      </section>
    </div>
  </Drawer>
</template>
<script setup lang="ts">
import { useUiStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import {
  IconBellRinging,
  IconLogout2,
  IconMenu2,
  IconTransitionLeftFilled,
  IconTransitionRightFilled,
  IconUserFilled,
} from "@tabler/icons-vue";
import { IconSearch } from "@tabler/icons-vue";
import { ref } from "vue";
import Drawer from "../drawer/Drawer.vue";
import MenuLabel from "../menu/MenuLabel.vue";
import { MenuList } from "@/router/menu.ts";
import Button from "../button/Button.vue";
import ThemeButton from "../theme/ThemeButton.vue";
// import BreadCrumb from "../breadCrumb/BreadCrumb.vue";

const store = useUserStore();
const uiStore = useUiStore();
const isMenu = ref(false);

const authUser = store.connectedUser;
</script>
