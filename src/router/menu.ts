import { useProfileStore } from "@/store/profilStore";
import {
  IconDashboard ,
  IconUsers ,
  IconAlertCircle,
  IconShoppingCart,
  IconPackage,
  IconFolders,
  IconTruckDelivery,
  IconStack3Filled,
  IconBuildingWarehouse,
  IconStack2,
  IconStackPush,
  IconSpeakerphone,
} from "@tabler/icons-vue";
import { computed } from "vue";

export const MenuList = computed(() => {
const authStore = useProfileStore();
  const role = authStore.connectedUser?.role;
  return [
    {
      label: "menu.components",
      path: "/components",
      icon: IconStack3Filled,
      name: "components",
      allow: ["admin","CategoryManager", "FootWorker"].includes(role),
      children: [],
    },
    {
      label: "menu.dashboard",
      path: "/",
      icon: IconDashboard,
      name: "dashboard",
      allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
      children: [],
    },
    {
      label: "menu.users",
      path: "/users",
      icon: IconUsers,
      name: "users",
      allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
      children: [],
    },
    {
      label: "menu.alerts",
      path: "/alerts",
      icon: IconAlertCircle,
      name: "alerts",
      allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
      children: [],
    },
    {
      label: "menu.sales",
      path: "/sales",
      icon: IconShoppingCart,
      name: "sales",
      allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
      children: [],
    },
    {
      label: "menu.stock",
      path: "",
      icon: IconStack2,
      name: "stock",
      allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
      children: [
        {
          label: "menu.stock_entries",
          path: "/stock-entries",
          icon: IconStackPush,
          name: "stock_entries",
          allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
        },
        {
          label: "menu.warehouse",
          path: "/warehouse",
          icon: IconBuildingWarehouse,
          name: "warehouse",
          allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
        },
      ],
    },
    // {
    //   label: "menu.operations",
    //   path: "",
    //   icon: IconClipboardList,
    //   name: "operations",
    //   allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
    //   children: [
    //     {
    //       label: "menu.operation_entries",
    //       path: "/operation-entries",
    //       icon: IconFileImport,
    //       name: "operation_entries",
    //       allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
    //     },
    //     {
    //       label: "menu.operation_exits",
    //       path: "/operation-exits",
    //       icon: IconFileExport,
    //       name: "operation_exits",
    //       allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
    //     },
    //   ],
    // },
    {
      label: "menu.categories",
      path: "/categories",
      icon: IconFolders,
      name: "categories",
      allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
      children: [],
    },
    {
      label: "menu.products",
      path: "/products",
      icon: IconPackage,
      name: "products",
      allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
      children: [],
    },
    {
      label: "menu.campaigns",
      path: "/campaigns",
      icon: IconSpeakerphone,
      name: "campaigns",
      allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
      children: [],
    },
    {
      label: "menu.transits",
      path: "/transits",
      icon: IconTruckDelivery,
      name: "transits",
      allow: ["admin", "CategoryManager", "FootWorker"].includes(role),
      children: [],
    },
    // {
    //     label: "menu.settings",
    //     path: "/settings",
    //     icon: IconSettings,
    //     name: "settings",
    //     children: []
    // }
  ];
});
