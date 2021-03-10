import request from 'umi-request'
import type { ListItemDataType } from './data.d'

type ParamsType = {
  count?: number
} & Partial<ListItemDataType>

export async function queryFakeList (params: ParamsType) {
  return request('/api/fake_list', {
    params
  })
}

export async function removeFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params
  return request('/api/fake_list', {
    method: 'POST',
    params: { count },
    data: {
      ...restParams,
      method: 'delete'
    }
  })
}

export async function addFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params
  return request('/api/fake_list', {
    method: 'POST',
    params: { count },
    data: {
      ...restParams,
      method: 'post'
    }
  })
}

export async function updateFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params
  return request('/api/fake_list', {
    method: 'POST',
    params: { count },
    data: {
      ...restParams,
      method: 'update'
    }
  })
}