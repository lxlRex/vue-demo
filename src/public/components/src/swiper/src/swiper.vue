<template>
  <section class="c-swiper" :class="swiperClass">
    <div v-show="swiperItemsLength" class="c-swiper__container"
      :style="`transform: translate3d(${transformX}px, 0, 0); transition: ${transition}`"
      @touchstart="touchstartHandler" @touchmove="touchmovehandler" @touchend="touchendHander" @webkitTransitionEnd="done">
      <slot></slot>
    </div>
  </section>
</template>
<script>
import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      swiperItemsLength: 0, // 轮播个数
      index: 1, // 当前位置
      startClientX: 0,
      startClientY: 0,
      endClientX: 0,
      endClientY: 0,
      timer: null, // 自动播放定时器
      swiperWidth: 0, // 轮播组件宽度
      transition: '',
      transformX: '',
      isTouch: false // 是否用户触发轮播
    }
  },

  props: {
    // 自动滑动
    autoPlay: { type: Boolean, default: true },
    // 一次滑动需要走多久
    duration: { type: Number, default: 500 },
    // 两次滑动间隔的时间
    interval: { type: Number, default: 2500 },
    showIndicator: {
      default: true
    },
    // 初始位置
    current: { type: Number, default: 1 }
  },

  computed: {
    swiperClass () { return `c-swiper-${this._uid}` },

    baseTranslateX () {
      return -this.index * this.swiperWidth
    },

    distanceX () {
      return this.endClientX - this.startClientX
    },

    distanceY () {
      return this.endClientY - this.startClientY
    }
  },

  watch: {
    index (val, oldVal) {
      console.log(val, oldVal)
      if ((val === 1 && oldVal === this.swiperItemsLength - 1) || (val === this.swiperItemsLength - 2 && oldVal === 0)) {
        this.transition = ''
      } else {
        this.transition = `all ${this.isTouch ? 0.1 : this.duration / 1000}s;`
      }
      console.log(this.isTouch)
      console.log(this.transition)

      this.transformX = this.baseTranslateX
    },

    transition (val) { console.log(val) }
  },

  methods: {
    done () {
      console.log(arguments)
    },

    init: debounce(function () {
      let swiper = document.querySelector(`.${this.swiperClass}`)
      let swiperContainer = document.querySelector(`.${this.swiperClass} .c-swiper__container`)
      let swiperItems = swiperContainer.querySelectorAll('.c-swiper-item')
      let swiperItemsLength = swiperItems.length

      swiperContainer.insertBefore(swiperItems[swiperItemsLength - 1].cloneNode(true), swiperItems[0])
      swiperContainer.appendChild(swiperItems[0].cloneNode(true))

      this.swiperItemsLength = swiperItemsLength + 2
      this.swiperWidth = swiper.offsetWidth
      swiperContainer.style.width = `${this.swiperItemsLength * this.swiperWidth}px`

      this.transition = `all ${this.duration / 1000}s;`
      this.transformX = this.baseTranslateX

      this.playHandler()
    }, 1),

    nextHandler (auto = false) {
      this.index++
      if (this.index === this.swiperItemsLength - 1) {
        if (auto) {
          setTimeout(() => {
            this.index = 1
          }, this.duration)
        } else {
          setTimeout(() => {
            this.index = 1
          }, 100)
        }
      }
    },

    prevHandler () {
      this.index--
      if (this.index === 0) {
        setTimeout(() => {
          this.index = this.swiperItemsLength - 2
        }, 100)
      }
    },

    playHandler () {
      if (this.autoPlay) this.timer = setInterval(this.nextHandler.bind(this, true), this.interval)
    },

    pauseHandler () {
      if (this.timer) clearInterval(this.timer)
    },

    touchstartHandler (e) {
      this.pauseHandler()
      this.startClientX = e.changedTouches[0].clientX
      this.startClientY = e.changedTouches[0].clientY
    },

    touchmovehandler (e) {
      this.endClientX = e.changedTouches[0].clientX
      this.endClientY = e.changedTouches[0].clientY

      this.isTouch = true
      this.transformX = this.baseTranslateX + this.distanceX
    },

    touchendHander (e) {
      this.endClientX = e.changedTouches[0].clientX
      this.endClientY = e.changedTouches[0].clientY
      if (this.distanceX > 0) {
        if (Math.abs(this.distanceX) > 80) {
          this.prevHandler()
        } else {
          this.transformX = this.baseTranslateX
          this.transition = 'all 0.1s'
        }
      }

      if (this.distanceX < 0) {
        if (Math.abs(this.distanceX) > 80) {
          this.nextHandler(false)
        } else {
          this.transformX = this.baseTranslateX
          this.transition = 'all 0.1s'
        }
      }

      setTimeout(() => {
        this.isTouch = false
      }, 1000)
      this.playHandler()
    }
  },

  created () {
    this.index = this.current
  },

  beforeDestroy () {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';

@include b (c-swiper) {
  overflow: hidden;

  @include e (container) {
    // -webkit-overflow-scrolling: touch;
    display: flex;
  }
}
</style>
