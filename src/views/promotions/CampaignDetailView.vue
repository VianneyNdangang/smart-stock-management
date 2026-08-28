<template>
<div>
    <BackButton/>
    <PageHeader title="" subtitle=""/>
</div>
{{ campaign }}
</template>

<script setup lang="ts">
import BackButton from '@/components/backbutton/BackButton.vue';
import PageHeader from '@/components/molecules/PageHeader.vue';
import { apiClient } from '@/store/api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const campaignId = route.params.id
const campaign = ref()

const getCampaign = async()=>{
    try {
        const response = await apiClient.get(`campaign/${campaignId}`)
        campaign.value = response.data
    } catch (error) {
        
    }
}

onMounted(()=>{
    getCampaign()
})
</script>