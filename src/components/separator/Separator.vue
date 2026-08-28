<template>
    <div class="h-px w-full bg-(--border)" :class="size === 'lg'? `h-0.75`: size === 'md'? `h-0.5`:`h-px`"/>
</template>

<script setup lang="ts">

const props = defineProps<{
    size?: 'sm'| 'md' | 'lg'
}>()
</script>
