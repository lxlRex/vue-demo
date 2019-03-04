/**
 * @description a simple event centre manage class.
 * @constructor
 */

import Vue from 'vue'

export default class EventBus {
  /**
   * @desc vue instance.
   * @type {null|object}
   * @private
   */
  _vueInstance = null

  /**
   * @constructor
   */
  constructor () {
    this._vueInstance = new Vue()
  }

  /**
   * @desc remove event listener.
   * @param {string} name 取消监听的事件名
   * @param {Function} callback 监听函数
   */
  off (name, callback) {
    this._vueInstance.$off(name, callback)
  }

  /**
   * @desc add event listener.
   * @param {string} name 监听的事件名
   * @param {Function} callback 监听函数
   */
  on (name, callback) {
    this._vueInstance.$on(name, callback)
  }

  /**
   * @desc add event listener, emit once.
   * @param {string} name 监听的事件名
   * @param {Function} callback 监听函数
   */
  once (name, callback) {
    this._vueInstance.$once(name, callback)
  }

  /**
   * @desc emit a event on the eventBus.
   * @param {string} name 事件名
   * @param {*} params 参数
   */
  emit (name, params) {
    this._vueInstance.$emit(name, params)
  }

  /**
   * @desc clear all listener on the eventBus.
   */
  offAll () {
    this._vueInstance.$off()
  }

  /**
   * @desc destroy
   */
  destroy () {
    this.offAll()
    this._vueInstance = null
  }
}
