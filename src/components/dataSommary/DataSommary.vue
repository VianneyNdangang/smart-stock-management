<template>
<Card>
    <div class="border-l-5 rounded-md p-2" :class="props.state === 'danger'? `border-(--danger)`:props.state === 'success'? `border-(--success)`:props.state === 'primary'?`border-(--primary)`:`border-(--warning)`">
        <p class="text-lg font-semibold overflow-auto">{{ props.title }}</p>
        <p class="text-5xl font-semibold">{{ props.value }}</p>
        <p>{{ props.description }}</p>
        <div class="w-full rounded-full"
       ></div>
    </div>
</Card>
</template>
<script setup lang="ts">
import Card from '../card/Card.vue';

const props = defineProps<{
    title: string,
    value: string | number,
    description?:string,
    state?: 'danger'| 'success' | 'primary' |'warning',
}>()

</script>