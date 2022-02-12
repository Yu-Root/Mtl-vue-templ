<template>
  <div :class='`main ${scroll} ${className}`'>
    <slot></slot>
  </div>
</template>

<script setup>

defineProps({
  scroll: {
    type: Boolean,
    required: false,
  },
  className: {
    type: String,
    default() {
      return ''
    },
  },
})
</script>

<style scoped>

</style>
