<script setup lang="ts">
import type { FormInstance, SelectProps } from 'ant-design-vue';
import { useFetchData } from './hooks';
import ListTable from './components/ListTable.vue';
import { IDataSource, IFormState } from './types';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import EditModal from './components/EditModal.vue';
import { PlusOutlined } from '@ant-design/icons-vue';

const { loading, pagination, dataSource, fetchData } = useFetchData();

const formState = ref<IFormState>({ name: '', group: [], dateRange: [] });
const formRef = ref<FormInstance>();

const visible = ref(false);
const rowInfo = ref<IDataSource | null>(null);

const setVisible = (val: boolean) => {
  visible.value = val;
};

const setRowInfo = (val: IDataSource | null) => {
  rowInfo.value = val;
};

fetchData();

const options = ref<SelectProps['options']>([
  {
    value: 'jack',
    label: 'Jack'
  },
  {
    value: 'lucy',
    label: 'Lucy'
  }
]);

const onFinish = (values: IFormState) => {
  const { name, dateRange } = values;
  const reqParams = {
    name
  };

  if (dateRange && dateRange.length) {
    Object.assign(reqParams, {
      startDate: dayjs(dateRange[0]).format('YYYY-MM-DD 00:00:00'),
      endDate: dayjs(dateRange[1]).format('YYYY-MM-DD 23:59:59')
    });
  }

  fetchData(reqParams);
};

const handleAdd = () => {
  setVisible(true);
  setRowInfo(null);
};

const handleReset = () => {
  formRef.value?.resetFields();
  fetchData();
};
</script>

<template>
  <page-container title="权限">
    <a-card>
      <a-form
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        ref="formRef"
        :model="formState"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item label="应用名称" name="name">
              <a-input placeholder="请输入" allow-clear v-model:value="formState.name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="时间" name="dateRange">
              <a-range-picker
                style="width: 100%"
                allow-clear
                v-model:value="formState.dateRange as [Dayjs, Dayjs]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="组" name="group">
              <a-select
                v-model:value="formState.group"
                mode="multiple"
                style="width: 100%"
                placeholder="请选择组"
                :max-tag-count="2"
                :options="options"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" class="text-right">
            <a-form-item label=" " :colon="false">
              <a-button type="primary" html-type="submit">查询</a-button>
              <a-button class="m-l-12" @click="handleReset">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <div class="m-t-6">
      <a-card>
        <div class="text-right">
          <a-button class="m-b-6" type="primary" @click="handleAdd">
            <plus-outlined />
            创建
          </a-button>
        </div>

        <a-spin :spinning="loading">
          <list-table
            :data-source="dataSource"
            :pagination="pagination"
            @set-visible="setVisible"
            @set-row-info="setRowInfo"
            @fetch-data="fetchData"
          />
        </a-spin>
      </a-card>
    </div>

    <edit-modal
      :visible="visible"
      @close-modal="() => (visible = false)"
      :row-info="rowInfo"
      @set-row-info="setRowInfo"
      @fetch-data="fetchData"
    />
  </page-container>
</template>

