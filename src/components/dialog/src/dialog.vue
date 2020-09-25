<template>
  <c-mask :show.sync="show" @maskClick="$emit('maskClick')">
    <div class="c-dialog-box">
      <div
        v-if="showClose"
        class="c-dialog-box__close"
        @click="$emit('close')"
      ></div>
      <slot></slot>
    </div>
  </c-mask>
</template>
<script>
import CMask from '../../mask'

export default {
  data() {
    return {}
  },

  props: {
    show: { type: Boolean, default: true },
    showClose: { type: Boolean, default: true }
  },

  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.$emit('update:show', val)
      }
    }
  },

  methods: {},

  components: {
    CMask
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';
@import '../../style/scss/close.scss';

@include b(c-dialog-box) {
  width: 85%;
  background: #fff;
  padding: 15px 20px 10px;
  border-radius: 5px;
  position: relative;

  @include e(close) {
    position: absolute;
    top: 5px;
    right: 5px;
    @include close-icon();
  }
}
</style>
