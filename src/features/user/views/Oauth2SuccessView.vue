<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import {onMounted, ref} from 'vue'

const newBreadCrumbItems = ref(['로그인', '구글 로그인']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
})

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const accessToken = route.query.accessToken

  if (accessToken) {
    authStore.setAuth(accessToken)

    // ✅ 비동기로 기다려주면 깔끔하게 이동됨
    await router.replace('/')
  } else {
    console.error('OAuth2 로그인 실패: 토큰 없음')
    await router.replace('/user/login')
  }
})
</script>

<template>
  <div>로그인 처리 중입니다...</div>
</template>
