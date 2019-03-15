<template>
  <transition name="fade">
    <div v-show="show" class="c-toast" >
      <div class="c-toast__text">{{msg}}</div>
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
@import '~SassMagic/src/mixins/BEM';
@import '../../../style/fade.css';

@include b (c-toast) {
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  box-shadow: 0 1px 10px rgba(0, 0, 0, .5);

  @include e (text) {
    text-align: center;
    border-radius: 5px;
    background: rgba(0, 0, 0, .7);
    padding: 10px 15px;
    color: #fff;
    word-break: break-word;
    font-size: 14px;
  }
}
</style>
