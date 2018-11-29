import jwt from 'jsonwebtoken'
import { jwtObj } from '../../config/config.local.js'

// 验证权限函数
export const verify = async ctx => {
  return new Promise((resolve, reject) => {
    if (ctx.url.substring(0, 5) !== '/api/') {
      resolve({})// 非后端接口请求
    }
    // 异步验证token
    jwt.verify(ctx.request.header.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        resolve('token验证错误！')
      }
      resolve(decoded)// 把用户信息带上
    })
  })
}
