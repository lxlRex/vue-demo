<template>
  <div class="c-swiper-item" @click="$emit('click')">
    <slot></slot>
  </div>
</template>
<script>

export default {
  data () {
    return {}
  },

  mounted () {
    this.$parent.init()
  }
}
</script>
<style lang="scss">
.c-swiper-item {
  flex: 1;
}
</style>
