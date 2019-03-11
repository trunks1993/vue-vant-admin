<template>
  <div class="login-container">
    <div class="input-box" style="margin-top: 150px;">
      <i class="iconfont icon-username" />
      <input v-model="loginInfo.username" type="text">
    </div>
    <div class="input-box" style="margin-top: 10px;">
      <i class="iconfont icon-password" />
      <input v-model="loginInfo.password" type="password" @input="inputPassword">
    </div>
    <van-button size="large" :loading="isLogin" @click.native="login">登录</van-button> 
    <van-number-keyboard :show="showKeyBoard" close-button-text="完成" @blur="showKeyBoard = false" @input="onInput" @delete="onDelete" />
  </div>
</template>
<script>
import { Toast } from 'vant';
import { checkPhone, check_user_name } from '@/utils'
export default {
  data() {
    return {
      loginInfo: {
        username: "",
        password: ""
      },
      isLogin: false,
      redirect: undefined,
      showKeyBoard: false
    };
  },
  created() {
    this.loginInfo.username = this.$route.query.username || ''
    this.loginInfo.password = this.$route.query.password || ''
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    async login() {
      // const phoneValid = this.$refs.phone.valid;
      // const passwordValid = this.$refs.password.valid;
      if (check_user_name(this.loginInfo.username) && this.loginInfo.password !== '') {
        this.isLogin = true;
        // 调用登录接口
        // 登录成功后继续跳转到被拦截的页面 this.$router.push({ path: this.redirect })
        try {
          const res = await this.$store.dispatch("Login", this.loginInfo)
          this.isLogin = false;
          if(!res.success) return Toast(res.msg)
          this.$router.push({ path: this.redirect || '/'});
        } catch (e) {
          this.isLogin = false;
          Toast(e.toString())
        }
      }
    },
    onInput(value) {
      if (this.loginInfo.phone.length === 11) {
        Toast('输入正确手机号码')
        return
      }
      this.loginInfo.phone += value
    },
    onDelete() {
      this.loginInfo.phone = this.loginInfo.phone.slice(0, this.loginInfo.phone.length - 1)
    },
    inputPassword(val) {
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  // height: 100vh;
  // display: flex;
  // align-items: center;
  // flex-direction: column;
  // justify-content: center;
  // padding: 0 10px;
  // background: #f4f4f4;
  .input-box {
    display: inline-block;
    position: relative;
    input {
      outline: none;
      border-bottom: 1px solid #c8b185;
      border-left-width:0px;
      border-top-width:0px;
      border-right-width:0px;
      text-align: left;
      padding: 0 30px;
      width: 250px;
      box-sizing: border-box;
      font-size: 16px;
      border-radius: 0;
    }
  }
  .van-button {
    margin-top: 50px;
    width: 250px;
    background: #c8b185;
    color: #fff;
  }
}
</style>