<template>
  <section v-show="show" class="c-mask" :class="{'c-mask--hide': !display}" @click.self="$emit('maskClick')" :style="`z-index: ${zIndex}`" @touchmove="touchmoveHandler">
    <slot></slot>
  </section>
</template>
<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    scroll: { type: Boolean, default: false },
    display: { type: Boolean, default: true },
    zIndex: { type: Number, default: 999 }
  },

  watch: {
    show (val) {
      this.$emit('update:show', val)
    }
  },

  methods: {
    touchmoveHandler (e) {
      if (!this.scroll) e.preventDefault()
    }
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';
@import '~SassMagic/src/mixins/box-center';

@include b (c-mask) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  @include box-center;
  background: rgba(0, 0, 0, .5);

  @include m (hide) {
    background-color: transparent;
  }
}
</style>
