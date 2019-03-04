<template>
	<div>
		<!-- <l-icon icon="qicon-home" color="red" size="20px"></l-icon> -->
			<input type="file" name="" @change="preview($event)">
	</div>
</template>
<script>
	import axios from '@/public/axios'
	// import { LIcon } from '@/public/components';
	import { HomepagePaginate } from './api';
	export default{
		data () {
			return {
				file: '',
				queryData: {
          // addr: '全国',
          // pageSize: 11,
          // queryTitle: '',
          // pageNumAdvert: 1,
          // pageSizeAdvert: 2,
          // token: ''
          pageSize: 99999,
					addr: '全国',
					condition: '',
					brandId: '',
					orderNo: 0,
					downPaymentMin: 0,
					downPaymentMax: '',
					mouthPaymentMin: 0,
					mouthPaymentMax:''
      	},
			};
		},
		components: {
			LIcon
		},
		created() {
			// axios.get('http://10.33.93.37:3000/users').then(data => {
			// 	console.log(data)
			// });

			// axios.post('http://10.33.93.37:3000/users/login',{username: 'vvv',password: 'zzz'}).then(data => {
			// 	console.log(data)
			// });

			HomepagePaginate(this.queryData).then(data => {
					console.log(data)
				});

		},
		methods: {
			preview(e){
				let file = e.target.files[0];
				if(!e.target.files[0]) return
				let formdata = new FormData();
				formdata.append('file',file);

				axios.post('http://10.33.93.37:3000/users/setHead',formdata).then(data => {
					console.log(data)
				});
			}
		}
	}
</script>
<style></style>