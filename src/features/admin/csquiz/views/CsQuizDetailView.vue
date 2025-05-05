<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep, isEqual } from 'lodash'
import { useToast } from 'vue-toastification'

import { getAdminCsQuiz, updateAdminCsQuiz } from '@/features/admin/csquiz/api.js'
import CsQuizForm from '@/features/admin/csquiz/components/CsQuizForm.vue'

const emit = defineEmits(['updateBreadCrumb'])
const newBreadCrumbItems = ref(['관리자페이지', 'CS 퀴즈 목록', 'CS 퀴즈 상세 조회'])

const route = useRoute()
const router = useRouter()
const toast = useToast()

const quizId = route.params.csquizId
const originalQuiz = ref(null)
const currentQuiz = ref(null)
const isModified = ref(false)
const isLoading = ref(true)

const validateAnswerRange = () => {
  const ans = Number(currentQuiz.value?.answer)
  if (isNaN(ans) || ans < 1 || ans > 4) {
    toast.warning('정답 번호는 1부터 4 사이여야 합니다.', { position: 'top-center' })
    currentQuiz.value.answer = ''
  }
}

const fetchQuiz = async () => {
  try {
    const res = await getAdminCsQuiz(quizId)
    const data = res.data

    const formatted = {
      id: data.csquizId.toString(),
      question: data.csquizContents,
      explanation: data.csquizExplanation,
      answer: data.csquizAnswer.toString(),
      options: data.options.map(o => o.optionContents)
    }

    originalQuiz.value = cloneDeep(formatted)
    currentQuiz.value = cloneDeep(formatted)
  } catch (e) {
    const errorCode = e.response?.data?.errorCode
    if (errorCode === '40001') {
      toast.error('존재하지 않는 퀴즈입니다.', { position: 'top-center' })
      await router.push('/admin?tab=quiz')
    } else {
      console.error('퀴즈 단건 조회 실패', e)
      toast.error('퀴즈 데이터를 불러오는 데 실패했습니다.', { position: 'top-center' })
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
  fetchQuiz()
})

watch(currentQuiz, (newVal) => {
  isModified.value = !isEqual(newVal, originalQuiz.value)
}, { deep: true })

const isValid = computed(() => {
  const ans = Number(currentQuiz.value?.answer)
  return (
      currentQuiz.value?.question.trim() !== '' &&
      currentQuiz.value?.explanation.trim() !== '' &&
      !isNaN(ans) && ans >= 1 && ans <= 4 &&
      currentQuiz.value?.options.every(opt => opt.trim() !== '')
  )
})

const goToList = () => {
  router.push('/admin?tab=quiz')
}

const handleUpdate = async () => {
  const ans = Number(currentQuiz.value?.answer)

  if (isNaN(ans) || ans < 1 || ans > 4) {
    toast.warning('정답 번호는 1부터 4 사이여야 합니다.', { position: 'top-center' })
    return
  }

  try {
    const payload = {
      csquizId: Number(quizId),
      csquizContents: currentQuiz.value.question,
      csquizAnswer: ans,
      csquizExplanation: currentQuiz.value.explanation,
      isCsquizSubmitted: 'N',
      options: currentQuiz.value.options.map((content, idx) => ({
        optionNo: idx + 1,
        optionContents: content
      }))
    }

    await updateAdminCsQuiz(quizId, payload)
    toast.success('수정 완료되었습니다.', { position: 'top-center' })
    originalQuiz.value = cloneDeep(currentQuiz.value)
    isModified.value = false
  } catch (e) {
    console.error('퀴즈 수정 실패', e)
    toast.error('수정 중 오류가 발생했습니다.', { position: 'top-center' })
  }
}
</script>

<template>
  <div class="detail-wrapper">
    <h1 class="page-title">CS 퀴즈 상세 조회</h1>

    <div v-if="isLoading">Loading...</div>
    <template v-else>
      <CsQuizForm
          v-model="currentQuiz"
          :isReadOnly="false"
          @invalidAnswer="toast.warning('정답 번호는 1부터 4 사이여야 합니다.', { position: 'top-center' })"
      />


      <div class="button-area">
        <button @click="goToList">CS 퀴즈 목록</button>
        <button :disabled="!isModified || !isValid" @click="handleUpdate">
          CS 퀴즈 수정
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail-wrapper {
  width: 1116px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
}

.button-area {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.button-area button {
  width: 130px;
  height: 56px;
  background-color: #e9e9e9;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button-area button:disabled {
  background-color: #cccccc;
  color: #666;
  cursor: not-allowed;
}

.button-area button:hover:enabled {
  background-color: #1c1c1c;
  color: white;
}
</style>