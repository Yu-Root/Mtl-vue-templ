import { createRouter, createWebHashHistory } from 'vue-router'

import errorRouters from './error/index.js'
import loginRouters from './login/index.js'
import homeRouters from './home/index.js'
import authApi from '../api/common/auth.js'
import { useStore } from 'vuex'

const store = useStore()

const routes = [...errorRouters, ...loginRouters, ...homeRouters]

const noRedirectList = ['login'] // no redirect list

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// permission
router.beforeEach((to, from, next) => {
  if (noRedirectList.includes(to.name)) {
    // 无需拦截
  } else {
    if (Cookies.get('user')) {
      authApi
        .loginState()
        .then((res) => {
          const { msg, isLogin, isAuth } = res.data
          if (msg) {
            alert(msg)
            next()
          } else {
            if (isLogin && isAuth) {
              store.dispatch('login/getUserInfo', res.data)
              next('/main')
            }
          }
        })
        .finally(() => {
          next()
        })
    }
  }
})

export default router
