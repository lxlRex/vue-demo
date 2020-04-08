// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import mixins from '@/public/mixins'

// import mandMobile from 'mand-mobile'
// import 'mand-mobile/lib/mand-mobile.css'

import { transferDom } from '@/public/directives'

// import plugins from '@/public/plugins'

Vue.mixin(mixins)
// Vue.use(plugins);

// Vue.use(mandMobile)

Vue.directive('transferDom', transferDom)

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  render: h => h(App)
})
