<template>
    <div class="p-4 md:p-8 rounded-xl border border-(--border) bg-(--surface) shadow-sm overflow-auto"
    :class="props.w? `w=${props.w}`: `w-full`">
        <slot/>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{w?:string}>()
</script>