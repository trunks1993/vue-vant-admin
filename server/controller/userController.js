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
	const userId = await userService.login(user)
	ctx.body = {
  	success: true,
    data: {
      userId,
      token: jwt.sign({userId: userId}, jwtObj.secret, { expiresIn: jwtObj.expiresIn })
    }
  }
}

module.exports = {
  'GET /user/getUserInfo': getUserInfo,
  'POST /user/login': login
}