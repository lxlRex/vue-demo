/**
 * @desc 全屏插件.
 * @author pkeros
 * @date 2018/8/19
 * @mail pkeros@vip.qq.com
 */

import _debounce from 'lodash/debounce.js'
import { setStyle, insertStyleSheet, hasClass, addClass } from '@/public/utils/dom.js'

// threshold
const threshold = 31
// nodes
let nodes = []
// directive
const _directive = {

  bind (el, arg, vnode) {
    vnode.context.$nextTick(() => {
      nodes.push(el)
    })
  },
  inserted (el, arg, vnode) {
    vnode.context.$nextTick(() => {
      resizeHandler()
    })
  },
  update () {},
  componentUpdated () {},
  unbind (el) {
    nodes = []
  }

}

/**
 * @desc resize handler.
 */
function resizeHandler () {
  let doc, clientWidth
  doc = document
  clientWidth = doc.documentElement.clientWidth >= 750 ? 750 : doc.documentElement.clientWidth

  for (let node of nodes) {
    setStyle(node, 'width', `${clientWidth}px`)
    setStyle(node, 'height', `${doc.documentElement.clientHeight}px`)
    if (!hasClass(node, 'x-full-screen')) addClass(node, 'x-full-screen')
  }
}

/**
 * @desc install function.
 * @param {Vue} Vue vue instance.
 */
function install (Vue) {
  if (install.installed) { return }
  install.installed = true

  Vue.directive('fullScreen', _directive)
}

// window resize handler.
window.addEventListener('resize', _debounce(resizeHandler, threshold))
// insert css rule.
insertStyleSheet('.x-full-screen', `overflow-y: scroll; -webkit-overflow-scrolling: touch; overflow-scrolling: touch;`)

export const directive = _directive
export default { install }
