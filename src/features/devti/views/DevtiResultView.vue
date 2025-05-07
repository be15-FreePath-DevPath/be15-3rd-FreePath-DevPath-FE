<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DevtiResultSection from '@/features/devti/components/DevtiResultSection.vue'
import { fetchDevtiResult } from '@/features/devti/api.js'

const router = useRouter()
const resultType = ref('')

onMounted(async () => {
  try {
    const { data } = await fetchDevtiResult();
    const devti = data?.data?.developerPersonality;

    if (!devti) {
      alert('아직 저장된 DevTI 결과가 없습니다. 테스트를 먼저 진행해주세요.');
      await router.push('/mypage/devti/solve');
    } else {
      resultType.value = devti;
    }
  } catch (err) {
    console.error('DevTI 결과 조회 실패:', err);
    alert('결과를 불러오는 데 문제가 발생했습니다.');
    await router.push('/mypage/devti/solve');
  }
})
</script>

<template>
  <DevtiResultSection v-if="resultType" :result-type="resultType" />
</template>
