/**
 * @desc decimal mask.
 * @author pkeros
 * @date 2018/10/16
 * @mail pkeros@vip.qq.com
 */

/**
 * @desc input event handler.
 * @param {object} e event object.
 */
function inputHandler (e) {
  let el = e.target
  let tester = new RegExp(el.dataset.testerExp)
  let oldValue = el.dataset.oldValue

  if (el.value !== oldValue) {
    if (!tester.test(el.value)) {
      el.value = oldValue
    }
    el.dataset.oldValue = el.value
  }
}

let events = ['input', 'paste']

const _directive = {
  bind (el, args) {
    // 处理参数
    let mask = args.value
    el.dataset.decimalMask = mask || '999999.99'

    // 正则初始化
    let v; let d
    let negative = /^-/.test(mask) ? '(-)?' : ''
    let separator = !(v = mask.match(/,|\./)) ? null : v[0]
    let integerLength = mask.split(separator)[0].replace('-', '').length
    let decimalLength = !(d = mask.split(separator)[1]) ? null : d.length
    el.dataset.testerExp = '^\\d{0,' + integerLength + '}' + (decimalLength ? '(\\' + separator + '\\d{0,' + decimalLength + '})?$' : '$')

    // 事件监听
    events.forEach(eventName => el.addEventListener(eventName, inputHandler))

    // 设置元素属性
    let length = integerLength + (separator ? 1 : 0) + (decimalLength || 0) + (negative ? 1 : 0)
    el.setAttribute('maxlength', length)

    // 设置分割符
    if (separator) {
      el.value = String(el.value).replace('.', separator)
    }
  },
  inserted () {},
  update (el, arg) {
    inputHandler({ target: el })
  },
  componentUpdated () {},
  unbind (el) {
    // 解除事件监听
    events.forEach(eventName => el.removeEventListener(eventName, inputHandler))
  }
}

/**
 * @desc install function.
 * @param {Vue} Vue vue instance.
 */
function install (Vue) {
  if (install.installed) { return }
  install.installed = true

  Vue.directive('decimalMask', _directive)
}

export const directive = _directive
export default { install }
