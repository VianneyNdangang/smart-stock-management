import { apiClient } from "@/store/api";
import type { AxiosResponse } from "axios";
import { onMounted, ref, unref, type Ref } from "vue";
import { getSearch } from "@/helpers/utils";

export type TPagination = {
  page?: Ref<number> | number;
  limit?: Ref<number> | number;
  filters?: Ref<any> | any;
  totalPages?: number;
  total?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  totalPerishables?: number;
  url?: Ref<string> | string;
};

export type TPaginationState = {
  page?: number;
  limit?: number;
  url?: string;
  totalPages?: number;
  total?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  totalPerishables?: number;
  totalProducts?: number;
};

const useFetchData = (props: TPagination) => {
  const data = ref<any[]>([]);
  const loading = ref(false);

  const pagination = ref<TPaginationState>({
    page: unref(props.page),
    limit: unref(props.limit),
    url: unref(props.url),
  });


  const fetchData = async () => {
    try {
      loading.value = true;

      const pageParam = unref(props.page);
      const limitParam = unref(props.limit);
      const filtersParam = unref(props.filters);

      const search = getSearch(filtersParam);

      const params = {
        page: pageParam,
        limit: limitParam,
        filter: JSON.stringify(search),
      };

      const response: AxiosResponse = await apiClient({
        url: unref(props.url),
        method: "GET",
        params,
      });

      data.value = response?.data?.items;

      pagination.value = {
        ...pagination.value,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
        hasNext: response.data.hasNext,
        hasPrev: response.data.hasPrev,
        total: response.data.total,
        totalPerishables: response.data.totalPerishables,
        totalProducts: response.data.totalProducts,
      };
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });

  return {
    fetchData,
    data,
    loading,
    pagination,
  };
};

export default useFetchData;