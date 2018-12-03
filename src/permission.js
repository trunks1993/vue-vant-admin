import router from '@/router';
import store from '@/store';
import { getToken } from '@/utils/auth'; // 验权

const whiteList = ['/login', '/', '/register', '/personal/develop/to']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.getters.userInfo.user_id) {
        store.dispatch('GetUserInfo').then(res => {
          // 如果拉取用户信息成功则跳转页面，否则重新登录
          if (res) next()
          else store.dispatch('FedLogOut').then(() => { next({ path: '/' }) })
        }).catch(err => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/' })
          });
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1 || whiteList.indexOf(to.path.split('to/')[0] + 'to') !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})