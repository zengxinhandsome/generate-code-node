import { DEFAULT_PAGINATION } from '@/constants';
import type { IDataSource } from '../types';

const getDataSource = (params: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        list: [
          {
            name: 'test',
            group: ['zhangsan', 'list'],
            test1: 'test1'
          }
        ]
      });
    }, 500);
  });
};

export const useFetchData = () => {
  const loading = ref(false);

  const dataSource = ref<IDataSource[]>([]);

  const pagination = ref(DEFAULT_PAGINATION);

  const fetchData = (params?: { name: string }) => {
    loading.value = true;
    getDataSource(params)
      .then((data: any) => {
        const { list } = data;
        dataSource.value = list;
      })
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    pagination,
    dataSource,
    fetchData
  };
};

