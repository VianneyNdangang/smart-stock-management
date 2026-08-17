<template>
    <div class="whitespace-nowrap min-w-12 border border-(--border) ">
        <img v-if="props.src" :src="props.src" alt="Profil" :class="`rounded w-auto h-12 `"/>
         <img v-else src="/images/glotelho.webp" alt="logo" class="w-auto h-12 rounded mb-4 " />
<!-- <IconContrast2Filled size="40" v-else 
        class="cursor-pointer flex justify-center items-center rounded text-(--secondary)"/> -->
    </div>

</template>

<script setup lang="ts">
// import { IconContrast2Filled } from '@tabler/icons-vue';
const props = defineProps<{
    src: any,
    h?: string
}>()
</script>