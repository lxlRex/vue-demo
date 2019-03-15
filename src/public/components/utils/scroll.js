import { on, off } from './dom'

export default class Scroll {
  startY = 0
  endY = 0
  translateY = 0
  transition = true
  maxDistance = 0 // 最大滚动距离
  lastDistance = 0 // 上次滚动的距离
  el = null

  init (el) {
    this.el = el
    on(el, 'touchstart', this.touchstarthandler)
    on(el, 'touchmove', this.touchmoveHandler)
    on(el, 'touchend', this.touchendHandler)
  }

  touchstarthandler (e) {
    this.startY = e.changedTouches[0].clientY
  }

  touchmoveHandler (e) {
    this.transition = false

    this.endY = e.changedTouches[0].clientY

    this.scroll(true)
  }

  touchendHandler (e) {
    this.transition = true

    this.scroll()

    this.lastDistance = this.translateY
  }

  scroll (scrolling = false) {
    let thisDistance = this.endY - this.startY + this.lastDistance

    if (thisDistance > 0) { // 下拉
      this.translateY = scrolling && this.flexible ? thisDistance / 10 : 0
    } else if (thisDistance >= -this.maxDistance) { // 上拉
      this.translateY = thisDistance
    } else { // 上拉超过最大距离
      this.translateY = scrolling && this.flexible ? -this.maxDistance + (thisDistance + this.maxDistance) / 10 : -this.maxDistance
    }
  }

  destroy () {
    off(this.el, 'touchstart', this.touchstarthandler)
    off(this.el, 'touchmove', this.touchmoveHandler)
    off(this.el, 'touchend', this.touchendHandler)
  }
}
