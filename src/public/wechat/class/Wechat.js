import axios from 'axios'
const wx = require('../sdk/jweixin-1.4.0.js')

export default class Wechat {
  static getWechatConfig (url) {
    return axios.get('http://wx.yinlailease.com:9090/app/v1/weChat/signature', {params: { url }})
  }

  static authPage ({appId, timestamp, nonceStr, signature}) {
    return new Promise((resolve, reject) => {
      try {
        wx.config({
          debug: false,
          appId,
          timestamp,
          nonceStr,
          signature,
          jsApiList: [
            'chooseWXPay',
            'hideAllNonBaseMenuItem'
          ]
        })
        wx.ready(resolve)
      } catch (e) {
        reject(e)
      }
    })
  }
}
