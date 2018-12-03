export const port = 8888
export const database = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'vue_vant_admin',
  charset: 'utf8_general_ci',
  connectionLimit: 512
}
export const jwtObj = {
	secret: 'scscms', // 指定密钥
	expiresIn: '2h' // 超时设置 m分钟 h小时 d天数
}
export const wechat = {
	appid: 'wxffa4cadfa0268138', //填写你自己的appID
	secret: '2c7d1b20b0af81ba25ceb759b6b5b869',  //填写你自己的appSecret
	token: 'trunks'  //填写你自己的token
}
export const AuthorizeCode_ExTime = 1800
export const whiteList = ['/api/user/login', '/api/user/getWxUserInfo', '/api/user/register', '/api/user/checkAuthorizeCode']