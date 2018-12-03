const userDao = require('./../dao/userDao.js');
const bcrypt = require('bcryptjs');
import { jwtObj, wechat, AuthorizeCode_ExTime } from '../../config/config.local.js'
import jwt from 'jsonwebtoken'
import { redisGet, redisSet } from '../utils/mysqlUtil'

const rp = require('request-promise')

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

const saveUrlAuthorizeCode = async (userId, roleId, authorizeCode) => {
  redisSet(authorizeCode, userId + '&' + roleId, AuthorizeCode_ExTime)
  return { success: true }
}
// 微信授权获取用户信息
const getWxUser = async (code, authorizeCode) => {
  const uidAndRid = await redisGet(authorizeCode)
  
  if (!uidAndRid) {
    return { success: false, msg: '链接失效，授权码已过期请联系管理员'}
  }
  const userInfo = await userDao.getUserByAuthorizeCode(authorizeCode)
  
  if (userInfo) {
    return { success: false, msg: '链接失效，授权码已被使用请联系管理员'}
  }
  
  let acstokenAndOid = await redisGet(code)

  if (!acstokenAndOid) {
    const tokenResult = await rp({
      method: 'GET',
      uri: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechat.appid}&secret=${wechat.secret}&code=${code}&grant_type=authorization_code`,
      json: true
    })
    acstokenAndOid = tokenResult.access_token + '&' + tokenResult.openid
    redisSet(code, acstokenAndOid, tokenResult.expires_in)
  }
  // url授权码被用掉了永远都不会走这行查询 
  const existUser = await userDao.getUserByOpenid(acstokenAndOid.split('&')[1])

  if (existUser) {
    return { success: false, msg: '您的微信已经被绑定'}
  }

  const wxUser = await rp({
    method: 'GET',
    uri: `https://api.weixin.qq.com/sns/userinfo?access_token=${acstokenAndOid.split('&')[0]}&openid=${acstokenAndOid.split('&')[1]}&lang=zh_CN`,
    json: true
  })
  return { success: true, data: Object.assign({}, wxUser, {authorizeCode: authorizeCode, parentId: uidAndRid.split('&')[0], roleId: uidAndRid.split('&')[1]})}
}

// 分页查询代理
const getProxyListByUserId = async listQuery => {
 const result = await userDao.getUserListByParentId(listQuery.userId, listQuery.currentPage, listQuery.pageSize)
 return {success: true, data: result}
}
module.exports = {
  login,
  register,
  getUserById,
  getWxUser,
  saveUrlAuthorizeCode,
  getProxyListByUserId
}