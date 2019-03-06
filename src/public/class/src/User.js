import router from '../../router'

const USER_INFO = 'user_info'
export default class User {
  static token = ''

  /**
   *@ desc 获取用户信息
   *@ return {Object}
   */
  static getUserInfo () {
    return Promise.reslove(JSON.parse(localStorage.getItem(USER_INFO) || '{}'))
  }

  /**
   *@ desc 登录存入用户信息
   *@ param userInfo {Object}
   */
  static login (userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    Object.assign(this, userInfo)
    return Promise.reslove(userInfo)
  }

  /**
   *@ desc 登出清空token
   */
  static async logout () {
    let userInfo = await this.getUserInfo()
    delete userInfo.token
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
  }

  /**
   *@ desc 是否登录
   *@ return {Boolean}
   */
  static async isLogin () {
    if (this.token) {
      return Promise.reslove(true)
    } else {
      let { token = false } = await this.getUserInfo()
      return Promise.reslove(Boolean(token))
    }
  }

  /**
   *@ desc 去登录
   */
  static toLogin () {
    this.logout()
    router.push({path: `login?backURL=${encodeURIComponent(location.href)}`})
  }
}
