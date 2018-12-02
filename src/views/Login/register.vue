<template>
  <div class="register-container" v-if="!isLosePage">
    <van-cell-group>
      <van-field v-model="userInfo.roleId" disabled label="级别" />
      <van-field v-model="userInfo.nickname" disabled label="微信昵称" />
      <van-field v-model="userInfo.name" required clearable label="真实姓名" :error-message="!nameValid ? '请输入真实姓名' : ''" placeholder="请输入真实姓名" />
      <van-field v-model="userInfo.username" required clearable label="用户名" :error-message="!usernameValid ? '请输入合法用户名' : ''" placeholder="请输入用户名" />
      <van-field v-model="userInfo.password" type="password" label="输入密码" :error-message="!passwordValid ? '请输入6～16位字母数字和符号' : ''" placeholder="请输入密码" required />
      <van-field v-model="surePassword" type="password" label="确认密码" placeholder="确认密码" :error-message="surePwdValid ? '' : '两次输入密码不一致'" required />
      <van-field v-model="userInfo.phone" type="tel" required clearable label="手机号" :error-message="!phoneValid ? '手机号格式错误' : ''" placeholder="请输入手机号" />
      <van-button :loading="btnLoading" :disabled="!(nameValid&&phoneValid&&passwordValid&&surePwdValid&&usernameValid)" type="primary" size="large" @click="registerUser">注册</van-button>
    </van-cell-group>
  </div>
  <div class="errmsg-container" v-else>
    {{erroMsg}}
  </div>
</template>
<script>
import { param2Obj, checkPhone, trim, check_user_name } from '@/utils'
import { getWxUserInfo, registerUser } from '@/api'

export default {
  data() {
    return {
      isLosePage: false,
      userInfo: {
        name: '',
        username: '',
        phone: '',
        password: '',
        roleId: 0,
        parentId: 1,
        authorizeCode: ''
      },
      surePassword: '',
      btnLoading: false,
      erroMsg: '404'
    }
  },
  computed: {
    nameValid() {
      return trim(this.userInfo.name)
    },
    usernameValid() {
      return check_user_name(this.userInfo.username)
    },
    phoneValid() {
      return checkPhone(this.userInfo.phone)
    },
    passwordValid() {
      const pwd = this.userInfo.password
      return (trim(pwd).length === pwd.length) && pwd.length >= 6 && pwd.length <= 16
    },
    surePwdValid() {
      return this.userInfo.password === this.surePassword
    }
  },
  created() {
    this.initWxUserInfo()
  },
  methods: {
    initWxUserInfo() {
      const paramObj = param2Obj(location.href)
      const code = paramObj.code
      const state = paramObj.state
      this.authorizeCode = state.split('--')[0]
      this.userInfo.roleId = state.split('--')[1]
      this.userInfo.parentId = state.split('--')[2]
      getWxUserInfo({ code }).then(res => {
        const data = res.data
        if (data.success) {
          this.userInfo = Object.assign({}, this.userInfo, data.data.userInfo)
        } else {
          this.isLosePage = true
          this.erroMsg = data.msg
        }
      })
    },
    registerUser() {
      this.btnLoading = true
      registerUser(this.userInfo).then(res => {
        const data = res.data
        console.log(data)
        if (data.success) {

          this.$router.push({path: '/login'})
        }
        this.btnLoading = false
      })
    }
  },
  filters: {
    getRoleName(value) {
      let roleName = ''
      switch (value) {
        case '0':
        roleName = '管理员'
        break
        case '1':
        roleName = '天使'
        break
        case '2':
        roleName = '官方'
        break
        case '3':
        roleName = '董事'
        break
        default:
        roleName = '合伙人'
      }
      return roleName
    }
  }

}
</script>
<style lang="less">
  .register-container {
    padding: 20px;
    text-align: left;
    .van-button {
      margin-top: 20px;
    }
  }
  .errmsg-container {
    font-size: 18px;
    text-align: center;
    padding: 30px 0;
  }
</style>