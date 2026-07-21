import {type RouteRecordRaw } from "vue-router";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import UsersView from "@/views/users/UsersView.vue";
import NotFoundView from "@/views/security/NotFoundView.vue";
import ProductsView from "@/views/products/ProductsView.vue";
import PromotionsView from "@/views/promotions/PromotionsView.vue";
import CategoriesView from "@/views/categories/CategoriesView.vue";
import LoginView from "@/views/security/LoginView.vue";
import ComponentsView from "@/views/componentsDoc/ComponentsView.vue";
import AlertsView from "@/views/alerts/AlertsView.vue";
import SalesView from "@/views/sales/SalesView.vue";


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
        component: UsersView,
      },
      {
        path: "stock-exits",
        name: "stock_exits",
        component: UsersView,
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
        name: "Products",
        component: ProductsView,
      },
      {
        path: "promotions",
        name: "promotions",
        component: PromotionsView,
      },
      // TransitsView
      {
        path: "transits",
        name: "transits",
        component: PromotionsView,
      },
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
