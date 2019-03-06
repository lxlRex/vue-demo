<template>
  <div>
    1111111111111123
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
    }
  },

  components: {
  },

  mounted () {
  },

  async created () {
    let { data: { data } } = await axios.post('https://uic-api.beeplay123.com/uic/api/lottery/login', {
      token: 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJqc2NwIiwiaXNzIjoiamRkLmNvbSJ9.eyJ1c2VyVHlwZSI6MSwidXNlcmlkIjoxMzgwMzI1MywidXVpZCI6IjBGRkIwOTYxOUY2ODREMkJCRTgwREY0RTc3Mzc5RUU2In0.7a37c4913e1940192f3249cf3b5f10f5.ODM3NjcxYjctNDNmZS00Y2RiLWFjMWQtNzJjMGUyMmQ1NzM5',
      userID: 'MTM4MDMyNTM=',
      userType: 1,
      appVersion: '5.3.2',
      platformCode: 'IPHONE',
      systemCode: 2
    })

    let { data: { data: { accessToken, expireIn, refreshToken } } } = await axios.post('https://uic-api.beeplay123.com/uic/api/user/login/accessToken', {
      token: data,
      type: 1
    })
    console.log(accessToken, expireIn, refreshToken)
    // await axios.post('https://platform-api.beeplay123.com/wap/api/promotion/game/listPage',
    //   {
    //     page: 1,
    //     pageSize: 10
    //   },{
    //     headers: { Authorization: accessToken }
    //   }
    // )

    // axios.post('https://platform-api.beeplay123.com/wap/api/promotion/game/listPage',
    //   {
    //     page: 2,
    //     pageSize: 10
    //   },{
    //     headers: { Authorization: accessToken }
    //   }
    // )
    location.href = `http://37.com.cn/h5game/public/?pid=491&gid=1002706&external=1&channel=100001&token=${accessToken}`
  }
}
</script>
<style lang="scss">
</style>
