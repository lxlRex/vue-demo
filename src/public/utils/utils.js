/**
 * @desc 格式化日期
 * @param value {String,Number,Date} value
 * @param format {String} format
 * @return {String} 结果
 */
export const dateFormat = (value, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (Object.prototype.toString.call(value) !== '[object Date]') {
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
    if (new RegExp('(' + i + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length))
    }
  }
  return format
}

/**
 * @desc 合并对象
 * @param target {Object} 需要合并的目标
 * @return {Object} 结果
 */
export const mergeObj = (target, ...args) => {
  args.forEach(item => {
    Object.keys(item).forEach(key => {
      if (item[key] !== undefined) {
        target[key] = item[key]
      }
    })
  })
  return target
}

/**
 * @desc 判空
 * @param str {String}
 * @return {Boolean}
 */
export const isNull = str => {
  if (str === undefined || str === '' || str === null || str === 'undefined') return true
  return false
}
