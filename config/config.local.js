export const port = 8888
export const database = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'mobileAdmin',
  charset: 'utf8_general_ci',
  connectionLimit: 512
}
export const jwtObj = {
	secret: 'scscms', // 指定密钥
	expiresIn: '2h' // 超时设置 m分钟 h小时 d天数
}