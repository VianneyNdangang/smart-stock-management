import { defineStore } from "pinia";
import { ref } from "vue";


export const useUiStore = defineStore("sidebar", () => {
  const isSidebar = ref(localStorage.getItem("sidebar") === "open");

  const handleChange = () => {
    isSidebar.value = !isSidebar.value;

    localStorage.setItem(
      "sidebar",
      isSidebar.value ? "open" : "close"
    );

    console.log(isSidebar.value);
  };

  return {
    isSidebar,
    handleChange,
  };
});