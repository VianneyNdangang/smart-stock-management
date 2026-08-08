import { apiClient } from "@/store/api";
import type { AxiosResponse } from "axios";
import { onMounted, ref, type Ref } from "vue";
import { getSearch } from "@/helpers/utils";

export type TPagination = {
  page?: Ref<number>;
  limit?: number;
  filters?: Ref<any>;
  totalPages?: number;
  total?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  totalPerishables?: number
  url?: string;
};
const useFetchData = (props: TPagination) => {
  const data = ref<any[]>([]);
  const loading = ref(false);

  const pagination = ref<TPagination>({
  page: props.page,
  limit: props.limit ?? 20,
  url: props.url,
});

  const fetchData = async () => {
    try {
      loading.value = true;
      const response: AxiosResponse = await apiClient({
        url: props.url,
        method: "GET",
        params: {
          page: props.page?.value,
          limit: props.limit,
          ...getSearch(props.filters?.value),
        },
      });
      data.value = response.data.items;


      pagination.value = {
      ...pagination.value,
      page: response.data.page,
      limit: response.data.limit,
      totalPages: response.data.totalPages,
      hasNext: response.data.hasNext,
      hasPrev: response.data.hasPrev,
      total: response.data.total,
      totalPerishables: response.data.totalPerishables
    };

    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });

  return { fetchData, data, loading, pagination };
};

export default useFetchData;
