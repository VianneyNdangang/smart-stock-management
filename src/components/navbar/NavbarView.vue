<template>
  <nav
    class="fixed z-50 bg-(--surface) text-(--text-prmary) px-4 flex left-0 right-0 shadow-sm transition-all duration-300 ease-in-out"
    :class="uiStore.isSidebar ? `md:left-70` : `md:left-20`"
  >
          
    <div class="flex justify-between py-4 w-full">
      <div class="cursor-pointer flex justify-center items-center md:hidden">
        <IconMenu2 size="30" @click="() => (isMenu = true)" />
      </div>
      <div class="flex flex-col justify-center items-center md:flex-row gap-2">
        <button
            name="closeSidebar"
            @click="uiStore.handleChange()"
            class="cursor-pointer hidden border rounded md:flex justify-center items-center"
          >
            <IconChevronsLeft stroke="1.5" size="25"
              v-if="uiStore.isSidebar"
            /><IconChevronsRight v-else stroke="1.5" size="25"/>
          </button>
        <div class="whitespace-nowrap">
          <h1 class="font-bold text-lg capitalize flex">
            <p v-if="Time < 12">{{ t("navbar.greeting.morning") }}</p>
            <p v-else-if="Time >= 12 && Time < 17">
              {{ t("navbar.greeting.afternoon") }}
            </p>
            <p v-else>{{ t("navbar.greeting.evening") }}</p>
            <p class="text-(--secondary) mx-1">{{ connectedUser?.userName }}</p>
            !
          </h1>
          <p class="class text-xs font-semibold text-(--secondary)">
            {{ connectedUser?.role }}
          </p>
        </div>
        <!-- Recherche d'un produit -->
        <div class="hidden md:flex w-full md:w-150">
          <SearchBare
            endpoint="products"
            property="productName"
            routeName="product_detail"
          />
        </div>
      </div>
      <div class="flex gap-2 md:gap-5 justify-end items-center ml-5">
        <!-- Theme -->
        <div>
          <ThemeButton />
        </div>

        <LanguageToggle />

        <!-- Notificatons -->
        <div
          class="relative hidden md:flex items-center justify-center h-9 w-9 rounded-full cursor-pointer text-(--secondary) hover:bg-(--background-secondary) hover:text-(--primary) transition-all duration-200"
          @click="handleNavigate('/alerts')"
        >
          <!-- Notification indicator -->
          <span class="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span
              class="absolute inline-flex h-full w-full rounded-full bg-(--success) opacity-75 animate-ping"
            />
            <span
              class="relative inline-flex h-2.5 w-2.5 rounded-full bg-(--success) border-2 border-(--background)"
            />
          </span>

          <IconBellRinging :size="20" stroke-width="1.8" />
        </div>
        <div>
          <Tooltip :text="t('navbar.profile')" position="bottom">
            <div
              @click="isProfile = true"
              class="flex gap-2 justify-center items-center"
            >
              <Profile
                :src="connectedUser?.profileUrl"
                h="10"
                :name="connectedUser?.userName"
              />
              <div class="flex flex-col justify-center items-start">
                <p class="text-sm font-semibold text-(--secondary)">{{ connectedUser?.userName }}</p>
               <p class="text-xs font-semibold text-(--text-secondary)">{{ connectedUser?.role }}</p>
              </div>
              
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
    <!-- <BreadCrumb :items="MenuList"/> -->
  </nav>

  <Drawer :isOpen="isMenu" @close="isMenu = false" placement="start">
    <div class="p-5 fixed z-50 flex-col h-screen flex">
      <section class="w-full pb-2">
        <div class="flex gap-2 justify-start items-center">
          <img
            src="/images/glotelho-e-commerce-logo-white-220x60.png"
            alt="logo"
            class="w-auto h-15 rounded mb-4"
          />
          <div v-if="uiStore.isSidebar" class="flex flex-col">
            <p class="font-rounded text-4xl font-bold leading-none">Glotelho</p>
            <p class="font-rounded text-xs text-(--secondary) font-black">
              ECOMMERCE
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">{{ t("navbar.menu") }}</h2>
          <div>
            <button
              name="closeSidebar"
              @click="uiStore.handleChange()"
              class="cursor-pointer flex justify-center items-center p-2"
            >
              <IconTransitionLeftFilled v-if="uiStore.isSidebar" />
              <IconTransitionRightFilled v-else />
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
  <Drawer :isOpen="isProfile" @close="isProfile = false" placement="end">
    <div class="w-full p-5 flex flex-col h-screen">
      <div class="flex flex-col items-center justify-center mb-4">
        <Profile
          :src="connectedUser?.profileUrl"
          h="16"
          :name="connectedUser?.userName"
        />
        <p class="font-semibold text-lg">{{ connectedUser?.userName }}</p>
        <p class="text-sm text-(--secondary)">{{ connectedUser?.email }}</p>
      </div>

      <div class="pt-4 border-t border-(--border) flex-1">
        <dl class="grid grid-cols-2 gap-3 text-sm">
          <dt class="text-(--secondary)">{{ t("form.firstName") }}</dt>
          <dd class="text-right text-(--text-muted)">
            {{ connectedUser?.firstName || "-" }}
          </dd>

          <dt class="text-(--secondary)">{{ t("form.lastName") }}</dt>
          <dd class="text-right text-(--text-muted)">
            {{ connectedUser?.lastName || "-" }}
          </dd>

          <dt class="text-(--secondary)">{{ t("form.email") }}</dt>
          <dd class="text-right text-(--text-muted)">
            {{ connectedUser?.email || "-" }}
          </dd>

          <dt class="text-(--secondary)">{{ t("form.phone") }}</dt>
          <dd class="text-right text-(--text-muted)">
            {{ connectedUser?.phone || "-" }}
          </dd>

          <dt class="text-(--secondary)">{{ t("form_extra.role") }}</dt>
          <dd class="text-right text-(--text-muted)">
            {{ connectedUser?.role || "-" }}
          </dd>
        </dl>
      </div>

      <div class="mt-4 flex flex-col gap-2">
        <Button
          name="updateProfile"
          :label="t('navbar.updateProfile')"
          type="button"
          variant="primary"
          w="full"
          :click="
            () => {
              isProfile = false;
              isUpdate = true;
            }
          "
        />
        <Button
          name="logout"
          variant="secondary"
          :click="store.logoutUser"
          type="button"
          :label="t('navbar.logout')"
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
  IconChevronsLeft,
  IconChevronsRight,
  IconLogout2,
  IconMenu2,
  IconTransitionLeftFilled,
  IconTransitionRightFilled,
} from "@tabler/icons-vue";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import Drawer from "../drawer/Drawer.vue";
import MenuLabel from "../menu/MenuLabel.vue";
import { MenuList } from "@/router/menu.ts";
import ThemeButton from "../theme/ThemeButton.vue";
import { useProfileStore } from "@/store/profilStore.ts";
import Profile from "../profile/Profile.vue";
import Button from "../button/Button.vue";
import UpdateProfile from "../profile/updateProfile.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import SearchBare from "../search/SearchBare.vue";
import Tooltip from "../tooltip/Tooltip.vue";
import LanguageToggle from "./LanguageToggle.vue";
import { connectSocket, socket } from "@/helpers/socket.ts";

const store = useProfileStore();
const uiStore = useUiStore();
const isMenu = ref(false);
const isProfile = ref(false);
const isUpdate = ref(false);
const router = useRouter();
const { connectedUser } = storeToRefs(store);
const { t } = useI18n();
onMounted(async () => {
  connectSocket();
  store.fetchProfile();
  socket.on("connexion", () => {
    console.log("Connecté au serveur Socket avec l'ID :", socket.id);
  });
});

const handleNavigate = (url: string) => {
  router.push(url);
};
const Time = new Date().getHours();
</script>
