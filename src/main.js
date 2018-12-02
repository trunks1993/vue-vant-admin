import Vue from "vue"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
import '@/styles/index.less' // global css
import '@/permission' // permission control
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'

import wx from 'weixin-js-sdk'
import { getJsapiSignature } from '@/api'

Vue.use(Vant)
Vue.config.productionTip = false

Vue.prototype.wxShare = function() {
  getJsapiSignature(location.href.split('#')[0]).then(res => {
    const data = res.data
    wx.config({
      debug: true, // 开启调试模式,开发时可以开启  
      appId: data.data.appid, // 必填，公众号的唯一标识   由接口返回
      timestamp: data.data.timestamp, // 必填，生成签名的时间戳 由接口返回
	    nonceStr: data.data.noncestr, // 必填，生成签名的随机串 由接口返回
	    signature: data.data.signature, // 必填，签名 由接口返回
      jsApiList: ['updateAppMessageShareData'] // 此处填你所用到的方法  
    })
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
