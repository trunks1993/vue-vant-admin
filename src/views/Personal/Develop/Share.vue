<template>
  <div>点击右上角分享</div>
</template>
<script>
import wx from 'weixin-js-sdk'
import { getJsapiSignature, saveUrlToken } from '@/api'
import { getUrlToken } from '@/utils'
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.initWx()
  },
  methods: {
    initWx() {
      const { roleId } = this.$route.query
      if (!roleId) {
        return window.location.href = '/personal/develop'
      }
      const userId = this.$store.getters.userInfo.user_id
      const authorizeCode = getUrlToken()

      const share_title = this.$store.getters.userInfo.name + '邀请你成为代理商'
      const share_link = 'http://cd810525457e1965.natapp.cc/personal/develop/to/' + authorizeCode
      const share_img = this.$store.getters.userInfo.headimgurl

      saveUrlToken({userId, roleId, authorizeCode}).then(res => {
        const data = res.data
        if (data.success) {
          getJsapiSignature(location.href).then(res => {
            const data = res.data
            wx.config({
              debug: false, // 开启调试模式,开发时可以开启  
              appId: data.data.appid, // 必填，公众号的唯一标识   由接口返回
              timestamp: data.data.timestamp, // 必填，生成签名的时间戳 由接口返回
              nonceStr: data.data.noncestr, // 必填，生成签名的随机串 由接口返回
              signature: data.data.signature, // 必填，签名 由接口返回
              jsApiList: ['onMenuShareAppMessage'] // 此处填你所用到的方法  
            })

            wx.ready(() => {
              wx.onMenuShareAppMessage({
                title: share_title, // 分享标题
                desc: '经营客户，加大回访，用心专业，客户至上', // 分享描述
                link: share_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: share_img,
                success() {
                  window.location.href = '/personal/develop'
                },
                cancel() {
                  window.location.href = '/personal/develop'
                }
              })
            })
          })
        }
      })
    }
  }
}
</script>