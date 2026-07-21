<template>
  <div class="class flex flex-col gap-5">
    <!-- Button -->
    <div class="p-8 bg-(--surface) flex md:flex-row flex-col gap-8">
      <div>
        <h1 class="text-xl font-semibold mb-3">Button</h1>
        <div class="flex items-center md:flex-row flex-col gap-3">
          <Button variant="primary" label="Primary" type="button" />
          <Button variant="secondary" label="Secondary" type="button" />
          <Button variant="ghost" label="ghost" type="button" />
        </div>
      </div>
      <div>
        <h1 class="text-xl font-semibold mb-3">Loading button</h1>
        <div class="flex items-center gap-3 md:flex-row flex-col">
          <Button
            :loading="true"
            variant="primary"
            label="Primary"
            type="button"
          />
          <Button
            :loading="true"
            variant="secondary"
            label="Secondary"
            type="button"
          />
          <Button :loading="true" variant="ghost" label="ghost" type="button" />
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="p-8 bg-(--surface) flex md:flex-row flex-colgap-8">
      <div>
        <h1 class="text-xl font-semibold mb-3">Input</h1>
        <div class="flex md:flex-row flex-col items-center gap-3">
          <InputComponent
            type="text"
            placeholder="Text"
            label="Text"
            name="text"
          />
          <InputComponent
            type="number"
            placeholder="Number"
            label="Number"
            name="number"
          />
          <InputComponent
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
          />
          <!-- <InputComponent type="date" placeholder="Date" label="Date" name="date"/>
                    <InputComponent type="email" placeholder="Email" label="Email" name="email"/>
                     -->
        </div>
      </div>
      <div>
        <!-- <h1 class="text-xl font-semibold mb-3">Loading button</h1>
                <div class="flex items-center gap-3">
                    <Button :loading="true" variant="primary" label="Primary" type="button" />
                    <Button :loading="true" variant="secondary" label="Secondary" type="button" />
                    <Button :loading="true" variant="ghost" label="ghost" type="button" />
                </div> -->
      </div>
    </div>

    <div class="p-8 bg-(--surface) flex gap-8 w-full">
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Skeletons</h1>

        <TableSkeleton />
      </div>
    </div>
    <div class="p-8 bg-(--surface) flex gap-8 w-full">
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Drawers</h1>
        <Button
          type="button"
          variant="primary"
          label="Top"
          :click="() => (isDrawer = true)"
        />

        <Drawer :isOpen="isDrawer" @close="isDrawer = false" placement="top" />
      </div>
    </div>
    <div class="p-8 bg-(--surface) flex gap-8 w-full">
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Button</h1>
        <div class="flex items-center md:flex-row flex-col gap-3">
            <Switch/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import Drawer from "@/components/drawer/Drawer.vue";
import InputComponent from "@/components/input/InputComponent.vue";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import Switch from "@/components/switch/Switch.vue";
import { ref } from "vue";
const isDrawer = ref(false);
</script>
