import Router from '../router'

// pre url
export const PRE_URL = `${location.origin}`

/**
 * @desc 登录页面
 * @param {object} params 其他附加在 url 后面的参数
 * @returns {string}
 * @constructor
 */
export const LOGIN_URL = params => `${PRE_URL}${Router.resolve({name: 'User_Login', query: { ...params }}).href}`
