const Koa = require('koa')
const app = new Koa()
const router2controller = require('./server/router2controller.js')
const config = require('./config/config.local.js')
const koaBodyparser = require('koa-bodyparser') // 获取ctx.request.body 获取post提交的数据
const router = require('koa-router')()
import { verify } from './server/utils'

app.use(koaBodyparser())

const fs = require('fs')

// 系统日志文件记录
function writeLog (data) {
  fs.appendFile('./log.txt', data, 'utf8', e => {})
}

// 做拦截处理验证登录
app.use(async (ctx, next) => {
	// 如果是登录请求直接放行
	const start = new Date()
  if (ctx.url === '/api/user/login') {
  	await next()
  } else {
	  const result = await verify(ctx)
	  if (typeof result === 'object') {
	    ctx.state.userInfo = result
	    await next()
	  } else {
	    writeLog('【' + result + '】')
	    ctx.body = {
	      success: false,
	      data: {},
	      message: result
	    }
	  }
  }
  const ms = new Date() - start
  writeLog(ctx.method + ' ' + ctx.url + ' ' + ms + 'ms \r\n')
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

// 统一错误处理
app.on('error', function (err, ctx) {
  writeLog('server error' + err + '\n' + JSON.stringify(ctx) + '\r\n')
  ctx.body = {
    success: false,
    data: ctx,
    message: err
  }
  console.log('server error', err)
})

const routers = router2controller()
// 加入根路径
router.use('/api', routers)
app.use(routers)
app.listen(config.port)
