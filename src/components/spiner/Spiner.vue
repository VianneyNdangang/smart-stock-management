<template>
    <div class="flex justify-center items-center w-full h-full whitespace-nowrap" :class="props.size === 'sm'? `gap-1`:`gap-2`">
      <div
      class="animate-spin rounded-full  border-(--secondary)/40 border-t-(--secondary) "
        :class="props.size === 'sm'?`h-5 w-5 border-2`:props.size === 'md'?`h-10 w-10 border-5`:`h-16 w-16 border-5`"
      ></div>
      <p :class="responsif?` hidden md:flex`:`flex`">Loading . . .</p>
      
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    size: 'sm' | 'md' | 'lg'
    responsif?: boolean
}>()
</script>