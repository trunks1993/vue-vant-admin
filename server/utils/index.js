import jwt from 'jsonwebtoken'
import { jwtObj, whiteList, wechat } from '../../config/config.local.js'
import { redisGet, redisSet } from './mysqlUtil'
import uuid from 'node-uuid'
const sha1 = require('sha1')

const rp = require('request-promise')

// 验证权限函数
export const verify = async ctx => {
  return new Promise((resolve, reject) => {
    if (ctx.url.substring(0, 5) !== '/api/') {
      resolve({}) // 非后端接口请求
    } else if (whiteList.indexOf(ctx.url) !== -1) {
      resolve({}) // 不拦截的白名单
    } else {
      // 异步验证token
      jwt.verify(ctx.request.header.authorization, jwtObj.secret, (err, decoded) => {
        if (err) {
          resolve('token验证错误！')
        }
        resolve(decoded) // 把用户信息带上
      })
    }
  })
}

// 微信授权获取用户信息
export const getWxUser = async code => {

  const tokenOptions = {
    method: 'GET',
    uri: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechat.appid}&secret=${wechat.secret}&code=${code}&grant_type=authorization_code`,
    json: true
  }

  const tokenResult = await rp(tokenOptions)

  if (tokenResult.errcode) return tokenResult

  const userInfoOption = {
    method: 'GET',
    uri: `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenResult.access_token}&openid=${tokenResult.openid}&lang=zh_CN`,
    json: true
  }

  const userInfoResult = await rp(userInfoOption)

  if (userInfoResult.errcode) return userInfoResult

  return userInfoResult
}

export const getSignature = async url => {
  let jsapi_ticket = await redisGet('jsapi_ticket')
  if (!jsapi_ticket) {
    const access_token = await getAccess_token()
    const options = {
      method: 'GET',
      uri: `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`,
      json: true
    }
    const res = await rp(options)
    jsapi_ticket = res.ticket
    redisSet('jsapi_ticket', res.ticket, res.expires_in)
  }
  const noncestr = uuid.v4()
  const timestamp = Math.round(new Date().getTime() / 1000)
  const str = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
  const signature = sha1(str)
  return { timestamp, noncestr, signature, appid: wechat.appid }
}

async function getAccess_token() {
  let access_token = await redisGet('access_token')
  if (!access_token) {
    const options = {
      method: 'GET',
      uri: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wechat.appid}&secret=${wechat.secret}`,
      json: true
    }
    const res = await rp(options)
    access_token = res.access_token
    redisSet('access_token', res.access_token, res.expires_in)
  }
  return access_token
}
