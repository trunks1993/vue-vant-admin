const bcrypt = require('bcryptjs');
import { query } from '../utils/mysqlUtil.js'
import uuid from 'node-uuid'

// const login = async user => {
//   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)) 
//   const sql = 'SELECT user_id FROM t_user where phone = ? && password = ?'
//   const [row] = await query(sql, [user.phone, user.password])
//   return row
// }
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
	const sql = `INSERT INTO t_user (user_id,name,username,phone,password,parent_id,role_id,openid,nickname,sex,headimgurl,country,province,city,create_time,update_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
	const row = await query(sql, [uuid.v1(), user.name, user.username,user.phone, user.password, user.parentId, user.roleId, user.openid, user.nickname, user.sex, user.headimgurl, user.country, user.province, user.city, new Date().toLocaleString(), new Date().toLocaleString()])
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

module.exports = {
  getUserById,
  getUserByUsername,
  insert,
  update,
  getUserByOpenid
}