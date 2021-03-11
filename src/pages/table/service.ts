import request from 'umi-request';
import type { TableListParams } from './data.d';

type ParamsType = {
  count?: number;
} & Partial<TableListParams>;

export async function queryRule(params?: ParamsType) {
  return request('/api/rule', {
    params,
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
