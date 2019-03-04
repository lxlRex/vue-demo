<template>
	<div>
		<a @click="actionSheetBtn">打开actionsheet</a>
		<button @click="alertBtn">alert</button>

		<button @click="createBtn">create</button>
	</div>
</template>
<script>
	import {NativeUI,Webview} from '@/plus';
	import store from '@/public/vuex/store';
	import {LOADING_SHOW,LOADING_HIDE} from '@/public/vuex/mutations';
	export default{
		name: 'test',
		methods: {
			actionSheetBtn(){
				let arr = [
					{
						title: '1231',
						handler: ()=>{alert(1)}
					},{
						title: '1231',
						handler: ()=>{alert(2)}
					},{
						title: '1231'
					}
				]
				NativeUI.actionSheet({title:'qqqqq',buttons: arr})
			},
			alertBtn(){
				NativeUI.alert('1111',()=>{},'222','qwe')
			},
			createBtn(){
				Webview.create({
					url: 'http://10.33.93.37:8081/#/home',
					styles: {
						titleNView: {
					        backgroundColor: '#fff',
					    },
					}
				});
			}

		},
	}
</script>
<style></style>