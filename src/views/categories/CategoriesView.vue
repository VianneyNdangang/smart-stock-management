<template>
  <div class="flex flex-col gap-5">
    <PageHeader
      title="Categories"
      subtitle="Organize products into categories for easier inventory management."
      :refresh="
        async () => {
          await store.fetchCategories();
        }
      "
      :new="newCategory"
    />
    <div class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-5">
      <DataSommary
        title="Total categories"
        :value="pagination?.total"
        state="primary"
      />
      <DataSommary
        title="Total categories Level 1"
        :value="categories?.length"
        state="warning"
      />
      <DataSommary
        title="Total categories Level 2"
        :value="categories?.filter((u: any) => u.level === 2)?.length"
        state="warning"
      />
      <!-- <DataSommary title="Total Foot Workers" :value="categories.filter((u: any)=>u.role === 'FootWorker').length" state="success" /> -->
    </div>
    <div>
      <!-- <LoadingView v-if="" /> -->
      <div class="flex flex-col md:flex-row gap-5">

        <DataTable
          title="Categories: Level 1"
          :records="categories"
          :headers="header"
          :total="pagination?.total"
          :loading="store.loading"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination?.hasNext"
          :hasPrev="pagination?.hasPrev"
          @changePage="handlePageChange"
        />
      </div>
    </div>
  </div>
  <CreateCategory
    v-if="isCreateCat"
    :category="categoryEdit"
    :isOpen="isCreateCat"
    @close="
      () => {
        isCreateCat = false;
        categoryEdit = null;
      }
    "
  />
  <DeleteData
    :action="() => handleDelete"
    :id="categoryDelete?.id"
    message="Cette action supprimera définitivement cet catégorie ainsi que les données qui lui sont associées. Cette opération est irréversible. Voulez-vous continuer ?"
    title="Supprimer la catégorie"
    :isOpen="isDeleteCat"
    @close="
      () => {
        isDeleteCat = false;
        categoryDelete = null;
      }
    "
  />
</template>
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import PageHeader from "@/components/molecules/PageHeader.vue";
import { IconBinaryTree2, IconEdit, IconListDetailsFilled, IconTrash } from "@tabler/icons-vue";
import type { TTableheaders } from "@/components/dataTable/DataTable.vue";
import DataTable from "@/components/dataTable/DataTable.vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { usecategoriesStore } from "@/store/categoryStore";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import CreateCategory from "./CreateCategory.vue";
import DeleteData from "../delateData/DeleteData.vue";
import { storeToRefs } from "pinia";

const isCreateCat = ref(false);
const isDeleteCat = ref(false);
const newCategory = {
  label: "New Category",
  action: () => (isCreateCat.value = true),
};

const header: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "createdAt",
    name: "Created At",
    render: (record: any) =>
      // record?.role
      h(FormateDate, {
        date: record.createdAt || "-",
      }),
    width: "12%",
  },
  {
    textAlign: "left",
    accessor: "categoryName",
    name: "Category Name",
    render: (record: any) =>
      record?.categoryName ? record?.categoryName : "-",
    width: "20%",
  },
  {
    textAlign: "left",
    accessor: "categoryManager",
    name: "category Manager",
    render: (record: any) =>
      record?.categoryManagerName ? record?.categoryManagerName : "-",
    width: "20%",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: "Actions",
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconListDetailsFilled, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            categoryDetail.value = record
          },
        }),
        h(IconBinaryTree2, {
          // stroke: {1.75}
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            if (record.level === 1) {
              selectedCat.value = record;
            } else {
              products.value = record.products;
            }
          },
        }),
        h(IconEdit, {
          size: 18,
          class: "cursor-pointer text-(--text-primary) hover:text-blue-700",
          onClick: () => {
            categoryEdit.value = record;
            isCreateCat.value = true;
          },
        }),
        h(IconTrash, {
          size: 18,
          class: "cursor-pointer text-(--danger) hover:text-red-700",
          onClick: () => {
            categoryDelete.value = record;
            isDeleteCat.value = true;
          },
        }),
      ]),
    width: "auto",
  },
];

const selectedCat = ref();
const categoryDelete = ref();
const categoryEdit = ref();
const categoryDetail = ref();
const products = ref();
const store = usecategoriesStore();
const { categories } = storeToRefs(store);
const { pagination } = storeToRefs(store)
const loading = ref(false);

// const categories_l1 = computed(() =>
//   categories.value.filter((cat: any) => cat.level === 1),
// );

// const categories_l2 = computed(() => {
//   if (!selectedCat.value) {
//     return [];
//   }

//   return categories.value.filter(
//     (cat) => cat.parentId === selectedCat.value.id,
//   );
// });


const handlePageChange = async (page: number) => {
  await store.fetchCategories(page);
};


const handleDelete = async () => {
  loading.value = false;
  try {
    await store.deleteCategory(selectedCat.value.id);
    // categories.value = categories.value.filter((cat)=>cat.id != selectedCat.value.id)
    store.fetchCategories();
    selectedCat.value = null;
    isDeleteCat.value = false;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  await store.fetchCategories();
});
</script>
