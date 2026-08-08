<template>
    <div class=" rounded-md px-5 flex flex-col text-right" :class="props.state === 'danger'? `texte-(--danger)`:props.state === 'success'? `text-(--success)`:props.state === 'primary'?`text-(--primary)`:`text-(--warning)`">
        <p class="text-sm font-semibold text-(--text-muted) overflow-auto">{{ props.title }}</p>
        <p class="text-6xl font-bold">{{ props.value }}</p>
        <!-- <p class="text-xs font-semibold">{{ props.title }}</p> -->
        <div class="w-full rounded-full"
       ></div>
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{
    title: string,
    value: any,
    description?:string,
    state?: 'danger'| 'success' | 'primary' |'warning',
}>()

</script>