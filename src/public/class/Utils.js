/**
 * @desc Utils.
 * @author pkeros
 * @date 2018/8/21
 * @mail pkeros@vip.qq.com
 */

import Vue from 'vue'
import { getStyle } from '../../utils/dom.js'
import dateFormat from 'date-fns/format'
import qs from 'querystringify'

export default class Utils {
  /**
   * @desc 合并对象, 当目标中含有这个属性时候才合并否则不操作
   * @param {Object} target 需要合并的目标
   * @return {Object} 结果
   */
  static mergeOwn (target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
      let source = arguments[i]
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
          let value = source[prop]
          if (target.hasOwnProperty(prop) && value !== undefined) {
            target[prop] = value
          }
        }
      }
    }

    return target
  }

  /**
   * @desc 获取元素中文本行数 (可能不是很准确)
   * @param {HTMLElement|Element} el any element.
   * @returns {Promise<number>} 文本行数
   */
  static getTextCount (el) {
    return new Promise((resolve) => {
      Vue.nextTick(() => {
        let styleLineHeight, lineHeight, styleHeight, height
        styleHeight = getStyle(el, 'height')
        styleLineHeight = getStyle(el, 'line-height')

        height = Math.round(styleHeight.split('px')[0])
        lineHeight = Math.round(styleLineHeight.split('px')[0])

        resolve(Math.ceil(height / lineHeight))
      })
    })
  }

  /**
   * @desc 格式化时间
   * @param {Date} time 时间
   * @param {string} format 格式化规则
   * @return {string}
   */
  static dateFormat (time, format = 'YYYY-MM-DD HH:mm:ss') {
    return dateFormat(time, format)
  }

  /**
   * @desc 格式化数字, 三位 用逗号分割
   * @param {string|number} source 数字
   * @param {number} length 几位分割
   * @returns {string} 格式完成的字符串
   */
  static numberFormat (source, length = 3) {
    let _source = String(source).split('.')
    _source[0] = _source[0].replace(new RegExp(`(\\d)(?=(\\d{${length}})+$)`, 'ig'), '$1,')

    return _source.join('.')
  }

  /**
   * @desc 获取一个范围内的随机整数
   * @param {number} left 右侧范围
   * @param {number} right 左侧范围
   * @returns {number} 随机整数
   */
  static getRandomInt (left, right) {
    return Math.floor(Math.random() * (right - left + 1) + left)
  }

  /**
   * @desc 载入一个外部脚本
   * @param {string} url  脚本 URL
   * @param {number} timeout  超时时间
   * @return {Promise}
   */
  static loadScript (url, timeout = 6000) {
    let scriptEl = document.createElement('script')

    scriptEl.src = url
    scriptEl.type = 'text/javascript'
    document.head.appendChild(scriptEl)

    return new Promise((resolve, reject) => {
      setTimeout(() => reject(scriptEl), timeout)
      scriptEl.onload = (e) => resolve(e, scriptEl)
      scriptEl.onerror = (e) => reject(e, scriptEl)
    })
  }

  /**
   * @desc 获取 url 上的查询参数
   * @param {string} name 参数名
   * @returns {string} 参数值
   */
  static getQueryString (name) {
    let href = location.href

    let locationSearchQs = qs.parse(location.search)[name]
    let hashSearchQs = qs.parse(href.substr(href.lastIndexOf('?') + 1))[name]

    if (locationSearchQs) {
      return locationSearchQs
    } else if (hashSearchQs) {
      return hashSearchQs
    } else {
      return ''
    }
  }

  /**
   * @desc 格式化计算时间
   * @param {number} timestamp 时间戳
   * @returns {string}
   */
  static computedTime (timestamp) {
    let mistiming = Math.round((new Date().getTime() - timestamp) / 1000)
    let arrr = ['年', '个月', '周', '天', '小时', '分钟', '秒']
    let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]

    // 本地时间小于证明时间
    if (mistiming <= 0) {
      return '刚刚'
    }

    for (let i = 0; i < 7; i++) {
      let inm = Math.floor(mistiming / arrn[i])
      if (inm !== 0) {
        return inm + arrr[i] + '前'
      }
    }
  }

  /**
   * @desc 格式化银行卡号 四位空格
   * @param {string} cardNo 卡号
   * @returns {*}
   */
  static formatBankCardNo (cardNo) {
    return cardNo.replace(/(\d{4})/g, '$1 ')
  }
}
