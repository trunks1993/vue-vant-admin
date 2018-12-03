const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  outputDir: 'docs',
  baseUrl: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  devServer: {
    port: 9090, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true
      }
    }
  }
}
