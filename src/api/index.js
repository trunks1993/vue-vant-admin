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

export function getWxUserInfo(data) {
  return request({
    url: '/user/getWxUserInfo',
    method: 'post',
    data
  })
}

export function registerUser(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getJsapiSignature(url) {
  return request({
    url: '/user/getJsapiSignature',
    method: 'get',
    params: { url }
  })
}