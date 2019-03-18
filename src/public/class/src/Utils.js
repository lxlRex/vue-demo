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
}
