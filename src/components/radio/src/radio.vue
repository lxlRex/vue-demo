<template>
  <div class="c-radio">
    <div
      class="c-radio__item"
      :class="{ 'c-radio__item--checked': checked }"
      v-for="({ label, checked }, index) in _options"
      :key="index"
      @click="clickHandler(index)"
    >
      {{ label }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      innerValue: []
    }
  },

  props: {
    value: { type: [Number, String], default: '' },
    options: { type: Array, default: () => [] }
  },

  computed: {
    _options() {
      return this.options.map(e => {
        return {
          ...e,
          checked: this.innerValue === e.value
        }
      })
    }
  },

  watch: {
    value: {
      handler(val) {
        this.innerValue = val
      },
      immediate: true
    },

    innerValue(val) {
      this.$emit('input', val)
    }
  },

  methods: {
    clickHandler(i) {
      if (this._options[i].checked) return
      this._options.forEach(({ value }) => (value = false))
      this._options[i].checked = true
      this.innerValue = this._options[i].value
    }
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';

@include b(c-radio) {
  display: flex;
  justify-content: flex-start;

  @include e(item) {
    font-size: 16px;
    width: 100px;
    height: 40px;
    border: 1px solid #ececec;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    @include m(checked) {
      border-color: #09bb07;
      color: #09bb07;
    }
  }
}
</style>
