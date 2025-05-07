<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchDevtiResult } from '@/features/devti/api.js'
import DevtiResultSection from '@/features/devti/components/DevtiResultSection.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const route = useRoute()
const resultType = ref('')
const auth = useAuthStore()

onMounted(async () => {
  try {
    // 비회원 처리 : 공유된 링크로 접속해서 주소가 쿼리
    if (route.query.type) {
      resultType.value = route.query.type.toString().toUpperCase()
      return
    }

    // 로그인 상태일 경우 서버에 저장된 devti 결과 불러오기
    if (auth.isAuthenticated) {
      const res = await fetchDevtiResult()
      const devti = res.data.data?.developerPersonality

      if (!devti) {
        alert('아직 DevTI 결과가 없습니다. 먼저 테스트를 진행해주세요.')
        await router.push('/mypage/devti/solve')
      } else {
        resultType.value = devti
      }
    } else {
      // 비회원인데 쿼리도 없음
      alert('결과를 확인하려면 로그인하거나 공유 링크로 접속해야 합니다.')
      await router.push('/mypage/devti/solve')
    }
  } catch (err) {
    alert('결과를 불러오는 데 실패했습니다.')
    console.error(err)
    await router.push('/mypage/devti/solve')
  }
})
</script>

<template>
  <DevtiResultSection v-if="resultType" :result-type="resultType" />
</template>
