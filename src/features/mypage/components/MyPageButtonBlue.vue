<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = () => {
  router.push('/')
}
</script>

<template>
  <button class="button" @click="goTo">
    <span class="text">나의 개발자 MBTI</span>
  </button>
</template>

<style scoped>
.button {
  background-color: #E5ECF6;
  height: 102px;
  width: 170px;
  border-radius: 14.08px;
  padding: 13.2px;
  border-style: hidden;
  outline: none;
  cursor: pointer;
}

.text {
  color: #1c1c1c;
  text-align: center;
  vertical-align: text-top;
  font-size: 14px;
  line-height: 17.6px;
  border-style: hidden;
  outline: none;
  width: 149px;
  font-weight: 600;
}
</style>
