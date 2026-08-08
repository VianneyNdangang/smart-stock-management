import { defineStore } from "pinia";
import { apiClient } from "@/store/api.ts";
import { ref } from "vue";
import useFetchData from "@/hooks/request";
import { computed } from "vue";

export const useCampaignsStore = defineStore("campaigns", () => {

  const page = ref(1);
  const { data, fetchData, pagination, loading } = useFetchData({
    limit: 50,
    page,
    url: "campaign",
  });

  const campaigns = computed(() => data.value);

  const fetchCampaigns = async (newPage?: number) => {
    if (newPage) {
      page.value = newPage;
    }
    await fetchData();
  };

  const createCampaigns = async (newcampaigns: any, id?: string) => {
    return await apiClient({
      method: id ? "PATCH" : "POST",
      url: id ? `/campaign/${id}` : `/campaign`,
      data: newcampaigns,
    });
  };

  const deleteCampaigns = (id: string) => {
    return apiClient.delete(`/campaign/${id}`);
  };

  return {
    fetchCampaigns,
    campaigns,
    loading,
    createCampaigns,
    deleteCampaigns,
    pagination
  };
});
