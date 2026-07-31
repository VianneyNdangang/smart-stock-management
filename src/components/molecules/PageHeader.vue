<template>
<Card>
    <section class="flex justify-center md:justify-between items-center flex-col md:flex-row">
        <div class=" flex gat-3 flex-col w-full ">
            <h1 class="text-3xl font-bold text-(--text-primary)">{{ props?.title }}</h1>
            <p class="text-md text-(--text-secondary)">{{ props.subtitle }}</p>
        </div>
        
        <div class="flex flex-col md:flex-row justify-center my-4 items-center gap-3 w-full">
            <Input name="search" placeholder="Search ..." type="text"/>
            <div class="flex gap-3 justify-center items-center w-full">
                 <Button v-if="props.new" :label="props.new.label" type="button" variant="primary" :click="props.new.action" w="full"/>
            <Button label="Refresh" w="full" type="button" variant="secondary" :click="props.refresh"/>
            </div>
           
        </div>
    </section>
</Card>
</template>

<script setup lang="ts">
import Button from '../button/Button.vue';
import Card from '../card/Card.vue';
import Input from '../input/Input.vue';

const props = defineProps<
    {
        refresh?: ()=>{}
        title?: string,
        subtitle?: string
        new?:{
            label: string,
            action: () => {}
        }
    }
>();

</script>