<script setup lang="ts">
import { useThemeStore } from "@/store/themeStore";
// import { IconMoonStars } from '@tabler/icons-vue';
// import { IconSunHigh } from '@tabler/icons-vue';
import Switch from "../switch/Switch.vue";
import { ref } from "vue";

const themeStore = useThemeStore();
const darkMode = ref(false)

const handelChange = ( mode: boolean )=>{
  if (themeStore.isDark && mode  ){
    themeStore.toggleTheme()
  }else if (!themeStore.isDark && !mode){
    themeStore.toggleTheme()
  }
  
}

// handelChange(darkMode.value)
</script>

<template>
<div @click="handelChange(darkMode)">
<Switch v-model="darkMode"/>
</div>
  
    <p>{{ darkMode }}</p>

  <!-- <div class="flex gap-2 rounded-full px-1.5 py-1 bg-gray-50 dark:bg-gray-700">
    <button @click="handelChange('white')" class="rounded-full p-0.5 bg-gray-700 dark:bg-gray-700 text-gray-100 ">
      <IconSunHigh stroke={1} />
    </button>
    <button @click="handelChange('dark')" class="rounded-full p-0.5 dark:bg-gray-100 dark:text-gray-700">
      <IconMoonStars stroke={1} />

    </button>
  </div> -->

</template>