import Vue from 'vue'
import messageBox from './src/messageBox'

export default {
  instance: null,
  show (opt) {
    if (!this.instance) {
      let AlertConstructor = Vue.extend(messageBox)
      this.instance = new AlertConstructor()
      document.body.appendChild(this.instance.$mount().$el)
    }
    if (this.instance.show) return

    let {confirmCallback, cancelCallback} = opt

    // mergeObj(this.instance,opt);
    Object.assign(this.instance, opt)

    this.instance.$off('cancel').$on('cancel', (...args) => {
      cancelCallback && cancelCallback.apply(null, args)
      this.close()
    })
    this.instance.$off('confirm').$on('confirm', (...args) => {
      confirmCallback && confirmCallback.apply(null, args)
      this.close()
    })

    Vue.nextTick(() => {
      this.instance.show = true
    })
  },

  alert (msg, confirmBtn = '确认') {
    return new Promise(resolve => {
      this.show({
        msg: msg,
        type: 'alert',
        confirmCallback: resolve,
        confirmBtn: confirmBtn
      })
    })
  },

  confirm (msg, confirmBtn = '确认', cancelBtn = '取消') {
    return new Promise((resolve, reject) => {
      this.show({
        msg: msg,
        type: 'confirm',
        confirmCallback: resolve,
        cancelCallback: reject,
        confirmBtn: confirmBtn,
        cancelBtn: cancelBtn
      })
    })
  },
  close () {
    this.instance.show = false
  }
}
