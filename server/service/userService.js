const userDao = require('./../dao/userDao.js');
const bcrypt = require('bcryptjs');
import { jwtObj } from '../../config/config.local.js'
import jwt from 'jsonwebtoken'

const login = async user => {
  let msg = '用户名或密码错误'
  const userInfo = await userDao.getUserByUsername(user)
  if (userInfo) {
    if (bcrypt.compareSync(user.password, userInfo.password)) {
      if (userInfo.review_flag === 1) {
        msg = '此帐号正在审核中'
        return {
			  	success: false,
			  	msg: msg
			  }
      } else {
        return {
          success: true,
          data: {
            userId: userInfo.user_id,
            token: jwt.sign({ userId: userInfo.user_id }, jwtObj.secret, { expiresIn: jwtObj.expiresIn })
          }
        }
      }
    }
  }
  return {
  	success: false,
  	msg: msg
  }
}

const getUserById = async userId => {
  return userDao.getUserById(userId)
}

const register = async user => {
	const userInfo = await userDao.getUserByUsername(user)
	if (!userInfo) {
		const registerFlag = await userDao.insert(user)
		if (registerFlag) {
			return { success: true, msg: '已经提交至上级审核' }
		}
		return { success: false, msg: '注册失败,请联系管理员' }
	}
  return { success: false, msg: '用户名已存在' }
}

const getUserByOpenid = async user => {
  const userInfo = await userDao.getUserByOpenid(user.openid)
  return userInfo
}

module.exports = {
  login,
  register,
  getUserById,
  getUserByOpenid
}