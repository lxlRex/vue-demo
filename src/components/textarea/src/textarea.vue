<template>
  <div class="c-textarea">
    <textarea
      ref="textarea"
      class="c-textarea__entity"
      v-bind="$attrs"
      v-model="innerValue"
    ></textarea>
    <div v-if="showCount && $attrs.maxlength" class="c-textarea__count">
      {{ count }}/{{ $attrs.maxlength }}
    </div>
  </div>
</template>
<script>
import Autosize from 'autosize'

export default {
  inheritAttrs: false,

  data() {
    return {
      innerValue: ''
    }
  },

  props: {
    value: { type: String, default: '' },
    showCount: { type: Boolean, default: false }
  },

  computed: {
    count() {
      return this.innerValue.replace(/\n/g, 'aa').length
    }
  },

  watch: {
    value: {
      handler(val) {
        let maxlength = this.$attrs.maxlength
        this.innerValue =
          maxlength && val.length > maxlength ? val.substr(0, maxlength) : val
      },
      immediate: true
    },

    innerValue(val) {
      this.updateAutoSize()
      this.$emit('input', val)
    }
  },

  methods: {
    bindAutosize() {
      Autosize(this.$refs.textarea)
    },
    updateAutoSize() {
      Autosize.update(this.$refs.textarea)
    },
    unbindAutosize() {
      Autosize.destroy(this.$refs.textarea)
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.bindAutosize()
    })
  },

  beforeDestroy() {
    this.unbindAutosize()
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';

@include b(c-textarea) {
  padding: 15px;
  font-size: 15px;
  background: #f7f8f9;
  border-radius: 6px;
  color: #afb3bd;

  @include e(entity) {
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    display: block;
    resize: none;
    width: 100%;
    color: inherit;
    font-size: 1em;
    line-height: inherit;
  }

  @include e(count) {
    display: flex;
    justify-content: flex-end;
    color: #afb3bd;
  }
}
</style>
