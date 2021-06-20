<template>
  <div
    :style="{
      zIndex
    }"
    :class="{
      absolute,
      fixed,
    }"
    class="loading">
    <div
      :style="{
        width: `${size}rem`,
        height: `${size}rem`,
      }"
      class="spinner-border text-primary"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main";
.loading{
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba($white,0.3);
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>