<template>
  <div style="height: 100px;">
    <audio @canplay="canplay" @timeupdate="timeupdate" src="http://www.w3school.com.cn/i/horse.ogg" controls></audio>
    <div>{{currentTime | formatTime}}/{{duration | formatTime}}</div>
    <div>{{perCenter}}</div>
    <div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      duration: 0,
      currentTime: 0,
      perCenter: '0%'
    }
  },

  methods: {
    canplay (e) {
      this.duration = e.target.duration
    },

    timeupdate (e) {
      this.currentTime = e.target.currentTime
      this.perCenter = (this.currentTime * 100 / this.duration).toFixed(0) + '%'
    }
  },

  mounted () {
  },

  filters: {
    formatTime (val) {
      let seconds = Math.floor(val)
      return Math.floor(seconds / 60) + ':' + seconds % 60
    }
  }
}
</script>
<style lang="scss">
</style>
