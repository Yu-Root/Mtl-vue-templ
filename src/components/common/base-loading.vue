<template>
  <div :class='`loading loading-${loadType} ${className}`'></div>
</template>

<script setup>

defineProps({
  loadType: {
    type: String,
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
@import "base-loading.css";
</style>
