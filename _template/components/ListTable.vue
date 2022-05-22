<script setup lang="ts">
import { columns } from '../constants';
import type { IDataSource } from '../types';
import type { IPagination } from '@/types';

interface IProps {
  dataSource: IDataSource[];
  pagination: IPagination;
}

const props = withDefaults(defineProps<IProps>(), {
  dataSource: () => []
});

const emits = defineEmits(['setVisible', 'setRowInfo', 'fetchData']);

const handleEdit = (record: IDataSource) => {
  emits('setVisible', true);
  emits('setRowInfo', record);
};

const handlePageChange = (cur: number) => {
  emits('fetchData', { page: cur });
};
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="props.dataSource"
    :pagination="props.pagination"
    :scroll="{ x: 'auto' }"
    @change="({ current }: any) => handlePageChange(current)"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'customTitle'">
        <span>customTitle</span>
        <v-tooltip class="m-l-6" title="title" />
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a @click="() => handleEdit(record)">编辑</a>
      </template>
    </template>
  </a-table>
</template>

