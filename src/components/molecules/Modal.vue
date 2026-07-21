<template>

    <Transition
    enter-active-class="transition duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
  <div
      class="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4"
    >
      <Transition
        enter-active-class="transition duration-300"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition duration-200"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <slot/>
        </Transition>
        </div>
        </Transition>
</template>