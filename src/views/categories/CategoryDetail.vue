<template>
  <div class="flex flex-col gap-3">
    <BackButton />
    <section>
      <Card>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between">
            <p class="text-lg text-(text-primary) font-bold">
              {{ category?.categoryName }}
            </p>
            <Badge type="success" :message="`Level ` + category?.level" />
          </div>
          <p class="text-sm text-(--text-secondary)">
            {{ category?.description }}
          </p>
          <div class="flex flex-col md:flex-row gap-3">
            <!-- Informations -->

            <div class="flex justify-between gap-3 px-5 w-full">
              <div class="rounded border border-(--border) p-4 w-full">
                <p class="text-sm text-(--text-secondary)">Parent</p>
                <p class="font-medium px-2">
                  {{ category?.parentName }}
                </p>
              </div>
              <div class="rounded border border-(--border) p-4 w-full">
                <p class="text-sm text-(--text-secondary)">Subcategories</p>
                <p class="font-medium px-2">
                  {{ category?.categoryName }}
                </p>
              </div>

              <div class="rounded border border-(--border) p-4 w-full">
                <p class="text-sm text-(--text-secondary)">Total product</p>
                <p class="font-medium px-2">
                  {{products.length > 0 ? productsPagination.total : category?.products?.total }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex justify-start items-center gap-2">
            <p class="text-sm">Created at:</p>
            <FormateDate :date="category?.createdAt" />
          </div>
        </div>
      </Card>
    </section>
    <div v-if="store.loading">
      <LoadingView/>
    </div>
    <div v-else>
    <section v-if="subcategories.length > 0" class="flex flex-col gap-2">
      <h1 class="text-lg font-bold text-(--text-primary)">
        Liste sous categories.
      </h1>
      <!-- <p class="text-sm text-(--text-secondary)">Liste sous categories.</p> -->
      <div class="grid gri-cols-2 md:grid-cols-3 gap-3">
        <div v-if="loading" v-for="i in 20" :key="i">
          <CategoryCardSkeleton />
        </div>
        <div
          v-else
          v-for="(category, index) in subcategories"
          :key="index"
          @click="
            () => {
              handleChangecategory(category.id);
            }
          "
        >
          <CategoryCard :category="category" :editeHandler="() => {}" />
        </div>
      </div>
      <Pagination
        :totalPages="pagination.totalPages"
        :hasNext="pagination.hasNext"
        :hasPrev="pagination.hasPrev"
        :page="pagination.page"
        @changePage="handlePageChange"
      />
    </section>
    <section  v-if="products?.length > 0">
    <DataTable
      title="products of this category"
      :records="products"
      :headers="header"
      :total="productsPagination.total"
      :loading="false"
      :totalPages="productsPagination.totalPages"
      :page="productsPagination.page"
      :hasNext="productsPagination.hasNext"
      :hasPrev="productsPagination.hasPrev"
      :changePage="handleProductsPageChange"
    />
    </section>
    </div>
    <section class="flex flex-col gap-2 w-full"></section>
  </div>
</template>
<script setup lang="ts">
import Badge from "@/components/badge/Badge.vue";
import Card from "@/components/card/Card.vue";
import CategoryCard from "@/components/card/CategoryCard.vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import type { TTableheaders } from "@/components/dataTable/type";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import ProductProfile from "@/components/profile/ProductProfile.vue";
import CategoryCardSkeleton from "@/components/skeleton/CategoryCardSkeleton.vue";
import useFetchData from "@/hooks/request";
import { apiClient } from "@/store/api";
import { useToastStore } from "@/store/toastStore";
import { IconEye } from "@tabler/icons-vue";
import { computed, h, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const store = useCategoriyProductsStore();

const category = ref();
const toast = useToastStore();
const subcategories = computed(() => data.value);
const { products } = storeToRefs(store)
const productsPagination = computed(()=> store.pagination) 
const page = ref(1);
const filters = ref<any>();
const limit = ref(20);
const { data, fetchData, pagination, loading } = useFetchData({
  limit,
  url: "categories",
  page,
  filters,
});

const handleChangecategory = async (id: string) => {
  try {
    const items = (await apiClient.get(`categories/${id}`)).data;
    category.value = items;
    store.fetchCategoryProducts(items.id)


    filters.value = {
      parentId: items.id,
    };
    fetchData();
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

const handlePageChange = async (pag: number) => {
  page.value = pag;
  fetchData();
};

const handleProductsPageChange = async (page: number) => {
  await store.fetchCategoryProducts( category.value?.id ,page);
};
import { useI18n } from "vue-i18n";
import { useCategoriyProductsStore } from "@/store/categoryStore";
import BackButton from "@/components/backbutton/BackButton.vue";
import { storeToRefs } from "pinia";
import LoadingView from "@/components/molecules/LoadingView.vue";
const { t } = useI18n();

const header = computed<TTableheaders[]>(()=>{
  if(products.value.length < 0){
    return []
  }
 return [
  {
    textAlign: "left",
    accessor: "productName",
    name: () => t("products.columns.productName"),
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
    name: () => t("products.columns.units"),
    render: (record: any) =>
      h(Badge, {
        type: "primary",
        message: record?.units || "-",
      }),
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "catedoryName",
    name: () => t("products.columns.category"),
    render: (record: any) =>
      record?.category?.categoryName ? record?.category?.categoryName : "-",
    width: "auto",
  },
  {
    textAlign: "left",
    accessor: "perishable",
    name: () => t("products.columns.variant"),
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
    name: () => t("products.columns.createdAt"),
    render: (record: any) =>
      // record?.role
      h(FormateDate, {
        date: record.createdAt || "-",
      }),
    width: "auto",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: () => t("products.columns.actions"),
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
})
</script>
