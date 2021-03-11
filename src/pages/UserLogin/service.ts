import request from 'umi-request';

export async function login(params: { username: string; password: string }) {
  return request('http://172.16.0.108:10090/api/batwph/login', {
    method: 'POST',
    requestType: 'form',
    data: params,
  });
}
