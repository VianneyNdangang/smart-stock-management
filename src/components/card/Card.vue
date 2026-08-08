<template>
    <div class="p-3 md:p-6 rounded-(--radius) border-0.5 border-(--border) bg-(--card) shadow-xs scrollbar-thumb-transparent overflow-auto"
    :class="props.w? `w=${props.w}`: `w-full`">
        <slot/>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{w?:string}>()
</script>