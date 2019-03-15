<template>
  <div class="c-input" :type="type">
    <input class="c-input__entity" v-model="innerValue" :type="type" v-bind="$attrs" @input="inputHandler" @focus="focusHandler" @blur="blurHandler">
    <div v-show="clearShow" class="c-input__clear" @click="clearhandler"></div>
  </div>
</template>
<script>
const inputTypes = ['text', 'number', 'tel', 'password']

export default {
  data () {
    return {
      innerValue: '',
      isFocus: false
    }
  },

  props: {
    value: {type: [String, Number], default: ''},
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return inputTypes.indexOf(value) !== -1
      }
    },
    format: { type: String, default: '' },
    showClear: { type: Boolean, default: false }
  },

  computed: {
    clearShow () {
      return !this.$attrs.readonly && !this.$attrs.disabled && this.showClear && this.innerValue !== '' && this.isFocus
    }
  },

  watch: {
    value: {
      handler (val) {
        this.innerValue = val
      },
      immediate: true
    },

    innerValue (val) {
      this.$emit('input', val)
    }
  },

  methods: {
    inputHandler () {
      if (this.format) this.innerValue = this.innerValue.replace(new RegExp(this.format), '')
    },

    clearhandler () {
      this.innerValue = ''
    },

    focusHandler () {
      this.isFocus = true
    },

    blurHandler () {
      this.isFocus = false
    }
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';

$iconSize: 20px;

@include b (c-input) {
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 16px;

  @include e (entity) {
    border: 0;
    outline: 0;
    width: 100%;
  }

  @include e (clear) {
    width: $iconSize; height: $iconSize;
    background: url("../assets/clear-icon.svg") no-repeat center center;
    background-size: 100% 100%;
    padding: 0 10px;
  }
}
</style>
