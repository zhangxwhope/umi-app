import request from 'umi-request';

export async function getMyInfo(params: any = {}) {
  return request('/app/person/info', {
    method: 'POST',
    requestType: 'form',
    data: params,
  });
}

export async function login(params: any = {}) {
  return request('http://172.16.0.108:10090/api/batwph/login', {
    method: 'POST',
    requestType: 'form',
    data: params,
  });
}
