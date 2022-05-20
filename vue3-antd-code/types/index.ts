import type { Dayjs } from 'dayjs';

export interface IFormState {
  name: string;
  group: string[];
  dateRange: [Dayjs, Dayjs] | [];
}

export interface IDataSource {
  name: string;
  group: string[];
  test1: string;
}

export interface IModalFormState {
  name: string;
  group: string[];
}

