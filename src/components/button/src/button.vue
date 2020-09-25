<template>
  <div
    class="c-button"
    :class="{ 'c-button--disabled': disabled }"
    @touchstart="noop"
    @click="clickHandler"
  >
    <slot></slot>
  </div>
</template>
<script>
import noop from 'lodash/noop'
export default {
  data() {
    return {
      noop
    }
  },

  props: {
    disabled: { type: Boolean, default: false }
  },

  methods: {
    /**
     * @desc click event
     */
    clickHandler() {
      if (this.disabled) return
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';
@import '~SassMagic/src/mixins/box-center';

@include b(c-button) {
  width: 100%;
  height: 50px;
  user-select: none;
  background-color: #ffe149;
  font-size: 16px;
  position: relative;
  @include box-center(center, center);

  &:active:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.08);
  }

  @include m(disabled) {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
