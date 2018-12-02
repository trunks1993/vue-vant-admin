const userService = require('./../service/userService.js')

import { getWxUser, getSignature } from '../utils'

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
  const { code } = ctx.request.body
  const result = await getWxUser(code)
  if (result.errcode) {
    ctx.body = {
      success: false,
      msg: '该注册页面已经失效'
    }
  } else {
    const userInfo = await userService.getUserByOpenid(result)
    if (userInfo) {
      ctx.body = {
        success: false,
        msg: '您的微信号已经注册'
      }
    } else {
      ctx.body = {
        success: true,
        data: {
          userInfo: result
        }
      }
    }
  }
}
const getJsapiSignature = async (ctx, next) => {
  const url = ctx.query.url
  console.log(url)
  const data = await getSignature(url)
  ctx.body = { success: true, data }
}

module.exports = {
  'POST /user/login': login,
  'POST /user/register': register,
  'GET /user/getUserInfo': getUserInfo,
  'GET /user/getJsapiSignature': getJsapiSignature,
  'POST /user/getWxUserInfo': getWxUserInfo,
}