/**
 * @desc 占位图片生成器.
 * @author pkeros
 * @date 2018-11-30
 * @mail pkeros@vip.qq.com
 * @see https://github.com/hustcc/placeholder.js/blob/54af121b14cfbf6e78d186c73f26a6aa4b6fef67/src/src.js
 */

import watermarkUrl from '../assets/watermark.png'

let c = null
let cc = null
let watermark = new Image()

watermark.src = watermarkUrl

/**
 * @desc 生成占位图片
 * @param {number} width width.
 * @param {number} height height.
 * @returns {string} base64
 */
export function createPlaceholderImage ({width = 35, height = 35}) {
  if (!c || !cc) {
    c = document.createElement('canvas')
    cc = c.getContext('2d')
  }

  c.width = width
  c.height = height

  cc.clearRect(0, 0, width, height)

  // 填充背景色
  cc.fillStyle = '#ececf6'
  cc.fillRect(0, 0, width, height)

  // 绘制水印
  let shortBorder = width <= height ? width : height
  let imageHeight = shortBorder * 0.712
  let imageWidth = imageHeight * 1.135
  cc.drawImage(watermark, width - imageWidth, height - imageHeight, imageWidth, imageHeight)

  return c.toDataURL('image/jpeg')
}
