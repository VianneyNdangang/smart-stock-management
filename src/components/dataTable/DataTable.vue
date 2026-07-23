<template>

  <card>
    <p class="mt-2 text-lg font-semibold text-(--text-secondary)">
      List of {{ records.length }} {{ title }}.
    </p>
    <table class=" w-full">

      <thead class="h-10 text-(--text-secondly)">
        <tr>
          <th v-for="header in props.headers"
            :class="` whitespace-nowrap text-${header.textAlign} px-3 py-4 max-w-${header.width || 'auto'} border-b border-(--border)`">
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props?.records" class="hover:gb-(--hover) h-10">

          <td v-for="heade in props.headers"
            :class="`px-3 py-2 border-b text-${heade.textAlign} text-(--text-third) border-(--border)`">
            <component v-if="isVNode(heade.render(item))" :is="heade.render(item)" />

            <template v-else>
              {{ heade.render(item) }}
            </template>

          </td>

        </tr>
      </tbody>

    </table>
  </Card>
</template>
<script setup lang="ts">
import { isVNode } from 'vue';
import Card from '../card/Card.vue';

export type TTableheaders = {
  textAlign: 'left' | 'right';
  accessor: string;
  name: string;
  render: (param: any) => any;
  width: '28' | '32' | '36' | '38' | '40' | '44' | 'auto';
};

export type TDatatableProps = {
  headers: TTableheaders[];
  records: any[];
  title: string
  total?: number;
  itemsperPage?: number;
  page?: number;
  setPage?: (p: number) => any;
};


const props = defineProps<TDatatableProps>()
</script>
