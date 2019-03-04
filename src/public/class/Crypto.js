/**
 * @desc 加密工具函数.
 * @author pkeros
 * @date 2018/6/12
 * @mail pkeros@vip.qq.com
 */

import encUtf8 from 'crypto-js/enc-utf8.js'
import encBase64 from 'crypto-js/enc-base64.js'
import md5 from 'crypto-js/md5.js'

export default class Crypto {
  /**
   * @desc 将 word 使用 md5 加密
   * @param {string} word 明文
   * @return {string}
   */
  static md5 (word) {
    return md5(encUtf8.parse(word)).toString()
  }

  /**
   * @desc 这不是 md5 算法是 decode base64
   * @param {string} word 明文
   * @return {string}
   */
  static MD5 (word) {
    return this.decodeBase64(word)
  }

  /**
   * @desc 将 word 使用 base64 编码
   * @param {string} word 明文
   * @return {string}
   */
  static decodeBase64 (word) {
    return encBase64.parse(word).toString(encUtf8)
  }

  /**
   * @desc base64 解码
   * @param {string} word base64 密文
   * @return {string}
   */
  static encodeBase64 (word) {
    return encBase64.stringify(encUtf8.parse(word))
  }

  /**
   * @desc 将 word 使用 encodeURIComponent 编码
   * @param {string} word 明文
   * @return {string}
   */
  static urlencode (word) {
    /* eslint-disable no-useless-escape */
    return encodeURIComponent(
      String(word)
        .replace(/[!'()]/g, escape)
        .replace(/\*/g, '%2A')
        .replace(/\%20/g, '+')
        .replace(/~/g, '%7E')
    )
  }

  /**
   * @desc decodeURIComponent 解码
   * @param {string} word url 密文
   * @return {string}
   */
  static urldecode (word) {
    return decodeURIComponent(
      String(word)
        .replace(/%(?![\da-f]{2})/gi, '%25')
        .replace(/\+/g, '%20')
    )
  }
}
