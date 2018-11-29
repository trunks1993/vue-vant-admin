<template>
  <div class="login-container">
    <van-cell-group>
      <van-field v-model="loginInfo.phone" label="手机号" placeholder="请输入用户名" required />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-button size="large" :loading="isLogin" @click.native="login">大号按钮</van-button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loginInfo: {
        phone: "18073778398",
        password: "123456"
      },
      isLogin: false,
      redirect: undefined
    };
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
    login() {
      // const phoneValid = this.$refs.phone.valid;
      // const passwordValid = this.$refs.password.valid;
      // if (phoneValid && passwordValid) {
        this.isLogin = true;
        // 调用登录接口
        // 登录成功后继续跳转到被拦截的页面 this.$router.push({ path: this.redirect })
        this.$store.dispatch("Login", this.loginInfo).then(() => {
          this.isLogin = false;
          this.$router.push({ path: this.redirect });
        })
      // } else {
      //   if (!phoneValid) {
      //     this.$refs.phone.focus();
      //   } else {
      //     this.$refs.password.focus();
      //   }
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  background: #f4f4f4;
}
</style>