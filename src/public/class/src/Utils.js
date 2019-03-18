export default class Utils {
  /**
   * @desc 合并对象
   * @param {object} target 目标对象
   * @param {object} args 合并对象
   * @return {Object} 结果
   */
  static mergeOwn (target, ...args) {
    args.forEach(item => {
      Object.keys(item).forEach(key => {
        if (target.hasOwnProperty(key) && item[key] !== undefined) {
          target[key] = item[key]
        }
      })
    })
    return target
  }

  /**
   * @desc 格式化日期
   * @param value {String,Number,Date} value
   * @param format {String} format
   * @return {String} 结果
   */
  static dateFormat (value, format = 'yyyy-MM-dd hh:mm:ss') {
    if (Object.prototype.toString.call(value) === '[object Date]') {
      value = value.replace(/-/g, '/')
    }

    value = new Date(value)
    let args = {
      'M+': value.getMonth() + 1,
      'd+': value.getDate(),
      'h+': value.getHours(),
      'm+': value.getMinutes(),
      's+': value.getSeconds(),
      'q+': Math.floor((value.getMonth() + 3) / 3), // quarter
      S: value.getMilliseconds()
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let i in args) {
      let n = args[i]
      if (new RegExp(`(${i})`).test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length))
      }
    }
    return format
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
   * @desc 格式化银行卡号 四位空格
   * @param {string} cardNo 卡号
   * @returns {*}
   */
  static formatBankCardNo (cardNo) {
    return cardNo.replace(/(\d{4})/g, '$1 ')
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
   * @desc 判断值是否为空值
   * @param {string|null|undefined} val value.
   * @return {boolean} 是否是空值
   */
  static isEmptyValue (val) {
    return typeof val === 'undefined' || val === '' || val === null
  }
}
