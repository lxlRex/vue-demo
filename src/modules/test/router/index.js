import Vue from 'vue'
import Router from 'vue-router'
// import {Webview} from '@/plus'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
  ]
})
router.afterEach(to => {
  document.title = to.meta.title
  document.querySelector('title').innerHTML = to.meta.title
})
export default router
