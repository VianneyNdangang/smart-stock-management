<template>
  <div class="items-center">
    <button
      class="px-3 py-1 rounded border text-sm"
      @click="toggleLocale"
      :title="t('navbar.language')"
    >
      {{ localeCode }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale, t } = useI18n()
const localeCode = computed(() => (locale.value === 'fr-FR' ? 'FR' : 'EN'))
const toggleLocale = () => {
  locale.value = locale.value === 'fr-FR' ? 'en-GB' : 'fr-FR'
}
</script>
