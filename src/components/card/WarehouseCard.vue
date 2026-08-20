<template>
  <div
    @click="
      () => {
        router.push({
          name: 'warehouse_detail',
          params: { id: warehouse.id },
        });
      }
    "
    class="group relative w-full overflow-hidden rounded-(--radius) border border-(--border) bg-(--card) p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex min-w-0 items-center gap-3">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-(--primary)/10 text-(--primary)"
        >
          <IconBuildingWarehouse size="23" stroke="1.7" />
        </div>

        <div class="min-w-0">
          <h3
            class="truncate font-semibold text-(--text-primary)"
            :title="warehouse?.warehouseName"
          >
            {{ warehouse?.warehouseName }}
          </h3>

          <div
            class="mt-1 flex items-center gap-1.5 text-xs text-(--text-muted)"
          >
            <IconMapPin size="14" />
            <span class="truncate">
              {{ warehouse?.position }}
            </span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <button
        type="button"
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text-primary)"
      >
        <IconDotsVertical size="18" />
      </button>
    </div>

    <!-- Divider -->
    <div class="my-4 h-px bg-(--border)" />

    <div class="grid grid-cols-2 gap-3">
      <div class="rounded-md p-3">
        <div class="mb-1 flex items-center gap-1.5 text-xs text-(--text-muted)">
          <IconMap size="14" />
          <span>Region</span>
        </div>

        <p
          class="truncate text-sm font-medium text-(--text-primary)"
          :title="warehouse?.region"
        >
          {{ warehouse?.region }}
        </p>
      </div>

      <div class="mt-3 flex items-center gap-3">
        <Profile h="9" :name="warehouse?.creator?.userName" />

        <div class="min-w-0">
          <p class="text-xs text-(--text-muted)">Created by</p>

          <p
            class="truncate text-sm font-medium text-(--text-primary)"
            :title="warehouse?.creator?.userName"
          >
            {{ warehouse?.creator?.userName }}
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-md p-3">
      <div class="mb-1 flex items-center gap-1.5 text-xs text-(--text-muted)">
        <IconCalendar size="14" />
        <span>Created</span>
        <FormateDate
          class="text-(--text-primary)"
          :date="warehouse?.createdAt"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconBuildingWarehouse,
  IconMapPin,
  IconMap,
  IconCalendar,
  IconDotsVertical,
} from "@tabler/icons-vue";
import FormateDate from "../formateDate/FormateDate.vue";
import { useRouter } from "vue-router";
import Profile from "../profile/Profile.vue";

const router = useRouter();
interface Warehouse {
  id: string;
  warehouseName: string;
  position: string;
  region: string;
  createdAt: string;
  creator: {
    userName: string;
    id: string;
  };
}

const props = defineProps<{
  warehouse: Warehouse;
}>();
</script>
