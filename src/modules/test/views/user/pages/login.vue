<template>
	<div class="content">
		<p class="logo">LOGO</p>
		<div class="user">
			<input type="text" name="" maxlength="11" placeholder="请输入账号" v-model="loginData.username">
		</div>
		<div class="pass">
			<input type="text" name="" placeholder="请输入密码" v-model="loginData.password">
		</div>
		<button class="loginBtn" @click="login()">登录</button>
	</div>
</template>
<script>
	import { isNull } from '@/public/utils/utils';
	import { LToast } from '@/public/components';
	import { Login } from '../api';
	import User from '@/public/utils/User'
	export default{
		name: 'login',
		data(){
			return{
				loginData: {
					username: '',
					password: ''
				},
			}
		},
		methods:{
			async login(){
				if (isNull(this.loginData.username)) {
          LToast.show('请输入账号');
        } else if (isNull(this.loginData.password)) {
          LToast.show('请输入验证码');
        } else {
        	let { data } = await Login(this.loginData);
        	User.login(data);
        	// this.$router.push({path: this.$route.query.backUrl || '/'});
        	if (this.$route.query.backURL) {
            location.href = decodeURIComponent(this.$route.query.backURL);
          } else {
            this.$router.push('/');
          }

        }
			},
		},
		beforeCreate(){
			// if (User.isLogin()) this.$router.push('/');
		},
		created(){
			let {
	      username = "",
	      password = ""
		  } = User.getUserInfo();
		  this.loginData = {username, password}
		},
	}
</script>
<style lang="scss" scoped>
.content{
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom right, #68cab7, #3577cd);
	padding-top: pxTorem(151);
	overflow: hidden;
	::-webkit-input-placeholder{
		color: rgba(255,255,255,0.8);
	}
	input{
		background: rgba(0,0,0,0);
		font-size: 17px;
		color: #FFFFFF;
		line-height: pxTorem(42);
		outline: none;
		border: 0;
	}

	.logo{
		font-size: pxTorem(28);
		color: #FFFFFF;
		margin-bottom: pxTorem(89);
		text-align: center;
	}
	.user{
		width: pxTorem(275);
		height: pxTorem(44);
		border: pxTorem(1) solid #E7E7E7;
		border-radius: pxTorem(22);
		margin: 0 auto pxTorem(20);
		position: relative;
		padding-left: pxTorem(23);
	}
	.pass{
		width: pxTorem(275);
		height: pxTorem(44);
		border: pxTorem(1) solid #E7E7E7;
		border-radius: pxTorem(22);
		margin: 0 auto pxTorem(52);
		padding-left: pxTorem(23);
		position: relative;
	}
	.loginBtn{
		width: pxTorem(275);
		height: pxTorem(44);
		font-size: pxTorem(17);
		color: #FFFFFF;
		background-image: linear-gradient(-180deg, #8EE6E4 0%, #55C9C4 100%);
		border-radius: pxTorem(22);
		margin-left: pxTorem(50);
		margin-bottom: pxTorem(133);
	}

}	
</style>