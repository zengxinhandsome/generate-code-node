<script setup lang="ts">
import { FormInstance, message, SelectProps } from 'ant-design-vue';
import type { IDataSource, IModalFormState } from '../types';

const editApi = (params: any) => new Promise(resolve => setTimeout(resolve, 500));
const addApi = (params: any) => new Promise(resolve => setTimeout(resolve, 500));

interface IProps {
  visible: boolean;
  rowInfo: IDataSource;
}

const props = withDefaults(defineProps<IProps>(), {
  visible: false
});

watch(
  () => props.rowInfo,
  (val: IDataSource) => {
    if (val) {
      const { name, group } = val;
      formState.value = {
        name,
        group
      };
    }
  }
);

const emits = defineEmits(['closeModal', 'setRowInfo', 'fetchData']);

const formRef = ref<FormInstance>();

const btnLoading = ref(false);

const formState = ref<IModalFormState>({
  name: '',
  group: []
});

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

const handleOk = () => {
  formRef.value?.validateFields().then((nameList: any) => {
    btnLoading.value = true;
    if (props.rowInfo) {
      editApi(formState).finally(() => {
        btnLoading.value = false;
        emits('closeModal');
        message.success('编辑成功');
      });
    } else {
      addApi(formState).finally(() => {
        btnLoading.value = false;
        emits('closeModal');
        message.success('添加成功');
      });
    }
  });
};

const handleCancel = () => {
  emits('closeModal');
};

const afterClose = () => {
  emits('setRowInfo', null);
  formRef.value?.clearValidate();
  btnLoading.value = false;
  formState.value = {
    name: '',
    group: []
  };
};
</script>

<template>
  <a-modal
    :title="rowInfo ? '编辑' : '新增'"
    :visible="props.visible"
    :maskClosable="false"
    :width="680"
    :ok-button-props="{ loading: btnLoading }"
    :after-close="afterClose"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 17 }"
      autocomplete="off"
    >
      <a-form-item label="name" name="name" :rules="[{ required: true, message: '请输入name' }]">
        <a-input placeholder="请输入" allow-clear v-model:value="formState.name" />
      </a-form-item>

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
    </a-form>
  </a-modal>
</template>

<style lang="less" scoped>
.tip {
  margin-left: 56px;
  margin-bottom: 12px;
}
</style>

