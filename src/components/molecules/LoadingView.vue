<template>
    <Modal>
        <div class="flex flex-col justify-center items-center gap-3">
            <img src="/logo.jpg" class="w-12 h-auto rounded-md" />
            <div class=" w-40 h-2 rounded-full bg-gray-200 overflow-hidden dark:bg-gray-900">
                <div class="h-full bg-amber-500 origin-left rounded-full animate-loading"></div>
            </div>
        </div>
    </Modal>
</template>
<script setup lang="ts">
import Modal from "./Modal.vue";
</script>

<style scoped>
@keyframes loading {
    0% {
        transform: scaleX(0);
        transform-origin: left;
    }

    50% {
        transform: scaleX(1);
        transform-origin: left;
    }

    100% {
        transform: scaleX(0);
        transform-origin: right;
    }
}

.animate-loading {
    animation: loading 1.5s ease-in-out infinite;
}
</style>