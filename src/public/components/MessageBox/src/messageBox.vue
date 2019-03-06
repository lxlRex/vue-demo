<template>
  <l-mask :show.sync="show">
    <div class="message-box">
      <div class="message-box__msg">{{msg}}</div>
      <div class="flex message-box__btn">
        <div v-if="type === 'confirm'" class="message-box__btn--cancel flex_1" @click.stop="$emit('cancel')">{{cancelBtn}}</div>
        <div class="ok flex_1" @click.stop="$emit('confirm')">{{confirmBtn}}</div>
      </div>
    </div>
  </l-mask>
</template>
<script>
import LMask from '../../mask'

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
    LMask
  }
}
</script>
<style lang="scss">
.message-box{
  background: #fff;
  border-radius: 5px;
  width: 300px;
  .message-box__msg{
    word-break: break-all;
    padding: 25px 8px;
    text-align: center;
    font-size: 14px;
    color: #333;
  }
  .message-box__btn{
    div{
      color: #3577cd;
      text-align: center;
      line-height: 44px;
      border-top: 1px solid #EFEFF4;
      font-size: 14px;
      &.message-box__btn--cancel{
        border-right: 1px solid #EFEFF4;
        color: #adb5bd;
      }
    }
  }
}
</style>
