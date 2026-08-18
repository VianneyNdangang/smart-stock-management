<template>
    <div class="flex flex-col gap-3">
        <WarehouseCard :warehouse="warehouse"/>
        <DataTable
          title="products"
          :records="stock"
          :headers="header"
       
        >
          <ProductsTableSkeleton/>
        </DataTable>
    </div>
    
</template>
<script setup lang="ts">
import WarehouseCard from '@/components/card/WarehouseCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
import { computed, h, onMounted, ref } from 'vue';
import { useToastStore } from '@/store/toastStore';
import useFetchData from '@/hooks/request';
import { apiClient } from '@/store/api';
import DataTable from '@/components/dataTable/DataTable.vue';
import ProductsTableSkeleton from '@/components/skeleton/ProductsTableSkeleton.vue';
import { IconEye } from '@tabler/icons-vue';
import FormateDate from '@/components/formateDate/FormateDate.vue';
import Badge from '@/components/badge/Badge.vue';
import type { TTableheaders } from '@/components/dataTable/type';
import ProductProfile from '@/components/profile/ProductProfile.vue';

const { t } = useI18n()
const route = useRoute()

const router = useRouter();
const warehouse = ref();
const toast = useToastStore();
// const subcategories = computed(() => data.value);
const stock = ref();
const page = ref(1);
const filters = ref<any>();
const limit = ref(20);
// const { data, fetchData, pagination, loading } = useFetchData({
//   limit,
//   url: "categories",
//   page,
//   filters,
// });

const handleChangecategory = async (id: string) => {
  try {
    const items = (await apiClient.get(`stock/warehouse/${id}`)).data;
    // const items = (await apiClient.get(`warehouse/${id}`)).data;
    // warehouse.value = items;
    // filters.value = {
    //   parentId: items.id,
    // };
    stock.value = items;
    // fetchData();
  } catch (error) {
    toast.show(
      "Operation echouee",
      "danger",
      "Impossible de recuperer les details du produit",
    );
  }
};
onMounted(async () => {
  handleChangecategory(route.params.id as string);
});

// const handlePageChange = async (pag: number) => {
//   page.value = pag;
//   fetchData();
// };

// const handlePageChange = async () => {
//   await fetchData();
// };

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
    accessor: "createdAt",
    name: () => t('products.columns.createdAt'),
    render: (record: any) =>
      h(FormateDate, {
        date: record.createdAt || "-",
      }),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "creator",
    name: () => t('products.columns.creator'),
    render: (record: any) => record.creator?.userName? record.creator?.userName: "-",
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
      ]),
    width: "auto",
  },
];


</script>