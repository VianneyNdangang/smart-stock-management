<template>
    <div class="w-10"><img :src="props.src" alt="Profil" :class="`rounded w-auto h-${props.h}`" v-if="props.src"/>
<IconContrast2Filled size="40" v-else 
        class="cursor-pointer flex justify-center items-center rounded text-(--secondary)"/></div>

</template>

<script setup lang="ts">
import { IconContrast2Filled } from '@tabler/icons-vue';
const props = defineProps<{
    src: any,
    h: string
}>()
</script>