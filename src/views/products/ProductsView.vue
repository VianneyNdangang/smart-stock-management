<template>
  <div
    class="flex flex-col gap-3 transition-all duration-300"
  >
    <PageHeader
      :title="t('menu.products')"
      :subtitle="t('products.subtitle')"
      :refresh="
        async () => {
          await productStore.fetchProducts();
        }
      "
      :new="newProduct"
      :loading="productStore.loading"
    />
    <div
      class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-3"
    >
      <DataSommary
        :title="t('products.summary.total')"
        :value="pagination?.totalProducts"
        state="primary"
        :icon="IconAnalyze"
      />
      <DataSommary
        :title="t('products.summary.nonPerishable')"
        :value="(pagination?.totalProducts ?? 0) - (pagination?.totalPerishables ?? 0)"
        state="success"
        :icon="IconPackageImport"
      />
      <DataSommary
        :title="t('products.summary.perishable')"
        :value="pagination?.totalPerishables"
        state="warning"
        :icon="IconFlask"
      />
    </div>
    <FilterBar
      searchEndPoint="products"
      searchProperty="productName"
      routeName="product_detail"
    >
      <ProductsFilter />
    </FilterBar>
    <div>
      <div class="flex flex-col">
        <DataTable
          :title="t('menu.products')"
          :records="products"
          :headers="header"
          :total="pagination?.total"
          :loading="productStore.loading"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination?.hasNext"
          :hasPrev="pagination?.hasPrev"
          :changePage="handlePageChange"
        >
          <ProductsTableSkeleton />
        </DataTable>
      </div>
    </div>
  </div>

  <CreateProduct
    :product="selectedProduct"
    :isOpen="isCreateProduct"
    @close="
      () => {
        isCreateProduct = false;
        selectedProduct = null;
      }
    "
  />
  <DeleteData
    :loading="isLoading"
    message="Cette action supprimera définitivement cet utilisateur ainsi que les données qui lui sont associées. Cette opération est irréversible. Voulez-vous continuer ?"
    title="Supprission de produit"
    :isOpen="isDeleteData"
    @close="
      () => {
        isDeleteData = false;
        selectedProduct = null;
      }
    "
    :action="() => handleDelete"
  />
  <RightSideBare>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-lg text-(--text-primary)">
        {{ selectedProduct?.productName }}
      </h1>
      <div class="border rounded border-(--border)">
        <img src="#" class="h-50 w-50" />
      </div>
    </div>
  </RightSideBare>
</template>
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { useI18n } from 'vue-i18n'
import { useproductStore } from "@/store/productsStore";
import PageHeader from "@/components/molecules/PageHeader.vue";
import { IconAnalyze, IconEdit, IconEye, IconFlask, IconPackageImport } from "@tabler/icons-vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import { storeToRefs } from "pinia";
import DeleteData from "../delateData/DeleteData.vue";
import RightSideBare from "@/components/sideBar/RightSideBare.vue";
import { useToastStore } from "@/store/toastStore.ts";
import CreateProduct from "./CreateProduct.vue";
import { useRouter } from "vue-router";
import ProductProfile from "@/components/profile/ProductProfile.vue";
import type { TTableheaders } from "@/components/dataTable/type.ts";
import Badge from "@/components/badge/Badge.vue";
import ProductsTableSkeleton from "@/components/skeleton/ProductsTableSkeleton.vue";
import FilterBar from "@/components/filterBar/FilterBar.vue";
import ProductsFilter from "./ProductsFilter.vue";

const productStore = useproductStore();
const toast = useToastStore();
const router = useRouter();

onMounted(async () => {
  await productStore.fetchProducts();
  isLoading.value = productStore.loading;
});

const { products } = storeToRefs(productStore);
const { pagination } = storeToRefs(productStore);
const isLoading = ref<boolean>(false);
const selectedProduct = ref();

const isCreateProduct = ref(false);
const isDeleteData = ref(false);

const { t } = useI18n()

const newProduct = {
  label: t('products.new'),
  action: () => (isCreateProduct.value = true),
  icon: IconPackageImport,
};


const handlePageChange = async (page: number) => {
  await productStore.fetchProducts(page);
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "productName",
    name: () => t('products.columns.productName'),
    render: (record: any) =>
      h("div", { class: "flex justify-start gap-2 items-center w-full" }, [
        h(ProductProfile, {
          src: record.images[0],
        }),
        h(
          "p",
          {
            class: "text-(--text-primary) text-md font-bold",
          },
          record?.productName ? record?.productName : "-",
        ),
      ]),
    width: "20%",
  },
  {
   textAlign: "left",
   accessor: "units",
  name: () => t('products.columns.units'),
    render: (record: any) =>
      h(
        Badge,{
          type:'primary',
          message: record?.units || '-',
        }
      ),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "productBrandName",
    name: () => t('products.columns.brand'),
    render: (record: any) =>
      record?.brand.productBrandName ? record?.brand?.productBrandName : "-",
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "catedoryName",
    name: () => t('products.columns.category'),
    render: (record: any) =>
      record?.category.categoryName ? record?.category?.categoryName : "-",
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "perishable",
    name: () => t('products.columns.variant'),
    render: (record: any) =>
      h(Badge, {
        type: record.perishable ? "warning" : "success",
        message: record.perishable ? "Perishable" : "Non Perishable",
      }),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "creator",
    name: () => t('products.columns.creator'),
    render: (record: any) => h("p",{class: 'text-(--text-secondary)'},record.creator?.userName? record.creator?.userName: "-") ,
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "createdAt",
    name: () => t('products.columns.createdAt'),
    render: (record: any) =>
      h(FormateDate, {
        date: record.createdAt || "-",
      }),
    width: "auto",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: () => t('products.columns.actions'),
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconEye, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            router.push({ name: "product_detail", params: { id: record?.id } });
          },
        }),
        h(IconEdit, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            selectedProduct.value = record;
            isCreateProduct.value = true;
          },
        }),
      ]),
    width: "auto",
  },
];

const handleDelete = async () => {
  isLoading.value = true;
  try {
    await productStore.deleteProducts(selectedProduct.value.id);
    isDeleteData.value = false;
    toast.show(
      "Opperation effectuer",
      "success",
      "Le produit " + selectedProduct.value.productName + " a ete supprime",
    );
  } catch (error) {
    toast.show(
      "Echec de l'opperation",
      "danger",
      "Le produit " +
        selectedProduct.value.productName +
        " n'a pas ete supprime",
    );
  } finally {
    isLoading.value = false;
  }
};
</script>
