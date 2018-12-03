<script>
import { checkAuthorizeCode } from '@/api'
export default {
  created() {
    const authorizeCode = this.$route.params.state
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxffa4cadfa0268138&redirect_uri=http%3A%2F%2Fcd810525457e1965.natapp.cc%2Fregister&response_type=code&scope=snsapi_userinfo&state=${authorizeCode}#wechat_redirec`
  }
}
</script>