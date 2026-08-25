import { defineStore } from "pinia";
import { computed, ref } from "vue";
import useFetchData from "@/hooks/request";

export const useAlertsStore = defineStore("alerts", () => {
//   const filters = ref<any>(undefined);
  const limit = ref(20);
  const page = ref(1);
//   const id = ref('')
  const url = ref(`stock-alert/warehouse`)
  const filters = ref<any>(undefined)
  const { data, fetchData, pagination, loading } = useFetchData({
    limit,
    page,
    url,
    filters,
  });

  const alerts = computed(() => data.value);
 

  const fetchAlerts = async (newPage?: number, newId?: any, ) => {
   
    if (newPage !== undefined) {
      page.value = newPage;
    }

    if (newId !== undefined) {
      url.value = `stock-alert/warehouse/${newId}`;
    }
    await fetchData(); 
  };

  // const filterAlerts = (values: any) => {
    // const filterData = {
    //   productName: values.productName || undefined,

    //   perishable:
    //     values?.perishable === "perishable"
    //       ? true
    //       : values?.perishable === "nonperishable"
    //         ? false
    //         : undefined,

    //   isActif:
    //     values?.isActif === "actif"
    //       ? true
    //       : values?.isActif === "inactive"
    //         ? false
    //         : undefined,
    // };

    // filters.value = filterData;

  //   if (values.limit) {
  //     limit.value = values.limit;
  //   }

  //   page.value = 1;

  //   fetchData();
  // };
  return {
    fetchAlerts,
    // filterAlerts,
    alerts,
    loading,
    pagination,
  };
});
