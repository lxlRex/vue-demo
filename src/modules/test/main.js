// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import mixins from '@/public/mixins'
// import plugins from '@/public/plugins'

// import initPlus from '@/mui/plus'

// import '@/public/scss/main.scss'


Vue.mixin(mixins);
// Vue.use(plugins);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h('App'),
})

// initPlus.then(plus => {
// 	let back = () => {
// 		let hash = window.location.hash;

// 		if(hash !== '#/list'){
// 			window.history.go(-1);
// 		}else{
// 			plus.webview.currentWebview().hide();
// 		}
// 	}
// 	plus.key.addEventListener('backbutton',back, true);
// });