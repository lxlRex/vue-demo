import Vue from 'vue'
import Router from 'vue-router'
import { User } from '@/public/class'
import Container from './router_container.vue'
import UserRouter from './sub_router/user_router'

Vue.use(Router)
const router = new Router({
  mode: location.href.indexOf('#') > -1 ? 'hash' : 'history',
  // base: '/demo',
  routes: [
    {
      path: '/',
      redirect: {name: 'Home'}
    },

    // 首页
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/list'),
      meta: {
        title: '首页'
      }
    },

    // 用户
    {
      path: '/user',
      component: Container,
      children: UserRouter
    },

    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test'),
      meta: {
        title: 'test'
      }
    }
  ],

  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})

// 微信登录逻辑
router.beforeEach(async (to, from, next) => {
  const { meta: { needLogin = true } = {} } = to

  if (needLogin) {
    if (!User.isLogin()) {
      User.toLogin()
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
  document.querySelector('title').innerHTML = to.meta.title
})

export default router
