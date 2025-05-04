<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  general: {
    type: String,
    default: '일반 회원가입'
  },
  google: {
    type: String,
    default: '구글 회원가입'
  },
  generalUrl: {
    type: String,
    default: '/user/signup/general'
  },
  googleUrl: {
    type: String,
    default: '/user/signup/google'
  }
})

const router = useRouter()

function goTo(url) {
  router.push(url)
}
</script>

<template>
  <div class="button" @click="goTo(props.generalUrl)">
    <img src="@/assets/images/user/general.png" alt="general" class="icon" />
    <span>{{ props.general }}</span>
  </div>
  <div class="button" @click="goTo(props.googleUrl)">
    <img src="@/assets/images/user/google.png" alt="google" class="icon" />
    <span>{{ props.google }}</span>
  </div>
</template>

<style scoped>
.button {
  background-color: #ffffff;
  width: 194.64px;
  border-radius: 15.78px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 8.27px;
  position: relative;
  cursor: pointer;
}
</style>
