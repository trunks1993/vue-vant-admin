const userService = require('./../service/userService.js')

import { getSignature } from '../utils'

const login = async (ctx, next) => {
  const user = ctx.request.body
  ctx.body = await userService.login(user)
}

const register = async (ctx, next) => {
  const user = ctx.request.body
  ctx.body = await userService.register(user)
}

const getUserInfo = async (ctx, next) => {
  const user_id = ctx.state.userInfo.user_id
  ctx.body = await userService.getUserById(user_id)
}

const getWxUserInfo = async (ctx, next) => {
  const { code, authorize_code } = ctx.request.body
  ctx.body = await userService.getWxUser(code, authorize_code)
}

const getJsapiSignature = async (ctx, next) => {
  const url = ctx.query.url
  const data = await getSignature(url)
  ctx.body = { success: true, data }
}

const saveUrlToken = async (ctx, next) => {
  const { user_id, role_id, authorize_code } = ctx.request.body
  ctx.body = await userService.saveUrlAuthorizeCode(user_id, role_id, authorize_code)
}

const getProxyList = async (ctx, next) => {
  const listQuery = ctx.request.body
  ctx.body = await userService.getProxyListByUserId(listQuery)
}

module.exports = {
  'POST /user/login': login,
  'POST /user/register': register,
  'GET /user/getUserInfo': getUserInfo,
  'GET /user/getJsapiSignature': getJsapiSignature,
  'POST /user/getWxUserInfo': getWxUserInfo,
  'POST /user/saveUrlToken': saveUrlToken,
  'POST /user/getProxyList': getProxyList
}