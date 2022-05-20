import type { ColumnsType } from 'ant-design-vue/es/table';

export const columns: ColumnsType<any> = [
  {
    title: 'name',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'group',
    key: 'group',
    dataIndex: 'group',
    customRender: ({ text }: { text: string[] }) => text.join('、')
  },
  {
    title: 'customTitle',
    key: 'customTitle',
    dataIndex: 'test1'
  },
  {
    title: '操作',
    key: 'action'
  }
];

