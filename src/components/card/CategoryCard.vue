<template>
  <div
    @click="
      () => {
        router.push({ name: 'category_detail', params: { id: category.id } });
      }
    "
    class="group relative w-full overflow-hidden rounded-(--radius) border border-(--border) bg-(--card) p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
  >
    <div class="flex flex-col">
      <div class="flex justify-between items-start">
        <div class="flex min-w-0 items-center gap-3">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-(--primary)/10 text-(--primary)"
          >
            <IconCategory size="23" stroke="1.7" />
          </div>
          <div class="flex text-md font-bold items-center">
            {{ category.categoryName }}
          </div>
        </div>
        <Badge :message="`Level ` + category.level" type="success" />
      </div>
      <div class="my-4 h-px bg-(--border)" />
      <div class="text-sm text-(--secondary)">{{ category.description }}</div>
      <div class="mt-3 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p class="text-(--text-muted)">{{ t("card.products") }}</p>
          <p class="font-semibold">{{ category?.products?.total || 0 }}</p>
        </div>
        <div>
          <p class="text-(--text-muted)">{{ t("card.stock") }}</p>
          <p class="font-semibold">0</p>
        </div>
        <div>
          <p class="text-(--text-muted)">{{ t("card.status") }}</p>
          <p class="font-semibold">{{ category.status || "-" }}</p>
        </div>
      </div>

      <div class="mt-3 flex justify-between items-center">
        <div
          class="flex justify-center items-center gap-2 text-sm text-(--text-muted)"
        >
          <IconCalendar size="14" />
          <p class="text-(--text-muted)">{{ t("card.createdAt") }}:</p>
          <FormateDate :date="category.createdAt" />
        </div>

        <div class="flex justify-center items-center gap-2">
          <Tooltip position="bottom" :text="t('tooltip.modify')">
            <IconEdit
              v-if="editeHandler"
              class="cursor-pointer hover:text-(--primary)"
              size="17"
              @click="() => editeHandler()"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  IconCalendar,
  IconCategory,
  IconEdit,
} from "@tabler/icons-vue";
import FormateDate from "../formateDate/FormateDate.vue";
import Badge from "../badge/Badge.vue";
import { useRouter } from "vue-router";
import Tooltip from "../tooltip/Tooltip.vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  category: any;
  editeHandler: () => any;
}>();

const router = useRouter();
const { t } = useI18n();
</script>
