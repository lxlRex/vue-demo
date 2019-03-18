import Vue from 'vue'
import template from './src/messageBox'

let instance = null

function showMessageBox (opt) {
  if (!instance) {
    let AlertConstructor = Vue.extend(template)
    instance = new AlertConstructor()
    document.body.appendChild(instance.$mount().$el)
  }
  if (instance.show) return

  let {confirmCallback, cancelCallback} = opt

  // mergeObj(instance,opt);
  Object.assign(instance, opt)

  instance.$off('cancel').$on('cancel', (...args) => {
    cancelCallback && cancelCallback.apply(null, args)
    MessageBox.close()
  })
  instance.$off('confirm').$on('confirm', (...args) => {
    confirmCallback && confirmCallback.apply(null, args)
    MessageBox.close()
  })

  Vue.nextTick(() => {
    instance.show = true
  })
}

export default class MessageBox {
  /**
   * @desc alert
   * @param {string} msg
   * @param {string} confirmBtn
   * @return {Promise<any>}
   */
  static alert (msg, confirmBtn = '确认') {
    return new Promise(resolve => {
      showMessageBox({
        msg: msg,
        type: 'alert',
        confirmCallback: resolve,
        confirmBtn: confirmBtn
      })
    })
  }

  /**
   * @desc confirm
   * @param {string} msg
   * @param {string} confirmBtn
   * @param {string} cancelBtn
   * @return {Promise<any>}
   */
  static confirm (msg, confirmBtn = '确认', cancelBtn = '取消') {
    return new Promise((resolve, reject) => {
      showMessageBox({
        msg: msg,
        type: 'confirm',
        confirmCallback: resolve,
        cancelCallback: reject,
        confirmBtn: confirmBtn,
        cancelBtn: cancelBtn
      })
    })
  }

  static close () {
    instance.show = false
  }
}
