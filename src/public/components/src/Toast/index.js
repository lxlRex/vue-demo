import Vue from 'vue'
import template from './src/toast.vue'

let instance = null
let queue = []
let Constuctor = Vue.extend(template)

let initInstance = () => {
  instance = new Constuctor({el: document.createElement('div')})
  document.body.appendChild(instance.$el)
}

let showToast = () => {
  if (!instance) {
    initInstance()
  }

  if (instance.show) return
  let msg = queue.shift()

  instance.$off('close').$on('close', () => {
    instance.show = false
    if (queue.length) setTimeout(showToast, 100)
  })
  instance.msg = msg
  instance.show = true
}

export default class Toast {
  static show (msg) {
    queue.push(msg)
    showToast()
  }

  static close () {
    queue = []
    instance.show = false
  }
}
