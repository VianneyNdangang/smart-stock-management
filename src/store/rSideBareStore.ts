import { defineStore } from "pinia";
import { ref } from "vue";


export const useRSidebarStore = defineStore(
  "rSidebar",
  () => {

    const isSidebar = ref(false);


    const handleOpen = () => {
      isSidebar.value = true;
    };


    const handleClose = () => {
      isSidebar.value = false;
    };


    return {
      isSidebar,
      handleOpen,
      handleClose
    };
  }
);