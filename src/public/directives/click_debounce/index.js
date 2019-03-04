/**
 * @desc click debounce.
 * @author pkeros
 * @date 2018/10/23
 * @mail pkeros@vip.qq.com
 */

import { on, off } from '../../utils/dom.js'
import _debounce from 'lodash/debounce.js'
import _noop from 'lodash/noop.js'

const _directive = {
  bind (el, binding, vnode) {
    let threshold = binding.arg || 300
    let handler = binding.value || _noop

    const clickHandler = _debounce(function () {
      handler.call(vnode, arguments)
    }, threshold)

    el.__vueClickDebounce__ = clickHandler
    on(el, 'click', clickHandler)
  },

  update () {

  },

  unbind (el, binding) {
    off(el, 'click', el.__vueClickDebounce__)
    delete el.__vueClickDebounce__
  }
}

/**
 * @desc install function.
 * @param {Vue} Vue vue instance.
 */
function install (Vue) {
  if (install.installed) { return }
  install.installed = true

  Vue.directive('clickDebounce', _directive)
}

export const directive = _directive
export default { install }
