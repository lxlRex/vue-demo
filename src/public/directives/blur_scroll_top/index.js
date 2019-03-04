/**
 * @desc click debounce.
 * @author pkeros
 * @date 2018/10/23
 * @mail pkeros@vip.qq.com
 */

import { on, off } from '../../utils/dom.js'

let timer = null

function focusoutHandler (e) {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    window.scrollTo(0, document.body.clientHeight)
  }, 200)
}

function focusinHandler (e) {
  timer && clearTimeout(timer)
}

const _directive = {
  bind (el, binding, vnode) {
    on(el, 'focusout', focusoutHandler)
    on(el, 'focusin', focusinHandler)
  },

  update () {

  },

  unbind (el, binding) {
    off(el, 'focusout', focusoutHandler)
    off(el, 'focusin', focusinHandler)
  }
}

/**
 * @desc install function.
 * @param {Vue} Vue vue instance.
 */
function install (Vue) {
  if (install.installed) { return }
  install.installed = true

  Vue.directive('blurScrollTop', _directive)
}

export const directive = _directive
export default { install }
