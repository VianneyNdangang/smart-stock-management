import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref<boolean>(false);
  isDark.value = (localStorage.getItem("theme") === "dark")

  const applyTheme = () => {
    document.documentElement.classList.toggle("dark", isDark.value);
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;

    localStorage.setItem("theme", isDark.value ? "dark" : "light");

    applyTheme();
  };

  return {
    isDark,
    toggleTheme,
    applyTheme,
  };
});