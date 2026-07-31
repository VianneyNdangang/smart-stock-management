<template>
  <div v-if="isOpen">
    <Modal>
      <Card w="md">
        <div class="max-w-md">
        <p class="text-(--text-secondary) text-lg font-semibold mb-2 flex">{{props.title}}<p class="font-bold ml-1">{{ props.name }}</p></p>
        <p class="text-(--text-thirdly) text-justify text-sm">
          {{props.message}}
        </p>
        <div class="flex justify-end items-center gap-3 w-full mt-2">
          <Button label="Annuler" type="button" variant="secondary" :click="()=>emit('close')"/>
          <Button label="Supprimer" type="button" variant="primary" :click="()=>{props.action}" />
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


const props = defineProps<{
    title: string,
    message: string,
    id?: string,
    name?: string
    isOpen: boolean,
    action?: ()=>{},
}>()

const emit = defineEmits<{
  (e: "close"): void;
}>();

</script>
