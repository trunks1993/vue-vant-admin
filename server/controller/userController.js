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
  const userId = ctx.state.userInfo.userId
  const userInfo = await userService.getUserById(userId)
  ctx.body = {
    success: true,
    data: userInfo
  }
}

const getWxUserInfo = async (ctx, next) => {
  const { code, authorizeCode } = ctx.request.body
  ctx.body = await userService.getWxUser(code, authorizeCode)
}

const getJsapiSignature = async (ctx, next) => {
  const url = ctx.query.url
  const data = await getSignature(url)
  ctx.body = { success: true, data }
}

const saveUrlToken = async (ctx, next) => {
  const { userId, roleId, authorizeCode } = ctx.request.body
  ctx.body = await userService.saveUrlAuthorizeCode(userId, roleId, authorizeCode)
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