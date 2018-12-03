const bcrypt = require('bcryptjs');
import { query } from '../utils/mysqlUtil.js'
import uuid from 'node-uuid'

const getUserByUsername = async user => {
  const sql = 'SELECT * FROM t_user where username = ?'
  const [row] = await query(sql, user.username)
  return row
}

const getUserById = async userId => {
  const sql = 'SELECT * FROM t_user where user_id = ?'
  const [row] = await query(sql, userId)
  return row
}

const insert = async user => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)) 
	const sql = `INSERT INTO t_user (user_id,name,username,phone,password,parent_id,role_id,openid,nickname,sex,headimgurl,country,province,city,create_time,update_time,authorize_code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
	const row = await query(sql, [uuid.v1(), user.name, user.username,user.phone, user.password, user.parentId, user.roleId, user.openid, user.nickname, user.sex, user.headimgurl, user.country, user.province, user.city, new Date().toLocaleString(), new Date().toLocaleString(), user.authorizeCode])
	return row.affectedRows === 1
}
const update = async user => {
	const sql = `UPDATE t_user SET nickname = '${user.nickname}', sex = '${user.sex}', headimgurl = '${user.headimgurl}', country = '${user.country}', province = '${user.province}', city = '${user.city}', update_time='${new Date().toLocaleString()}' WHERE openid = '${user.openid}'`
	const row = await query(sql)
	return row.affectedRows === 1
}
const getUserByOpenid = async openid => {
	const sql = 'SELECT * FROM t_user where openid = ?'
  const [row] = await query(sql, openid)
  return row
}

const getUserByAuthorizeCode = async authorizeCode => {
  const sql = 'SELECT * FROM t_user where authorize_code = ?'
  const [row] = await query(sql, authorizeCode)
  return row
}

// SELECT * FROM t_user WHERE parent_id='0e5dd0a0-f59d-11e8-bd9e-07e3a7d96aa2' AND del_flag=0 AND review_flag=1 AND id>=(select id from t_user where parent_id='0e5dd0a0-f59d-11e8-bd9e-07e3a7d96aa2' AND del_flag=0 AND review_flag=1 limit 0,1) limit 3
const getUserListByParentId = async (userId, currentPage, pageSize) => {
  const conditionsStr = `parent_id='${userId}' AND del_flag=0 AND review_flag=1`
  const sql1 = `SELECT * FROM t_user WHERE ${conditionsStr} AND id<=(select id from t_user where ${conditionsStr} order by id desc limit ${(currentPage - 1)*pageSize},1) order by id desc limit ${pageSize}`
  console.log(sql1)
  const list = await query(sql1)
  
  const sql2 = `SELECT count(*) as total FROM t_user WHERE ${conditionsStr}`
  const [row] = await query(sql2)

  return {total: row.total, list}
}

module.exports = {
  getUserById,
  getUserByUsername,
  insert,
  update,
  getUserByOpenid,
  getUserByAuthorizeCode,
  getUserListByParentId
}