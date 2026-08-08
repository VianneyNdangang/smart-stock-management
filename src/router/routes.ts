import {type RouteRecordRaw } from "vue-router";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import UsersView from "@/views/users/UsersView.vue";
import NotFoundView from "@/views/security/NotFoundView.vue";
import ProductsView from "@/views/products/ProductsView.vue";
import CategoriesView from "@/views/categories/CategoriesView.vue";
import LoginView from "@/views/security/LoginView.vue";
import ComponentsView from "@/views/componentsDoc/ComponentsView.vue";
import AlertsView from "@/views/alerts/AlertsView.vue";
import SalesView from "@/views/sales/SalesView.vue";
import StockExitsView from "@/views/stock/StockExitsView.vue";
import ProductDetail from "@/views/products/ProductDetail.vue";
import StockEntriesView from "@/views/stock/StockEntriesView.vue";
import CampaignsView from "@/views/promotions/CampaignsView.vue";


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
      },
      {
        path: "",
        name: "dashboard",
        component: DashboardView,
      },
      {
        path: "users",
        name: "users",
        component: UsersView,
      },
      {
        path: "alerts",
        name: "alerts",
        component: AlertsView,
      },
      {
        path: "sales",
        name: "sales",
        component: SalesView,
      },
      {
        path: "stock-entries",
        name: "stock_entries",
        component: StockEntriesView,
      },
      // {
      //   path: "batches-detail/:id",
      //   name: "batch_detail",
      //   component: StockEntriesView,
      // },
      {
        path: "stock-exits",
        name: "stock_exits",
        component: StockExitsView,
      },
      {
        path: "operation-entries",
        name: "operation_entries",
        component: UsersView,
      },
      {
        path: "operation-exits",
        name: "operation_exits",
        component: UsersView,
      },
      {
        path: "settings",
        name: "settings",
        component: UsersView,
      },
      {
        path: "categories",
        name: "categories",
        component: CategoriesView,
      },
      {
        path: "products",
        name: "products",
        component: ProductsView,
      },
      {
        path: "campaigns",
        name: "campaigns",
        component: CampaignsView,
      },
      // TransitsView
      {
        path: "transits",
        name: "transits",
        component: CampaignsView,
      },
      {
        path: `product-detail/:id`,
        name: "detail_product",
        component: ProductDetail,
      }
    ],
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];
export default routes;
