const data = [
  {
    type: 'folder',
    name: '_template',
    children: [
      {
        type: 'file',
        name: 'index.vue',
        content: '我是 index.vue 的内容'
      },
      {
        type: 'folder',
        name: 'components',
        children: [
          {
            type: 'file',
            name: 'EditModal.vue',
            content: '我是 EditModal.vue 的内容'
          },
          {
            type: 'file',
            name: 'ListTable.vue',
            content: '我是 ListTable.vue 的内容'
          }
        ]
      }
    ]
  }
];

export default data;

