<script setup lang="ts">
interface Props {
  text: string
  position?: "top" | "bottom" | "left" | "right"
}

withDefaults(defineProps<Props>(), {
  position: "top",
})
</script>

<template>
  <span class="group relative inline-block">
    <slot />

    <span
      class="
        absolute
        z-50
        rounded-md
        bg-(--surface)
        px-2.5
        py-1.5
        text-xs
        font-medium
        shadow-sm
        text-(--text-secondary)
        whitespace-nowrap
        opacity-0
        invisible
        transition-opacity
        duration-200
        group-hover:opacity-100
        group-hover:visible
        pointer-events-none
      "
      :class="{
        'bottom-full left-1/2 mb-2 -translate-x-1/2':
          position === 'top',

        'top-full left-1/2 mt-2 -translate-x-1/2':
          position === 'bottom',

        'right-full top-1/2 mr-2 -translate-y-1/2':
          position === 'left',

        'left-full top-1/2 ml-2 -translate-y-1/2':
          position === 'right',
      }"
    >
      {{ text }}
    </span>
  </span>
</template>