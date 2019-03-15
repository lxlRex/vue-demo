export default [
  {
    path: 'login',
    name: 'User_Login',
    meta: {
      title: '登录'
    },
    component: () => import('@DEMO/views/user/login')
  }
]
