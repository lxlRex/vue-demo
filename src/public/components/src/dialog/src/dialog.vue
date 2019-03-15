<template>
  <c-mask :show.sync="show" @maskClick="$emit('maskClick')">
    <div class="c-dialog-box" ref="scrollBox" @touchstart="touchstarthandler" @touchmove="touchmoveHandler" @touchend="touchendHandler">
      <div class="c-dialog-box__container" ref="scrollContainer" :class="{'c-dialog-box__container--transition': transition}" :style="`transform: translate3d(0, ${translateY}px, 0)`">
        <slot></slot>
      </div>
    </div>
  </c-mask>
</template>
<script>
import CMask from '../../mask'

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
    show: { type: Boolean, default: true },
    flexible: { type: Boolean, default: false }
  },

  watch: {
    show: {
      immediate: true,
      handler (val) {
        if (val) this.init()
        this.$emit('update:show', val)
      }
    }
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

  components: {
    CMask
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';

@include b (c-dialog-box) {
  overflow: hidden;
  width: 100%;
  height: 100%;
  @include e (container) {
    @include m (transition) {
      transition: all .2s;
    }
  }
}
</style>
