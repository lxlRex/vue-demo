import Vue from 'vue'
import template from './src/loading'
import debounce from 'lodash/debounce'

let instance
let count = 0

const initInstance = () => {
  let Constuctor = Vue.extend(template)
  instance = new Constuctor({ el: document.createElement('div') })
  document.body.appendChild(instance.$el)
}

export default class Loading {
  /**
   * @description show loading
   */
  static show () {
    if (!instance) initInstance()

    count++

    Vue.nextTick(() => { instance.show = !!count })
  }

  /**
   * @description hide loading
   */
  static close () {
    if (!count) return
    count--
    Vue.nextTick(debounce(() => { instance.show = !!count }, 300))
  }
}
