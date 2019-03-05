import { MessageBox, Toast } from '../components'

export default {
  install (Vue) {
    const plugins = {
      $msgBox: MessageBox,
      $toast: Toast
    }
    Object.keys(plugins).forEach(key => {
      Object.defineProperty(Vue.prototype, key, {
        value: plugins[key]
      })
    })
  }
}
