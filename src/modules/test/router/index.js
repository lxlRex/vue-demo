import Vue from 'vue'
import Router from 'vue-router'
// import {Webview} from '@/plus'
Vue.use(Router)
function errorCallback () {}
const router = new Router({
	mode: 'history',
  	routes: [
  		// {
	   //    	path: '/',
	   //    	name: 'home',
	   //    	component (resolve) {
	   //          require(["../views/home"], resolve, errorCallback);
	   //      },
	   //      meta: {
	   //          title: '主页'
	   //      },
	   //  },
	   //  {
	   //    	path: '/login',
	   //    	name: 'login',
	   //    	component (resolve) {
	   //          require(["../views/user/pages/login"], resolve, errorCallback);
	   //      },
	   //      meta: {
	   //          title: '登录'
	   //      },
	   //  },
	   //  {
	   //  	path: '/actionSheet',
	   //  	name: 'actionSheet',
	   //  	component(resolve){
	   //  		require(["../views/actionSheet"], resolve, errorCallback);
	   //  	},
	   //  	 meta: {
	   //          title: 'actionSheet'
	   //      },
	   //  },
	   //  {
	   //    	path: '/list',
	   //    	name: 'list',
	   //    	component (resolve) {
	   //          require(["../views/list"], resolve, errorCallback);
	   //      },
	   //      meta: {
	   //          title: '列表'
	   //      },
	   //  },
  	]
})
router.afterEach((to,from) => {
  	document.title = to.meta.title;
  	document.querySelector('title').innerHTML = to.meta.title;
  	
  // 	Webview.currentWebview().then(webview => {
  // 		let titleNView = {
  // 			titleText: to.meta.title,
	 //        autoBackButton: true,
	 //        backgroundColor: '#fff',
	 //        titleColor: '#000',
	 //        type: 'default',
  // 		}
  // 		if(to.path === '/'){
  // 			titleNView.autoBackButton = false;
  // 		}
  // 		if(to.path === '/list'){
  // 			titleNView.type = 'transparent';
  // 		}
  // 		webview.setStyle({
		//     titleNView,
		// });
  // 	});
});
export default router;