<template>
  <transition name="fade">
    <div v-show="show" class="x-toast" >
      <div class="x-toast__text">{{msg}}</div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Toast',

  props: {
    msg: String,
    show: {type: Boolean, default: false},
    delay: {type: Number, default: 2000}
  },

  watch: {
    show (val) {
      if (val) {
        setTimeout(() => {
          this.$emit('close')
        }, this.delay)
      }
    }
  }
}
</script>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.x-toast {
  width: 300px;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  box-shadow: 0 1px 10px rgba(0, 0, 0, .5);
  .x-toast__text {
    text-align: center;
    border-radius: 5px;
    background: rgba(0, 0, 0, .7);
    padding: 10px 8px;
    color: #fff;
    word-break: break-word;
    font-size: 14px;
  }
}
</style>
