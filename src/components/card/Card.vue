<template>
    <div :class="[containerClass, props.w ? `w-${props.w}` : 'w-full']">
        <div v-if="hasTitle" class="mb-3">
            <slot name="title">
                <h3 class="text-lg font-semibold">{{ props.title ? t(props.title) : '' }}</h3>
            </slot>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const props = defineProps<{ w?: string; title?: string }>()
const { t } = useI18n()

const hasTitle = computed(() => !!props.title)
const containerClass = "p-2 md:p-3 rounded-(--radius) border-0.5 border-(--border) bg-(--card) shadow-xs scrollbar-thumb-transparent"
</script>