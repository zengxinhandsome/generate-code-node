export default [
  {
    type: 'folder',
    name: '_template',
    children: [
      {
        type: 'folder',
        name: 'components',
        children: [
          {
            type: 'file',
            name: 'EditModal.vue',
            content:
              '<script setup lang="ts">\nimport { FormInstance, message, SelectProps } from \'ant-design-vue\';\nimport type { IDataSource, IModalFormState } from \'../types\';\n\nconst editApi = (params: any) => new Promise(resolve => setTimeout(resolve, 500));\nconst addApi = (params: any) => new Promise(resolve => setTimeout(resolve, 500));\n\ninterface IProps {\n  visible: boolean;\n  rowInfo: IDataSource;\n}\n\nconst props = withDefaults(defineProps<IProps>(), {\n  visible: false\n});\n\nwatch(\n  () => props.rowInfo,\n  (val: IDataSource) => {\n    if (val) {\n      const { name, group } = val;\n      formState.value = {\n        name,\n        group\n      };\n    }\n  }\n);\n\nconst emits = defineEmits([\'closeModal\', \'setRowInfo\', \'fetchData\']);\n\nconst formRef = ref<FormInstance>();\n\nconst btnLoading = ref(false);\n\nconst formState = ref<IModalFormState>({\n  name: \'\',\n  group: []\n});\n\nconst options = ref<SelectProps[\'options\']>([\n  {\n    value: \'jack\',\n    label: \'Jack\'\n  },\n  {\n    value: \'lucy\',\n    label: \'Lucy\'\n  }\n]);\n\nconst handleOk = () => {\n  formRef.value?.validateFields().then((nameList: any) => {\n    btnLoading.value = true;\n    if (props.rowInfo) {\n      editApi(formState).finally(() => {\n        btnLoading.value = false;\n        emits(\'closeModal\');\n        message.success(\'编辑成功\');\n      });\n    } else {\n      addApi(formState).finally(() => {\n        btnLoading.value = false;\n        emits(\'closeModal\');\n        message.success(\'添加成功\');\n      });\n    }\n  });\n};\n\nconst handleCancel = () => {\n  emits(\'closeModal\');\n};\n\nconst afterClose = () => {\n  emits(\'setRowInfo\', null);\n  formRef.value?.clearValidate();\n  btnLoading.value = false;\n  formState.value = {\n    name: \'\',\n    group: []\n  };\n};\n</script>\n\n<template>\n  <a-modal\n    :title="rowInfo ? \'编辑\' : \'新增\'"\n    :visible="props.visible"\n    :maskClosable="false"\n    :width="680"\n    :ok-button-props="{ loading: btnLoading }"\n    :after-close="afterClose"\n    @ok="handleOk"\n    @cancel="handleCancel"\n  >\n    <a-form\n      ref="formRef"\n      :model="formState"\n      :label-col="{ span: 5 }"\n      :wrapper-col="{ span: 17 }"\n      autocomplete="off"\n    >\n      <a-form-item label="name" name="name" :rules="[{ required: true, message: \'请输入name\' }]">\n        <a-input placeholder="请输入" allow-clear v-model:value="formState.name" />\n      </a-form-item>\n\n      <a-form-item label="组" name="group">\n        <a-select\n          v-model:value="formState.group"\n          mode="multiple"\n          style="width: 100%"\n          placeholder="请选择组"\n          :max-tag-count="2"\n          :options="options"\n          allow-clear\n        />\n      </a-form-item>\n    </a-form>\n  </a-modal>\n</template>\n\n<style lang="less" scoped>\n.tip {\n  margin-left: 56px;\n  margin-bottom: 12px;\n}\n</style>\n\n'
          },
          {
            type: 'file',
            name: 'ListTable.vue',
            content:
              '<script setup lang="ts">\nimport { columns } from \'../constants\';\nimport type { IDataSource } from \'../types\';\nimport type { IPagination } from \'@/types\';\n\ninterface IProps {\n  dataSource: IDataSource[];\n  pagination: IPagination;\n}\n\nconst props = withDefaults(defineProps<IProps>(), {\n  dataSource: () => []\n});\n\nconst emits = defineEmits([\'setVisible\', \'setRowInfo\', \'fetchData\']);\n\nconst handleEdit = (record: IDataSource) => {\n  emits(\'setVisible\', true);\n  emits(\'setRowInfo\', record);\n};\n\nconst handlePageChange = (cur: number) => {\n  emits(\'fetchData\', { page: cur });\n};\n</script>\n\n<template>\n  <a-table\n    :columns="columns"\n    :data-source="props.dataSource"\n    :pagination="props.pagination"\n    :scroll="{ x: \'auto\' }"\n    @change="({ current }: any) => handlePageChange(current)"\n  >\n    <template #headerCell="{ column }">\n      <template v-if="column.key === \'customTitle\'">\n        <span>customTitle</span>\n        <v-tooltip class="m-l-6" title="title" />\n      </template>\n    </template>\n\n    <template #bodyCell="{ column, record }">\n      <template v-if="column.key === \'action\'">\n        <a @click="() => handleEdit(record)">编辑</a>\n      </template>\n    </template>\n  </a-table>\n</template>\n\n'
          }
        ]
      },
      {
        type: 'folder',
        name: 'constants',
        children: [
          {
            type: 'file',
            name: 'index.ts',
            content:
              "import type { ColumnsType } from 'ant-design-vue/es/table';\n\nexport const columns: ColumnsType<any> = [\n  {\n    title: 'name',\n    key: 'name',\n    dataIndex: 'name'\n  },\n  {\n    title: 'group',\n    key: 'group',\n    dataIndex: 'group',\n    customRender: ({ text }: { text: string[] }) => text.join('、')\n  },\n  {\n    title: 'customTitle',\n    key: 'customTitle',\n    dataIndex: 'test1'\n  },\n  {\n    title: '操作',\n    key: 'action'\n  }\n];\n\n"
          }
        ]
      },
      {
        type: 'folder',
        name: 'hooks',
        children: [
          {
            type: 'file',
            name: 'index.ts',
            content:
              "import { DEFAULT_PAGINATION } from '@/constants';\nimport type { IDataSource } from '../types';\n\nconst getDataSource = (params: any) => {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve({\n        list: [\n          {\n            name: 'test',\n            group: ['zhangsan', 'list'],\n            test1: 'test1'\n          }\n        ]\n      });\n    }, 500);\n  });\n};\n\nexport const useFetchData = () => {\n  const loading = ref(false);\n\n  const dataSource = ref<IDataSource[]>([]);\n\n  const pagination = ref(DEFAULT_PAGINATION);\n\n  const fetchData = (params?: { name: string }) => {\n    loading.value = true;\n    getDataSource(params)\n      .then((data: any) => {\n        const { list } = data;\n        dataSource.value = list;\n      })\n      .finally(() => (loading.value = false));\n  };\n\n  return {\n    loading,\n    pagination,\n    dataSource,\n    fetchData\n  };\n};\n\n"
          }
        ]
      },
      {
        type: 'file',
        name: 'index.vue',
        content:
          '<script setup lang="ts">\nimport type { FormInstance, SelectProps } from \'ant-design-vue\';\nimport { useFetchData } from \'./hooks\';\nimport ListTable from \'./components/ListTable.vue\';\nimport { IDataSource, IFormState } from \'./types\';\nimport type { Dayjs } from \'dayjs\';\nimport dayjs from \'dayjs\';\nimport EditModal from \'./components/EditModal.vue\';\nimport { PlusOutlined } from \'@ant-design/icons-vue\';\n\nconst { loading, pagination, dataSource, fetchData } = useFetchData();\n\nconst formState = ref<IFormState>({ name: \'\', group: [], dateRange: [] });\nconst formRef = ref<FormInstance>();\n\nconst visible = ref(false);\nconst rowInfo = ref<IDataSource | null>(null);\n\nconst setVisible = (val: boolean) => {\n  visible.value = val;\n};\n\nconst setRowInfo = (val: IDataSource | null) => {\n  rowInfo.value = val;\n};\n\nfetchData();\n\nconst options = ref<SelectProps[\'options\']>([\n  {\n    value: \'jack\',\n    label: \'Jack\'\n  },\n  {\n    value: \'lucy\',\n    label: \'Lucy\'\n  }\n]);\n\nconst onFinish = (values: IFormState) => {\n  const { name, dateRange } = values;\n  const reqParams = {\n    name\n  };\n\n  if (dateRange && dateRange.length) {\n    Object.assign(reqParams, {\n      startDate: dayjs(dateRange[0]).format(\'YYYY-MM-DD 00:00:00\'),\n      endDate: dayjs(dateRange[1]).format(\'YYYY-MM-DD 23:59:59\')\n    });\n  }\n\n  fetchData(reqParams);\n};\n\nconst handleAdd = () => {\n  setVisible(true);\n  setRowInfo(null);\n};\n\nconst handleReset = () => {\n  formRef.value?.resetFields();\n  fetchData();\n};\n</script>\n\n<template>\n  <page-container title="权限">\n    <a-card>\n      <a-form\n        :label-col="{ span: 4 }"\n        :wrapper-col="{ span: 20 }"\n        ref="formRef"\n        :model="formState"\n        autocomplete="off"\n        @finish="onFinish"\n      >\n        <a-row :gutter="20">\n          <a-col :span="12">\n            <a-form-item label="应用名称" name="name">\n              <a-input placeholder="请输入" allow-clear v-model:value="formState.name" />\n            </a-form-item>\n          </a-col>\n          <a-col :span="12">\n            <a-form-item label="时间" name="dateRange">\n              <a-range-picker\n                style="width: 100%"\n                allow-clear\n                v-model:value="formState.dateRange as [Dayjs, Dayjs]"\n              />\n            </a-form-item>\n          </a-col>\n          <a-col :span="12">\n            <a-form-item label="组" name="group">\n              <a-select\n                v-model:value="formState.group"\n                mode="multiple"\n                style="width: 100%"\n                placeholder="请选择组"\n                :max-tag-count="2"\n                :options="options"\n                allow-clear\n              />\n            </a-form-item>\n          </a-col>\n          <a-col :span="12" class="text-right">\n            <a-form-item label=" " :colon="false">\n              <a-button type="primary" html-type="submit">查询</a-button>\n              <a-button class="m-l-12" @click="handleReset">重置</a-button>\n            </a-form-item>\n          </a-col>\n        </a-row>\n      </a-form>\n    </a-card>\n\n    <div class="m-t-6">\n      <a-card>\n        <div class="text-right">\n          <a-button class="m-b-6" type="primary" @click="handleAdd">\n            <plus-outlined />\n            创建\n          </a-button>\n        </div>\n\n        <a-spin :spinning="loading">\n          <list-table\n            :data-source="dataSource"\n            :pagination="pagination"\n            @set-visible="setVisible"\n            @set-row-info="setRowInfo"\n            @fetch-data="fetchData"\n          />\n        </a-spin>\n      </a-card>\n    </div>\n\n    <edit-modal\n      :visible="visible"\n      @close-modal="() => (visible = false)"\n      :row-info="rowInfo"\n      @set-row-info="setRowInfo"\n      @fetch-data="fetchData"\n    />\n  </page-container>\n</template>\n\n'
      },
      {
        type: 'folder',
        name: 'types',
        children: [
          {
            type: 'file',
            name: 'index.ts',
            content:
              "import type { Dayjs } from 'dayjs';\n\nexport interface IFormState {\n  name: string;\n  group: string[];\n  dateRange: [Dayjs, Dayjs] | [];\n}\n\nexport interface IDataSource {\n  name: string;\n  group: string[];\n  test1: string;\n}\n\nexport interface IModalFormState {\n  name: string;\n  group: string[];\n}\n\n"
          }
        ]
      }
    ]
  }
];
