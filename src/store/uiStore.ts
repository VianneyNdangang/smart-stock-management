import { defineStore } from "pinia";
import { ref } from "vue";

export const useUiStore = defineStore("sidebar", () => {
  const isSidebar = ref(localStorage.getItem("sidebar") === "open");

  const saveState = () => {
    localStorage.setItem("sidebar", isSidebar.value ? "open" : "close");
  };
  const handleChange = () => {
    isSidebar.value = !isSidebar.value;
    saveState();
  };
  const handleClose = () => {
    isSidebar.value = false;
    localStorage.setItem("sidebar", "close");
  };

  return {
    isSidebar,
    handleChange,
    handleClose,
  };
});
