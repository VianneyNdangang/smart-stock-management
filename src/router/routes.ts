import { type RouteRecordRaw } from "vue-router";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import UsersView from "@/views/users/UsersView.vue";
import NotFoundView from "@/views/security/NotFoundView.vue";
import ProductsView from "@/views/products/ProductsView.vue";
import CategoriesView from "@/views/categories/CategoriesView.vue";
import LoginView from "@/views/security/LoginView.vue";
import ComponentsView from "@/views/componentsDoc/ComponentsView.vue";
import AlertsView from "@/views/alerts/AlertsView.vue";
import SalesView from "@/views/sales/SalesView.vue";
import ProductDetail from "@/views/products/ProductDetail.vue";
import StockEntriesView from "@/views/stock/StockEntriesView.vue";
import CampaignsView from "@/views/promotions/CampaignsView.vue";
import CategoryDetail from "@/views/categories/CategoryDetail.vue";
import ForbiddenView from "@/views/security/ForbiddenView.vue";
import BatchesDetail from "@/views/stock/BatchesDetail.vue";
import WarehouseView from "@/views/stock/warehouse/WarehouseView.vue";
import WarehouseDetailView from "@/views/stock/warehouse/WarehouseDetailView.vue";
import SaleDetailView from "@/views/sales/SaleDetailView.vue";
import CampaignDetailView from "@/views/promotions/CampaignDetailView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    children: [
      {
        path: "components",
        name: "components",
        component: ComponentsView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager", "FootWorker"],
        },
      },
      {
        path: "",
        name: "dashboard",
        component: DashboardView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "users",
        name: "users",
        component: UsersView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "alerts",
        name: "alerts",
        component: AlertsView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "sales",
        name: "sales",
        component: SalesView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "sale-detail/:id",
        name: "sale_detail",
        component: SaleDetailView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "stock-entries",
        name: "stock_entries",
        component: StockEntriesView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager", "FootWorker"],
        },
      },
      {
        path: "stock-detail/:id",
        name: "stock_detail",
        component: BatchesDetail,
         meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager", "FootWorker"],
        },
      },
      {
        path: "warehouse",
        name: "warehouse",
        component: WarehouseView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "warehouse-detail/:id",
        name: "warehouse_detail",
        component: WarehouseDetailView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "operation-entries",
        name: "operation_entries",
        component: UsersView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager", "FootWorker"],
        },
      },
      {
        path: "operation-exits",
        name: "operation_exits",
        component: UsersView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager", "FootWorker"],
        },
      },
      // {
      //   path: "settings",
      //   name: "settings",
      //   component: UsersView,
      //   meta: {
      //     requiresAuth: true,
      //     roles: ["admin", "CategoryManager"],
      //   },
      // },
      {
        path: "categories",
        name: "categories",
        component: CategoriesView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "category-dateil/:id",
        name: "category_detail",
        component: CategoryDetail,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "products",
        name: "products",
        component: ProductsView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager", "FootWorker"],
        },
      },
      {
        path: "campaigns",
        name: "campaigns",
        component: CampaignsView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "campaign-detail/:id",
        name: "campaign_detail",
        component: CampaignDetailView,
        meta: {
          requiresAuth: true,
          roles: ["admin", "CategoryManager"],
        },
      },
      {
        path: "transits",
        name: "transits",
        component: CampaignsView,
        meta: {
          requiresAuth: true,
          roles:  ["admin","CategoryManager"],
        },
      },
      {
        path: `product-detail/:id`,
        name: "product_detail",
        component: ProductDetail,
        meta: {
          requiresAuth: true,
          roles:  ["admin","CategoryManager", "FootWorker"],
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { hideNavigation: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: { hideNavigation: true },
  },
  {
    path: "/403",
    name: "forbidden",
    component: ForbiddenView,
    meta: { hideNavigation: true },
  },
];
export default routes;
