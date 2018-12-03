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

export function checkAuthorizeCode(data) {
  return request({
    url: '/user/checkAuthorizeCode',
    method: 'post',
    data
  })
}

export function saveUrlToken(data) {
  return request({
    url: '/user/saveUrlToken',
    method: 'post',
    data
  })
}

export function getProxyList(data) {
  return request({
    url: '/user/getProxyList',
    method: 'post',
    data
  })
}
