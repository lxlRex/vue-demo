<template>
  <div class="c-checker">
    <div class="c-checker__normal" :class="{'c-checker__normal--checked': checked}" @click="clickHandler"></div>
    <div class="c-checker__text"><slot></slot></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked: false
    }
  },

  props: {
    value: { type: Boolean, default: false }
  },

  watch: {
    value: {
      handler (val) { this.checked = val },
      immediate: true
    }
  },

  methods: {
    clickHandler () {
      this.checked = !this.checked
      this.$emit('input', this.checked)
    }
  }
}
</script>
<style lang="scss">
@import '../../../../../../node_modules/SassMagic/src/mixins/BEM';

$normal_color: #ececec;
$checked_color: #09bb07;
$checker_size: 20px;

@include b (c-checker) {
  display: flex;

  @include e (normal) {
    box-sizing: border-box;
    width: $checker_size;
    height: $checker_size;
    border: 1px solid $normal_color;
    border-radius: 3px;

     @include m (checked) {
      border-color: $checked_color;
      position: relative;
      overflow: hidden;

      &:before {
        content: '';
        border-width: 0 1px 1px 0;
        border-style: solid;
        border-color: $checked_color;
        width: 10px;
        height: 20px;
        transform: rotate(45deg);
        position: absolute;
        top: -4px;
        left: 4px;
      }
    }
  }

  @include e (text) {
    line-height: $checker_size;
    padding-left: 10px;
  }
}
</style>
