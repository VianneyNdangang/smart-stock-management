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
    <div class="flex justify-center items-center flex-col md:flex-row gap-5">
      <DataSommary
        title="Total categories"
        :value="categories.length"
        state="primary"
      />
      <DataSommary
        title="Total categories Level 1"
        :value="categories_l1.length"
        state="warning"
      />
      <DataSommary
        title="Total categories Level 2"
        :value="categories.filter((u: any) => u.level === 2).length"
        state="warning"
      />
      <!-- <DataSommary title="Total Foot Workers" :value="categories.filter((u: any)=>u.role === 'FootWorker').length" state="success" /> -->
    </div>
    <div>
      <!-- <LoadingView v-if="" /> -->
      <div class="flex flex-col md:flex-row gap-5">
        <DataTable
          title="Categories: Level 1"
          :records="categories_l1"
          :headers="header"
          :loading="loading"
        />
        <DataTable
          title="Categories: Level 2"
          :records="categories_l2"
          :headers="header"
          :loading="loading"
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
    :name="categoryDelete?.categoryName"
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
import { ref, onMounted, h, computed } from "vue";
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
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "categoryName",
    name: "Category Name",
    render: (record: any) =>
      record?.categoryName ? record?.categoryName : "-",
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "categoryManager",
    name: "category Manager",
    render: (record: any) =>
      record?.categoryManagerName ? record?.categoryManagerName : "-",
    width: "28",
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
    width: "28",
  },
];

const selectedCat = ref();
const categoryDelete = ref();
const categoryEdit = ref();
const categoryDetail = ref();
const products = ref();
const store = usecategoriesStore();
const { categories } = storeToRefs(store);
const loading = ref(false);

const categories_l1 = computed(() =>
  categories.value.filter((cat: any) => cat.level === 1),
);

const categories_l2 = computed(() => {
  if (!selectedCat.value) {
    return [];
  }

  return categories.value.filter(
    (cat) => cat.parentId === selectedCat.value.id,
  );
});

const handleDelete = async () => {
  loading.value = false;
  try {
    await store.deleteCategory(selectedCat.value.id);
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
