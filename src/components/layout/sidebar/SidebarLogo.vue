<template>
  <div class="sidebar-logo" @click="goHome">
    <img :src="logo" alt="DevPath 로고" class="logo-img" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logo from '@/assets/images/common/sidebar/logo.png'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.sidebar-logo {
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.logo-img {
  height: 32px;
  object-fit: contain;
}
</style>
