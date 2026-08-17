<template>
<img :src="props.src" alt="Profil" :class="`rounded-full w-auto h-${props.h}`" v-if="props.src"/>
<IconUserFilled size="30" v-else 
        class="cursor-pointer flex justify-center items-center p-2 rounded-full text-(--secondary) bg-(--background) border border-(--secondary)"/>
</template>

<script setup lang="ts">
import { IconUserFilled } from '@tabler/icons-vue';

const props = defineProps<{
    src: any,
    h: string
}>()
</script>