<template>
  <base-layout class='App-header'>
    <div class='form bg-white'>
      {{ userInfoData.userName }}
    </div>
  </base-layout>
</template>

<script setup>
import BaseLayout from '../../components/common/base-layout.vue'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
let userInfoData = reactive({
  userName: 'name',
})

userInfoData.userName = store.state.login.userName

</script>

<style scoped>

</style>
