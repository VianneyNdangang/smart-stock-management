<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="md">
        <div class="max-w-md flex flex-col gap-3">
        <p class="text-(--text-secondary) text-lg font-semibold mb-2 flex">{{props.title}}</p>
        <p class="text-(--text-thirdly) text-justify text-sm">
          {{props.message}}
        </p>
        <div class="flex justify-end items-center gap-3 w-full mt-2">
          <Button name="cancel" :label="t('form.cancel')" type="button" variant="secondary" :click="()=>emit('close')"/>
          <Button name="delete" :label="t('form.delete')" type="button" variant="primary" :loading="props.loading" :click="()=>{action(), emit('close')}" />
        </div>
        </div>
      </Card>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/button/Button.vue';
import Card from '@/components/card/Card.vue';
import Modal from '@/components/molecules/Modal.vue';
import { useI18n } from 'vue-i18n'


const props = defineProps<{
  loading?: boolean,
    title: string,
    message: string,
    isOpen: boolean,
    action: ()=>any,
}>()

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { t } = useI18n();

</script>
