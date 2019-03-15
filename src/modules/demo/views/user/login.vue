<template>
  <div>
    <x-input v-model="loginData.userName" type="text" placeholder="账号"></x-input>
    <x-input v-model="loginData.password" type="password" placeholder="密码"></x-input>
    <x-button @click="login">login</x-button>
  </div>
</template>
<script>
import XInput from '@/public/components/src/input'
import XButton from '@/public/components/src/button'
import { login } from '@DEMO/api/user'

export default {
  data () {
    return {
      loginData: {
        userName: '',
        password: ''
      }
    }
  },

  methods: {
    async login () {
      let {data} = await login(this.loginData)
      console.log(data)
    }
  },

  components: {
    XInput,
    XButton
  }
}
</script>
<style>

</style>
