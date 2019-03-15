<template>
  <div class="c-scroll-box" ref="scrollBox" @touchstart="touchstarthandler" @touchmove="touchmoveHandler" @touchend="touchendHandler">
    <div class="c-scroll-box__container"
         ref="scrollContainer"
         :class="{'c-scroll-box__container--transition': transition}"
         :style="`transform: translate3d(0, ${translateY}px, 0)`">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      startY: 0,
      endY: 0,
      translateY: 0,
      transition: true,
      maxDistance: 0, // 最大滚动距离
      lastDistance: 0 // 上次滚动的距离
    }
  },

  props: {
    flexible: { type: Boolean, default: true }
  },

  methods: {
    init () {
      this.$nextTick(() => {
        let scrollBox = this.$refs.scrollBox
        let scrollContainer = this.$refs.scrollContainer

        this.maxDistance = scrollContainer.offsetHeight - scrollBox.offsetHeight > 0 ? scrollContainer.offsetHeight - scrollBox.offsetHeight : 0
      })
    },

    touchstarthandler (e) {
      this.startY = e.changedTouches[0].clientY
    },

    touchmoveHandler (e) {
      this.transition = false

      this.endY = e.changedTouches[0].clientY

      this.scroll(true)
    },

    touchendHandler (e) {
      this.transition = true

      this.scroll()

      this.lastDistance = this.translateY
    },

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
  },

  mounted () {
    setTimeout(() => (this.init()), 300)
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';

@include b (c-scroll-box) {
  overflow: hidden;
  height: 100%;

  @include e (container) {

    @include m (transition) {
      transition: all .2s;
    }
  }
}
</style>
