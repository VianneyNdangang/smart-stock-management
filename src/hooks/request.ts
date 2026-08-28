import { apiClient } from "@/store/api";
import type { AxiosResponse } from "axios";
import { onMounted, ref, unref, type Ref } from "vue";
import { getSearch } from "@/helpers/utils";

export type TPagination = {
  page?: Ref<number> | number;
  limit?: Ref<number> | number;
  keys?: string;
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

      const responseData = props.keys
        ? response.data[props.keys]
        : response.data;
      data.value = responseData.items;

      pagination.value = {
        ...pagination.value,
        page: responseData.page,
        limit: responseData.limit,
        totalPages: responseData.totalPages,
        hasNext: responseData.hasNext,
        hasPrev: responseData.hasPrev,
        total: responseData.total,
        totalPerishables: responseData.totalPerishables,
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
