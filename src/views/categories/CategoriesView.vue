<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      title="Categories"
      subtitle="Organize products into categories for easier inventory management."
      :refresh="
        async () => {
          await store.fetchCategories();
        }
      "
      :new="newCategory"
      :loading="store.loading"
    />
    <div
      class="flex justify-center md:justify-end items-center flex-col md:flex-row gap-3"
    >
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
    <FilterBar
      searchEndPoint="categories"
      searchProperty="categoryName"
      routeName="category_detail"
    >
      <CategoriesFilter />
    </FilterBar>
    <div>
      <!-- <LoadingView v-if="" /> -->
      <div class="flex flex-col gap-3">
        <div
          v-if="categories.length > 0"
          class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-3 w-full"
        >
          <div v-if="store.loading" v-for="i in 20" :key="i">
            <CategoryCardSkeleton />
          </div>
          <div v-else v-for="category in categories">
            <CategoryCard
              :category="category"
              :editeHandler="() => editeHandler(category)"
            />
          </div>
        </div>
        <div v-else class="w-full">
          <EmptyState
            title="No categories found"
            message="There are no categories to display yet. Create a category to get started."
          />
        </div>

        <Pagination
          @changePage="handlePageChange"
          :totalPages="pagination?.totalPages"
          :page="pagination?.page"
          :hasNext="pagination.hasNext"
          :hasPrev="pagination?.hasPrev"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import PageHeader from "@/components/molecules/PageHeader.vue";
import { IconFolderPlus } from "@tabler/icons-vue";
import DataSommary from "@/components/dataSommary/DataSommary.vue";
import { usecategoriesStore } from "@/store/categoryStore";
import { storeToRefs } from "pinia";
import Pagination from "@/components/pagination/Pagination.vue";
import CategoryCard from "@/components/card/CategoryCard.vue";
import CategoryCardSkeleton from "@/components/skeleton/CategoryCardSkeleton.vue";
import FilterBar from "@/components/filterBar/FilterBar.vue";
import CategoriesFilter from "./CategoriesFilter.vue";
import EmptyState from "@/components/empty/EmptyState.vue";

const isCreateCat = ref(false);
const newCategory = {
  label: "New Category",
  action: () => (isCreateCat.value = true),
  icon: IconFolderPlus,
};

const categoryEdit = ref();
// const categoryDetail = ref();
const store = usecategoriesStore();
const { categories } = storeToRefs(store);
const { pagination } = storeToRefs(store);

const handlePageChange = async (page: number) => {
  await store.fetchCategories(page);
};

const editeHandler = (item: any) => {
  categoryEdit.value = item;
  isCreateCat.value = true;
};
onMounted(async () => {
  await store.fetchCategories();
});
</script>
