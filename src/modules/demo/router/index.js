import Vue from 'vue'
import Router from 'vue-router'

import Container from './router_container.vue'
import UserRouter from './sub_router/user_router'

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {name: 'list'}
    },

    // 用户
    {
      path: '/user',
      component: Container,
      children: UserRouter
    },

    {
      path: '/list',
      name: 'list',
      component: () => import('../views/list'),
      meta: {
        title: '列表'
      }
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

router.afterEach((to, from) => {
  document.title = to.meta.title
  document.querySelector('title').innerHTML = to.meta.title
})

export default router
