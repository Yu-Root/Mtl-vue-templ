<template>
  <button
    :class='`btn btn-${btnType} flex flex-justify-center flex-items-center ${className}`'
    :disabled='disabled'
    :type='type'
    @click='onClick'
  >
    <slot></slot>
  </button>
</template>

<script setup>

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
  },
  btnType: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default() {
      return ''
    },
  },
  onClick: {
    type: Function,
    default() {
    },
  },
})
</script>

<style scoped>
@import "base-button.css";
</style>
