/**
 * @desc click outside.
 * @author pkeros
 * @date 2018/10/23
 * @mail pkeros@vip.qq.com
 */

const _directive = {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }

    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },

  update () {

  },

  unbind (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}

/**
 * @desc install function.
 * @param {Vue} Vue vue instance.
 */
function install (Vue) {
  if (install.installed) { return }
  install.installed = true

  Vue.directive('clickOutside', _directive)
}

export const directive = _directive
export default { install }
