<template>
  <c-mask :show.sync="show">
    <div class="message-box">
      <div class="message-box__msg">{{msg}}</div>
      <div class="message-box__btn">
        <div v-if="type === 'confirm'" class="message-box__btn--cancel" @click.stop="$emit('cancel')">{{cancelBtn}}</div>
        <div class="ok" @click.stop="$emit('confirm')">{{confirmBtn}}</div>
      </div>
    </div>
  </c-mask>
</template>
<script>
import CMask from '../../mask'

export default {
  name: 'MessageBox',
  props: {
    type: { type: String },
    msg: { type: String },
    show: { type: Boolean, default: false },
    cancelBtn: { type: String, default: '取消' },
    confirmBtn: { type: String, default: '确认' }
  },
  components: {
    CMask
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';

@include b (message-box) {
  background: #fff;
  border-radius: 5px;
  width: 300px;

  @include e (msg) {
    word-break: break-all;
    padding: 25px 8px;
    text-align: center;
    font-size: 14px;
    color: #333;
  }

  @include e (btnBox) {
    display: flex;
  }

  @include e (btn) {
    flex: 1;
    color: #3577cd;
    text-align: center;
    line-height: 44px;
    border-top: 1px solid #EFEFF4;
    font-size: 14px;

    @include m (cancel) {
      border-right: 1px solid #EFEFF4;
      color: #adb5bd;
    }
  }
}
</style>
