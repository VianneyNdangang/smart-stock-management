<template>
  <nav
    class="fixed z-50 bg-(--surface) text-(--text-prmary) px-4 flex left-0 right-0 shadow-sm transition-all duration-300 ease-in-out"
    :class="uiStore.isSidebar ? `md:left-70` : `md:left-20`"
  >
    <div class="flex justify-between py-4 w-full">
      <div class="cursor-pointer flex justify-center items-center md:hidden">
        <IconMenu2 size="35" @click="() => (isMenu = true)" />
      </div>
      <div>
        <h1 class="font-bold text-2xl capitalize flex">
          Welcome <p class="text-(--secondary) mx-1">{{ connectedUser?.userName }}</p> !
        </h1>
        <p class="class text-md font-semibold text-(--secondary) ">{{ connectedUser?.role }}</p>
      </div>
      <div class="flex gap-2 justify-center items-center">
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
        </div>
        <div>
        <div @click="isProfile = true">
          <Profile :src="connectedUser?.profileUrl" h="10"/>
        <!-- <img
          :src="connectedUser?.profileUrl" 
          alt="Logo" 
          class="ml-3 h-10 w-10 rounded-full border border-gray-400"
        />
       
         -->
      </div>
        </div>
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
              name="closeSidebar"
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
        </div>
      </section>
    </div>
  </Drawer>
  <Drawer :isOpen="isProfile" @close="isProfile = false" placement="end" >
    <div class="w-full p-5 flex flex-col h-screen">
      <div class="flex flex-col items-center justify-center mb-2">
        <Profile :src="connectedUser?.profileUrl" h="16"/>
        <p class="font-semibold text-lg">{{ connectedUser?.userName }}</p>
      </div>
      
      <div class="pt-5 flex flex-col gap-3 border-t border-(--border) h-full">
        <p><p>First Name:</p> <p class="rounded p-1 w-full flex justify-end border border-(--border) text-(--text-muted)">{{ connectedUser?.firstName }}</p></p>
        <p ><p>Last Name:</p> <p class="rounded p-1 w-full flex justify-end border border-(--border) text-(--text-muted)">{{ connectedUser?.lastName }}</p></p>
        <p ><p>Email:</p> <p class="rounded p-1 w-full flex justify-end border border-(--border) text-(--text-muted)">{{ connectedUser?.email }}</p></p>
        <p ><p>Phone Number:</p> <p class="rounded p-1 w-full flex justify-end border border-(--border) text-(--text-muted)">{{ connectedUser?.phone }}</p></p>
        <p ><p>Role:</p> <p class="rounded p-1 w-full flex justify-end border border-(--border) text-(--text-muted)">{{ connectedUser?.role }}</p></p>
      </div>
      <div class="flex flex-col gap-2 items-center justify-end h-full">
        <Button label="Update Profile" type="button" variant="primary" w="full" :click="() =>{isProfile = false; isUpdate = true;}"/>
        <Button
            variant="secondary"
            :click="store.logoutUser"
            type="button"
            label="Log Out"
            w="full"
            :icon="IconLogout2"
          />
      </div>
    </div>
  </Drawer>
  <UpdateProfile :isOpen="isUpdate" @close="isUpdate = false" />
</template>
<script setup lang="ts">
import { useUiStore } from "@/store/uiStore";
import {
  IconBellRinging,
  IconLogout2,
  IconMenu2,
  IconTransitionLeftFilled,
  IconTransitionRightFilled,
} from "@tabler/icons-vue";
import { IconSearch } from "@tabler/icons-vue";
import { onMounted, ref } from "vue";
import Drawer from "../drawer/Drawer.vue";
import MenuLabel from "../menu/MenuLabel.vue";
import { MenuList } from "@/router/menu.ts";
import ThemeButton from "../theme/ThemeButton.vue";
import { useProfileStore } from "@/store/profilStore.ts";
import Profile from "../profile/Profile.vue";
import Button from "../button/Button.vue";
import UpdateProfile from "../profile/updateProfile.vue";
import { storeToRefs } from "pinia";
// import CreateUser from "@/views/users/CreateUser.vue";
// import BreadCrumb from "../breadCrumb/BreadCrumb.vue";

const store = useProfileStore();
const uiStore = useUiStore();
const isMenu = ref(false);
const isProfile = ref(false);
const isUpdate = ref(false)
const { connectedUser } = storeToRefs(store);
onMounted(async()=>{
  store.fetchProfile()
})

</script>
