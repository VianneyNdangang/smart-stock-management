<template>
  <div class="fixed z-50 flex-col h-screen p-2 flex bg-(--surface) shadow-sm transition-all duration-300 ease-in-out"
  :class="uiStore.isSidebar? `w-70`: `w-20 flex items-center justify-center`"
  >
    <section class="w-full pb-2">
      
      <img src="/logo.jpg" alt="logo" class="w-auto h-15 rounded mb-4" />
      <div class="flex justify-between items-center"
      :class="uiStore.isSidebar? `flex-row`:`flex-col`">
      <h2 v-if="uiStore.isSidebar" class="text-xl font-bold">Menu</h2>
      <div>
        <button @click="uiStore.handleChange()" class="cursor-pointer flex justify-center items-center p-2">
         <IconTransitionLeftFilled  v-if="uiStore.isSidebar"/><IconTransitionRightFilled v-else/></button>
      
      </div>
      </div>
    </section>
    <section
      class="h-full w-full text-slate-900 scrollbar-thumb-transparent overflow-scroll dark:text-gray-300  dark:border-r dark:border-r-gray-700"
    >
      <div v-for="item in menu" :key="item.name">
        <RouterLink
          :to="item.path"
          v-if="item?.children?.length === 0"
          class="block rounded px-3 py-1 mb-1 text-md hover:bg-(--btt-bg) hover:text-white transition "
          :class="{
            'bg-(--btt-bg)/20 border-l-4 border-(--btt-bg)': route.name === item.name,
          }"
        >
          <div class="flex items-center gap-2 text-(--text-primary)">
            <VueIcon v-if="item.icon" :name="item.icon" class="size-5"/>
            <p 
            v-if="uiStore.isSidebar"
            >{{ item.label }}</p>
            
          </div>
        </RouterLink>
        <details
          v-else
          class="group [&_summary::-webkit-details-marker]:hidden"
        >
          <summary
            class="flex px-3 py-1 mb-1 text-md transition items-center justify-between rounded hover:bg-[#b18332] hover:text-gray-200"
          >
            <div class="flex items-center gap-2">
              <VueIcon v-if="item.icon" :name="item.icon" class="size-5 dark:text-white" />
              <p v-if="uiStore.isSidebar">{{ item.label }}</p>
            </div>
            <span
              class="shrink-0 transition duration-300 group-open:-rotate-180"
            >
              <svg
              v-if="uiStore.isSidebar"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                class="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>
          <div v-for="p in item.children" :class="uiStore.isSidebar?`pl-8`: `pl-0`">
            <RouterLink
              :to="p.path"
              class="flex rounded items-center gap-2 px-3 py-1 mb-1 text-sm transition hover:bg-(--btt-bg) hover:text-white"
              :class="{
                'bg-(--btt-bg)/20 border-l-4 border-(--btt-bg)': route.name === p.name,
                '':route.name != p.name,
              }"
            >
              <VueIcon :name="p.icon" class="size-5" />
              <p v-if="uiStore.isSidebar">{{ p.label }}</p>
            </RouterLink>
          </div>
        </details>
      </div>
    </section>
    <section class="w-full">
      <div class="flex flex-col justify-center items-center gap-4">
        <ThemeButton v-if="uiStore.isSidebar"/>
        <Button v-if="uiStore.isSidebar"
        variant="primary"
         :click="store.logoutUser"
          type="button"
          label="Log Out"
          w="full"
          :icon="IconLogout2"
          :loading="store.loading"
        />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { IconLogout2, IconTransitionLeftFilled, IconTransitionRightFilled } from '@tabler/icons-vue';
import Button from '../button/Button.vue';
import ThemeButton from '../atoms/ThemeButton.vue';
import { useUserStore } from '@/store/userStore.ts';
import { useRoute } from 'vue-router';
import { MenuList } from '@/router/menu.ts';
import VueIcon from '@kalimahapps/vue-icons/VueIcon';
import { useUiStore } from '@/store/uiStore.ts';

const store = useUserStore();
const uiStore = useUiStore();
const route = useRoute();
const menu = MenuList;
</script>
