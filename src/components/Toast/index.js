import Vue from 'vue'
import template from './src/toast.vue'
import Queue from '@/utils/Queue'

let instance = null
const queue = new Queue()
const Constuctor = Vue.extend(template)

let initInstance = () => {
  instance = new Constuctor({ el: document.createElement('div') })
  document.body.appendChild(instance.$el)
}

let showToast = () => {
  if (!instance) {
    initInstance()
  }

  if (instance.show) return
  const msg = queue.dequeue()

  instance.$off('close').$on('close', () => {
    instance.show = false
    if (!queue.isEmpity()) setTimeout(showToast, 100)
  })
  instance.msg = msg
  instance.show = true
}

export default class Toast {
  static show(msg) {
    queue.enqueue(msg)
    showToast()
  }

  static close() {
    queue.clear()
    instance.show = false
  }
}
