<template>
  <div class="c-checkbox">
    <div class="c-checkbox__item"
         :class="{'c-checkbox__item--checked': checked}" v-for="({label, checked}, index) in _options"
         :key="index"
         @click="clickHandler(index)">
      {{label}}
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      innerValue: []
    }
  },

  props: {
    value: { type: [Array, String], default: () => [] },
    options: { type: Array, default: () => [] }
  },

  computed: {
    _options () {
      return this.options.map(e => {
        return {
          ...e,
          checked: this.innerValue.indexOf(e.value) > -1
        }
      })
    }
  },

  watch: {
    value: {
      handler (val) { this.innerValue = val },
      immediate: true
    },

    innerValue (val) { this.$emit('input', val) }
  },

  methods: {
    /**
     * @desc click event
     * @param {number} i index
     */
    clickHandler (i) {
      this._options[i].checked = !this._options[i].checked
      this.innerValue = this._options.filter(({checked}) => checked).map(({value}) => value)
    }
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';

@include b (c-checkbox) {
  display: flex;
  justify-content: flex-start;

  @include e (item) {
    font-size: 16px;
    width: 100px;
    height: 40px;
    border: 1px solid #ececec;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    @include m (checked) {
      border-color: #09bb07;
      color: #09bb07;
    }
  }
}
</style>
