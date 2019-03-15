<template>
  <div class="native-datepicker">
    <input :id="`native-datepicker-${_uid}`" class="native-datepicker__entity" v-model="innerValue" :type="type" v-bind="$attrs" name="">
    <label :for="`native-datepicker-${_uid}`" class="native-datepicker__label">
      <div class="native-datepicker__value" v-if="innerValue">{{innerValue}}</div>
      <div class="native-datepicker__placeholder" v-else>{{placeholder}}</div>
    </label>
  </div>
</template>
<script>
import { dateFormat } from '../../../../utils/utils'
const types = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  time: 'hh:mm',
  'datetime-local': 'yyyy-MM-dd hh:mm'
}

export default {
  data () {
    return {
      innerValue: ''
    }
  },

  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '请选择' },
    type: {
      type: String,
      default: 'date',
      validator (value) {
        return Object.keys(types).indexOf(value) !== -1
      }
    }
  },

  watch: {
    value: {
      handler (val) {
        this.innerValue = val ? dateFormat(val, types[this.type]) : ''
      },
      immediate: true
    },

    innerValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss">
@import '../../../../../../node_modules/SassMagic/src/mixins/BEM';

@include b (native-datepicker) {

  @include e (entity) {
    opacity: 0;
    position: absolute;
    top: -999em;
    left: -999em;
    pointer-events: none;
  }

  @include e (label) {
    font-size: 16px;
    height: 50px;
    padding: 0 15px;
    color: #333;
    display: flex;
    align-items: center;
  }

  @include e (placeholder) {
    color: #999;
  }
}
</style>
