const userService = require('./../service/userService.js')
import jwt from 'jsonwebtoken'
import { jwtObj } from '../../config/config.local.js'

const getUserInfo = async (ctx, next) => {
  const userId = ctx.state.userInfo.userId
  const userInfo = await userService.getUserById(userId)
  ctx.body = {
    success: true,
    data: userInfo
  }
}

const login = async (ctx, next) => {
	const user = ctx.request.body
	const userInfo = await userService.login(user)
  if (userInfo) {
  	ctx.body = {
    	success: true,
      data: {
        userId: userInfo.id,
        token: jwt.sign({userId: userInfo.id}, jwtObj.secret, { expiresIn: jwtObj.expiresIn })
      }
    }
  } else {
    ctx.body = {
      success: false,
      data: {},
      msg: '用户名或密码错误'
    }
  }
}

module.exports = {
  'GET /user/getUserInfo': getUserInfo,
  'POST /user/login': login
}