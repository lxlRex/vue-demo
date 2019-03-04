
/**
 * @description: Watcher.
 * @author: pkeros.
 * @date: 24/11/2017.
 * @mail: pkeros@vip.qq.com
 */

import Vue from 'vue'

export default class Watcher {
  vueInstance = null;
  unwatchFunc = null;

  /**
   * @constructor
   */
  constructor () {
    this.vueInstance = new Vue({
      data () {
        return { watcher: null }
      }
    })
  }

  /**
   * @desc 观察一个对象
   * @param {Object} object 对象
   * @param {String} path 需要观察属性的路径 eg: 'obj.A.a'
   * @param {Function} callback 属性发生变化的回调 function (newVal, oldVal) {}
   * @param {Object} options 附加参数 {deep: true, immediate: true}
   * @return {undefined}
   */
  watch (object, path, callback, options) {
    this.vueInstance.$set('watcher', object)
    this.unwatchFunc = this.vueInstance.$watch(path, callback, options)
  }

  /**
   * @desc 取消观测
   * @return {undefined}
   */
  unwatch () {
    if (this.unwatchFunc) { this.unwatchFunc() }
  }
}
