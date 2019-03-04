import axios from 'axios'
const wx = require('../sdk/jweixin-1.4.0.js')

export default class Wechat {

  static getWechatConfig (url) {
    return axios.get('http://wx.yinlailease.com:9090/app/v1/weChat/signature', {params: { url }})
  }

  static authPage ({appid, timestamp, nonceStr, signature}) {
    return new Promise ((reslove, reject) => {
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
        });

        wx.ready(() => (reslove())
      } catch (e) {
        reject(e)
      }
    })
  }
}