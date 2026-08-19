import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { ref } from "vue";
import useFetchData from "@/hooks/request";
import { computed } from "vue";

export const useCampaignsStore = defineStore("campaigns", () => {
  const filters = ref<any>(undefined)
  const page = ref(1);
  const limit = ref(20);
  const { data, fetchData, pagination, loading } = useFetchData({
    limit,
    page,
    url: "campaign",
    filters
  });

  const campaigns = computed(() => data.value);

  const fetchCampaigns = async (newPage?: number) => {
    if (newPage) {
      page.value = newPage;
    }
    await fetchData();
  };

   const filterCampaigns = (values: any) => {
    const filterData = {
      startDate: values?.startDate || undefined,
      endDate: values?.endDate || undefined,
      type: values?.type || undefined,
      status: values?.status || undefined,
    };
   
    filters.value = filterData;

    if (values.limit) {
      limit.value = values.limit;
    }

    page.value = 1;

    fetchData();
  };



  const createCampaigns = async (newcampaigns: any, id?: string) => {
    return await apiClient({
      method: id ? "PATCH" : "POST",
      url: id ? `/campaign/${id}` : `/campaign`,
      data: newcampaigns,
    });
  };

  // const deleteCampaigns = (id: string) => {
  //   return apiClient.delete(`/campaign/${id}`);
  // };

  return {
    fetchCampaigns,
    campaigns,
    loading,
    createCampaigns,
    filterCampaigns,
    // deleteCampaigns,
    pagination
  };
});
