import {
  IconLayoutDashboard,
  IconUsersGroup ,
  IconAlertCircle,
  IconShoppingCart,
  IconPackage,
  IconArrowBarToDown,
  IconArrowBarToUp,
  IconClipboardList,
  IconFileImport,
  IconFileExport,
  IconSettings,
  IconPackages,
  IconFolders,
  IconTags,
  IconTruckDelivery,
  IconStack3Filled,
} from '@tabler/icons-vue'



export const MenuList = [
    {
        label: "Components",
        path: "/components",
        icon: IconStack3Filled ,
        name: "components",
        // allow: ['ADMIN', 'MANAGER'].includes(auth?.role),
        children: []
    },
    {
        label: "Dashboard",
        path: "/",
        icon: IconLayoutDashboard ,
        name: "dashboard",
        // allow: ['ADMIN', 'MANAGER'].includes(auth?.role),
        children: []
    },
    {
        label: "Users",
        path: "/users",
        icon: IconUsersGroup ,
        name: "users",
        // allow: ['ADMIN', 'MANAGER'].includes(auth?.role),
        children: []
    },
    {
        label: "Alerts",
        path: "/alerts",
        icon: IconAlertCircle,
        name: "alerts",
        // allow: ['ADMIN', 'MANAGER'].includes(auth?.role),
        children: []
    },
    {
        label: "Sales",
        path: "/sales",
        icon: IconShoppingCart,
        name: "sales",
        // allow: ['ADMIN', 'MANAGER'].includes(auth?.role),  categoriesView.vue
        children: []
    },
    {
        label: "Stock ",
        path: "",
        icon: IconPackage,
        name: "stock",
        children: [
            {
                label: "Stock entries",
                path: "/stock-entries",
                icon: IconArrowBarToDown,
                name: "stock_entries",
                // allow: ['ADMIN', 'MANAGER'].includes(auth?.role),
            },
            {
                label: "Stock exits",
                path: "/stock-exits",
                icon: IconArrowBarToUp,
                name: "stock_exits",
                // allow: ['ADMIN', 'MANAGER'].includes(auth?.role),
            },
        ]
    },
    {
        label: "operations",
        path: "",
        icon: IconClipboardList,
        name: "operations",
        // allow: ['ADMIN', 'USER', 'MANAGER'].includes(auth?.role),
        children: [
            {
                label: "Operation entries",
                path: "/operation-entries",
                icon: IconFileImport,
                name: "operation_entries",
                // allow: ['ADMIN', 'USER', 'MANAGER'].includes(auth?.role),
            },
            {
                label: "Operations exits",
                path: "/operation-exits",
                icon: IconFileExport,
                name: "operation_exits",
                // allow: ['ADMIN', 'USER', 'MANAGER'].includes(auth?.role),
            },
        ]
    },
    {
        label: "Categories",
        path: "/categories",
        icon: IconFolders,
        name: "categories",
        // allow: ['ADMIN', 'MANAGER'].includes(auth?.role),  
        children: []
    },
    {
        label: "Products",
        path: "/products",
        icon: IconPackages,
        name: "products",
        // allow: ['ADMIN', 'MANAGER'].includes(auth?.role), 
        children: []
    },
    {
        label: "Campaigns",
        path: "/campaigns",
        icon: IconTags,
        name: "campaigns",
        // allow: ['ADMIN', 'MANAGER'].includes(auth?.role),  
        children: []
    },
    {
        label: "Transits",
        path: "/transits",
        icon: IconTruckDelivery,
        name: "transits",
        // allow: ['ADMIN', 'USER', 'MANAGER'].includes(auth?.role),
        children: []
    },{
        label: "Settings",
        path: "/settings",
        icon: IconSettings,
        name: "settings",
        // allow: ['ADMIN', 'USER', 'MANAGER'].includes(auth?.role),
        children: []
    },
    
]