import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo(id) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params: { id }
  })
}
