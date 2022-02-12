<template>
  <base-layout class='App-header'>
    <div class='form bg-white'>
      <h2 class='form__title'>Login</h2>
      <div class='form-input'>
        <input v-model='formData.phone' class='form-input__text' name='phone' placeholder='Phone' type='number' />
      </div>
      <div class='form-input'>
        <input
          v-model='formData.password'
          class='form-input__text'
          name='password'
          placeholder='Password'
          type='password'
        />
      </div>
      <div class='form-input'>
        <div class='flex flex-items-center'>
          <input
            v-model='formData.verifyCode'
            class='form-input__text flex-cell'
            placeholder='SMS verification code'
            type='text'
          />
          <div class='form-input__code blue-text' @click='sendCode'>{{ verifyCodeData.text }}</div>
        </div>
      </div>
      <base-button :btnType="'primary'" class='login-btn' type='submit' @click='handleLogin'>Login</base-button>
    </div>
  </base-layout>
</template>

<script setup>
import BaseButton from '../../components/common/base-button.vue'
import { ref, reactive } from 'vue'
import loginApi from '../../api/login/index.js'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import BaseLayout from '../../components/common/base-layout.vue'

const router = useRouter()
const store = useStore()
let verifyCodeData = reactive({
  count: 10,
  text: 'Get code',
})
let btnDisable = ref(false)
let sendFlag = ref(false)
let errMsg = ref('')

const formData = reactive({
  phone: '',
  password: '',
  verifyCode: '',
})

function isCheckPhone() {
  if (!(formData.phone && /^[1-9]\d{0,11}/.test(formData.phone))) {
    errMsg = 'Please enter 11 mobile phone numbers'
    return false
  }
  return true
}

function isCheckPassword() {
  if (!formData.password) {
    errMsg = 'Please enter password'
    return false
  }
  return true
}

function isCheckVerifyCode() {
  if (!formData.verifyCode) {
    errMsg = 'Please enter phone'
    return false
  }
  return true
}

function handleLogin() {
  if (!(isCheckPhone() && isCheckPassword() && isCheckVerifyCode())) {
    alert(errMsg)
    return false
  }
  btnDisable.value = true
  loginApi
    .login({
      password: formData.password,
      phone: formData.phone,
      verifyCode: formData.verifyCode,
    })
    .then((res) => {
      const dataMsg = res.data.msg
      if (dataMsg) {
        alert(dataMsg)
      } else {
        store.dispatch('login/getUserInfo', res.data)
        router.push('/home')
      }
    })
    .finally(() => {
      btnDisable.value = false
    })
}

function sendCode() {
  if (!isCheckPhone()) {
    alert(errMsg)
    return false
  }
  const timerID = setInterval(() => {
    if (sendFlag) {
      verifyCodeData.count--
      verifyCodeData.text = verifyCodeData.count + 's'
      if (verifyCodeData.count === 0) {
        verifyCodeData.count = 60
        verifyCodeData.text = 'Get code'
        sendFlag = false
        clearInterval(timerID)
      }
    } else {
      loginApi
        .sendVerifyCode({
          phone: formData.phone,
        })
        .then((res) => {
          const dataMsg = res.data.msg
          if (dataMsg) {
            alert(dataMsg)
          } else {
            alert(res.data.msgCode)
          }
        })
        .finally(() => {
          sendFlag = true
        })
    }
  }, 1000)
}
</script>

<style scoped>
@import 'index.css';
</style>
