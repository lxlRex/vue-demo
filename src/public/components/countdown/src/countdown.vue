<template>
  <span class="c-countdown">
    <slot :currentTime="currentTime" :isFinish="isFinish"></slot>
  </span>
</template>
<script>

export default {
  data () {
    return {
      currentTime: 0,
      interval: '',
      isFinish: false
    }
  },

  props: {
    time: { type: Number, default: 6, validator: val => val >= 0 }, // 时间: 秒
    start: { type: Boolean, default: false }
  },

  watch: {
    start (val) {
      console.log(this)
      this.currentTime = this.time
      if (val) this.countdown()
    }
  },

  methods: {
    countdown () {
      this.interval = setInterval(() => {
        if (this.currentTime > 0) {
          this.currentTime--
        } else {
          clearInterval(this.interval)
          this.isFinish = true
        }
      }, 1000)
    }
  },

  beforeDestory () {
    clearInterval(this.interval)
  }
}
</script>
