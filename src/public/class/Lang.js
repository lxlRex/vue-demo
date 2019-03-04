/**
 * @desc Lang.
 * @author pkeros
 * @date 2018/10/24
 * @mail pkeros@vip.qq.com
 */

import _pickBy from 'lodash/pickBy.js'
import Utils from './Utils.js'

export default class Lang {
  /**
   * @desc 判断值是否为空值
   * @param {string|null|undefined} val value.
   * @return {boolean} 是否是空值
   */
  static isEmptyValue (val) {
    return typeof val === 'undefined' || val === '' || val === null
  }

  /**
   * @desc 帮助你从后端接口中安全的获取数据
   * @param {object} source 需要填充的对象
   * @param {object} backEndData 后端返回的数据
   * @return {object|source} 你想要获得数据
   */
  static safetyPick (source, backEndData) {
    return Utils.mergeOwn(source, _pickBy(backEndData, val => !this.isEmptyValue(val)))
  }
}
