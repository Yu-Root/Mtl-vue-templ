<template>
  <base-layout class='bg'>
    <div class='form bg-white'>
      <h1>Not found page</h1>
      <base-button :btnType='"primary"' :onClick='goBack'>
        Back Index
      </base-button>
    </div>
  </base-layout>
</template>

<script setup>

import BaseLayout from '../../components/common/base-layout.vue'
import BaseButton from '../../components/common/base-button.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

function goBack() {
  router.push('/')
}

</script>

<style scoped>

</style>
