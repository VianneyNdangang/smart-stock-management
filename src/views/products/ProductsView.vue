<template>
  <div class="flex flex-col gap-5 transition-all duration-300"
        :class="rSidebarStore.isSidebar?`ml-20`:``" 
  >
    <PageHeader
      title="Products"
      subtitle="Manage your product catalog, pricing, and inventory information."
      :refresh="async() => {await productStore.fetchProducts()}"
      :new="newProduct"
    />
    <div class="flex justify-center items-center flex-col md:flex-row gap-5">
      <DataSommary title="Total Products" :value="products.length" state="primary" />      
      <DataSommary title="Non Perishable Products" :value="nonPerishableProducts.length" state="success" />
      <DataSommary title="Perishable Products" :value="perishableProducts.length" state="warning" />
      <!-- <DataSommary title="Total Foot Workers" :value="products.filter((u: any)=>u.role === 'FootWorker').length" state="success" /> -->
    </div>
    <div>
      <div class="flex flex-col gap-5">
        <DataTable
          title="products"
          :records="nonPerishableProducts"
          :headers="header"
          :loading="productStore.loading"
        />
        <Button variant="secondary" label="Sidebare" :click="rSidebarStore.handleOpen" type="button" />
        <DataTable
          title="products"
          :records="perishableProducts"
          :headers="header"
          :loading="productStore.loading"
        />
      </div>
    </div>
  </div>
  <!-- <CreateUser
    v-if="isCreateProduct"
    :user = "selectedProduct"
    :isOpen="isCreateProduct"
    @close="()=>{isCreateProduct = false; selectedProduct = null}"
  /> -->
  <DeleteData
    :name="selectedProduct?.productName"
    :id="selectedProduct?.id"
    message="Cette action supprimera définitivement cet utilisateur ainsi que les données qui lui sont associées. Cette opération est irréversible. Voulez-vous continuer ?"
    :title="`Supprimer le produit ${selectedProduct?.productName ?? ''}`"
    :isOpen="isDeleteData"
    @close="()=>{isDeleteData = false; selectedProduct = null}"
  />
  <RightSideBare>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-lg text-(--text-primary)">{{ selectedProduct?.productName }}</h1>
      <div class="border rounded border-(--border)">
        <img src="#" class="h-50 w-50"/>
      </div>
    </div>
  </RightSideBare>
</template>
<script setup lang="ts">
import { ref, onMounted, h, computed, onUnmounted } from "vue";
import { useproductStore } from "@/store/productsStore";
import PageHeader from "@/components/molecules/PageHeader.vue";
import { IconBinaryTree2, IconEdit, IconTrash } from "@tabler/icons-vue";
import type { TTableheaders } from "@/components/dataTable/DataTable.vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import { storeToRefs } from "pinia";
import DeleteData from "../delateData/DeleteData.vue";
import RightSideBare from "@/components/sideBar/RightSideBare.vue";
import Button from "@/components/button/Button.vue";
import { useRSidebarStore } from "@/store/rSideBareStore.ts";

const productStore = useproductStore();
const rSidebarStore = useRSidebarStore()
onMounted(async () => {
  await productStore.fetchProducts();
  isLoading.value = productStore.loading;
});
onUnmounted(() => {
  rSidebarStore.isSidebar = false;
});
const {products} = storeToRefs(productStore)
const isLoading = ref<boolean>(false);
const selectedProduct = ref();

const perishableProducts = computed(()=>products.value?.filter((u: any)=>u.perishable))
const nonPerishableProducts = computed(()=>products.value.filter((u: any)=>!u.perishable))

const isCreateProduct = ref(false);
const isDeleteData = ref(false)


const newProduct = {
  label: "New Product",
  action: () => (isCreateProduct.value = true),
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "createdAt",
    name: "Created At",
     render: (record: any) =>
      // record?.role
         h(FormateDate, {
            date: record.createdAt || "-"
          }),
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "productName",
    name: "Product Name",
    render: (record: any) => (record?.productName ? record?.productName : "-"),
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "specification",
    name: "Specification",
    render: (record: any) => (record?.specification ? record?.specification : "-"),
    width: "28",
  },
   {
    textAlign: "left",
    accessor: "description",
    name: "Description",
    render: (record: any) => (record?.description ? record?.description : "-"),
    width: "28",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: "Actions",
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconBinaryTree2, {
        // stroke: {1.75}
        size: 18,
        class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
        onClick: ()=>{
            selectedProduct.value = record;
          }
      }  ),
        h(IconEdit, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: ()=>{
            selectedProduct.value = record;
            // isCreateCat.value = true;
          }
         
        }),
        h(IconTrash, {
          size: 18,
          class: "cursor-pointer text-(--danger) hover:text-red-700",
          onClick: ()=>{
            selectedProduct.value = record;
            // isDeleteCat.value = true;
          }
        }),
      ]),
    width: "28",
  },
];


</script>
