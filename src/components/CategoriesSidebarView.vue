<template>

<section class=" w-40 h-full fixed top-45 right-0 flex justify-end ml-2 dark:border-l dark:border-gray-700">
    <div class="flex flex-col items-end px-2 pr-6 text-sm ">
        <button v-for="item in props.record" class="border-r-2 border-gray-200 hover:border-gray-800 py-2 pr-2 dark:hover:text-gray-200">{{ item }}</button>
    </div>
</section>

</template>

<script setup lang="ts">
const props = defineProps<{record:any[]}>()
</script>