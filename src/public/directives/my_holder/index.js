/**
 * @desc holderjs 支持水印拓展.
 * @author pkeros
 * @date 2018-11-30
 * @mail pkeros@vip.qq.com
 */

import { createPlaceholderImage } from './src/placeholder_image_generator.js'

const errHandler = function (e) {
  let el = e.target
  let w = Number(el.dataset.w)
  let h = Number(el.dataset.h)

  el.src = createPlaceholderImage({width: w, height: h})
}

const _directive = {
  bind (el, arg, vnode) {
    let size = (String(arg.value) || '100*100').split('*')

    el.dataset.w = size[0]
    el.dataset.h = size[1]

    // 如果 el 是 img 元素
    if (el.tagName === 'IMG') {
      // 如果 src 属性为空
      if (!el.getAttribute('src')) { errHandler({target: el}) }

      el.addEventListener('error', errHandler)
    } else {
      let defImgData = createPlaceholderImage({
        width: Number(size[0]),
        height: Number(size[1])
      })

      if (el.style.backgroundImage) {
        el.style.backgroundImage = `${el.style.backgroundImage}, url(${defImgData})`
      } else {
        el.style.backgroundImage = `url(${defImgData})`
      }
    }
  },
  inserted (el, arg, vnode) {
  },
  update () {},
  componentUpdated () {},
  unbind (el) {
    el.removeEventListener('error', errHandler)
  }
}

/**
 * @desc install function.
 * @param {Vue} Vue vue instance.
 */
function install (Vue) {
  if (install.installed) { return }
  install.installed = true

  Vue.directive('holder', _directive)
}

export const directive = _directive
export default { install }
