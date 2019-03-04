<template>
  <span @click="$emit('click')">
    <svg class="icon" aria-hidden="true" :style="style">
        <use :xlink:href="'#'+icon"></use>
    </svg>
    <slot></slot>
  </span>
</template>
<script>
export default{
  name: 'icon',
  props: {
    icon: String,
    color: {type: String, default: 'currentColor'},
    size: {type: String, default: '16px'}
  },
  computed: {
    style () {
      return `fill: ${this.color};font-size: ${this.size};`
    }
  }
}
</script>
<style lang="scss" scoped>
  .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       overflow: hidden;
    }
</style>
