<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchDevtiResult } from '@/features/devti/api.js'
import DevtiResultSection from '@/features/devti/components/DevtiResultSection.vue'

const router = useRouter()
const resultType = ref('')

onMounted(async () => {
  try {
    const res = await fetchDevtiResult()
    const devti = res.data.data?.developerPersonality

    if (!devti) {
      alert('아직 DevTI 결과가 없습니다. 먼저 테스트를 진행해주세요.')
      router.push('/mypage/devti/solve')
    } else {
      resultType.value = devti
    }
  } catch (err) {
    alert('결과를 불러오는 데 실패했습니다.')
    console.error(err)
    router.push('/mypage/devti/solve')
  }
})
</script>

<template>
  <DevtiResultSection v-if="resultType" :result-type="resultType" />
</template>
