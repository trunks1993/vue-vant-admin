import { login, getUserInfo } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        login(loginInfo).then(res => {
            const data = res.data
            setToken(data.data.token)
            commit('SET_TOKEN', data.data.token)
            resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const data = res.data
          if (data.success) commit('SET_USERINFO', data.data)
          resolve(data.success)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token)
    //       .then(() => {
    //         commit('SET_TOKEN', '')
    //         commit('SET_ROLES', [])
    //         removeToken()
    //         resolve()
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user