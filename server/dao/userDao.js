import { query } from '../utils/mysqlUtil.js'

const getUserById = async userId => {
  const sql = 'SELECT * FROM t_user where id = ?'
  const [row] = await query(sql, userId)
  return row
}

const login = async user => {
  const sql = 'SELECT id FROM t_user where phone = ? && password = ?'
  const [row] = await query(sql, [user.phone, user.password])
  return row
}

module.exports = {
  getUserById,
  login
}