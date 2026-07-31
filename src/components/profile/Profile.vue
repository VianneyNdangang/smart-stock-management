<template>
<img :src="props.src" alt="Profil" :class="`rounded-full w-auto h-${props.h}`" v-if="props.src"/>
<IconUserFilled size="40" v-else 
        class="cursor-pointer flex justify-center items-center p-3 bg-gray-200 rounded-full text-gray-700 dark:bg-gray-700 dark:text-gray-300"/>
</template>

<script setup lang="ts">
import { IconUserFilled } from '@tabler/icons-vue';

const props = defineProps<{
    src: any,
    h: string
}>()
</script>