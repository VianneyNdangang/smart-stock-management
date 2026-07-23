<template>
<Card>
    <section class="flex justify-center md:justify-between items-center flex-col md:flex-row">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">{{ props?.title }}</h1>
        <div class="flex justify-center my-4">
            <InputComponent name="search" placeholder="Search ..." type="text"/>
        </div>
    </section>
</Card>
</template>

<script setup lang="ts">
import Card from '../card/Card.vue';
import InputComponent from '../input/InputComponent.vue';

const props = defineProps<
    {
        title: string,
        action?: () => any
    }
>();

</script>