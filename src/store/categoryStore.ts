import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const usecategoriesStore = defineStore("categories", () => {
  const filters = ref<any>();
  const page = ref(1);
  const limit = ref(20);
  const { data, fetchData, pagination, loading } = useFetchData({
    limit,
    page,
    url: "categories",
    filters,
  });

  const categories = computed(() => data.value);

  const fetchCategories = async (newPage?: number) => {
    if (newPage) {
      page.value = newPage;
    }
    await fetchData();
  };

  const filterCategories = (values: any) => {
    const data = {
      productId: values.productId,
      level: values.level === ''? undefined :Number(values.level),
      isActif:
        values.isActif === "actif"
          ? true
          : values.isActif === "inactive"
            ? false
            : undefined,
    };
    filters.value = data;
    limit.value = values.limit;
    fetchCategories();
  };

  const filterSubCategories = (values: any) => {
    const data = {
      parentId: values.parentId,
    };
    filters.value = data;
    fetchCategories();
  };

  const createCategory = async (data: any, id?: string) => {
    const response = await apiClient({
      method: id ? "PATCH" : "POST",
      url: id ? `/categories/${id}` : `/categories`,
      data: data,
    });
    return response;
  };

  const deleteCategory = (id: string) => {
    return apiClient.delete(`/categories/${id}`);
  };

  return {
    fetchCategories,
    categories,
    loading,
    createCategory,
    deleteCategory,
    pagination,
    filterCategories,
    filterSubCategories,
  };
});


export const useCategoriyProductsStore = defineStore("categorieProducts", () => {
  const filters = ref<any>();
  const page = ref(1);
  const limit = ref(20);
  const url = ref()
  const { data, fetchData, pagination, loading } = useFetchData({
    limit,
    page,
    url,
    filters,
    keys: 'products'
  });

  const products = computed(() => data.value);

  const fetchCategoryProducts = async (id?: string, newPage?: number) => {
    if (newPage) {
      page.value = newPage;
    }if(id){
      url.value = `categories/${id}`
    }
    await fetchData();
  };

  // const filterCategoryProducts = (values: any) => {
  //   // console.log("valuesvaluesvaluesvalues", values);
  //   const data = {
  //     productId: values.productId,
  //     level: values.level === ''? undefined :Number(values.level),
  //     isActif:
  //       values.isActif === "actif"
  //         ? true
  //         : values.isActif === "inactive"
  //           ? false
  //           : undefined,
  //   };
  //   filters.value = data;
  //   limit.value = values.limit;
  //   fetchCategoryProducts();
  // };

  return {
    fetchCategoryProducts,
    products,
    loading,
    pagination,
    // filterCategoryProducts,
  };
});