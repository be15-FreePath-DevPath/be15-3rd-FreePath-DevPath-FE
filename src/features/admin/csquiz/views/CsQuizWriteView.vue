<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import CsQuizForm from '@/features/admin/csquiz/components/CsQuizForm.vue'
import { createAdminCsQuiz } from '@/features/admin/csquiz/api.js'

const newBreadCrumbItems = ref(['관리자페이지', 'CS 퀴즈 목록', 'CS 퀴즈 등록'])
const emit = defineEmits(['updateBreadCrumb'])

const router = useRouter()
const toast = useToast()

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
})

const quizForm = ref({
  question: '',
  options: ['', '', '', ''],
  answer: '',
  explanation: ''
})

const isValid = computed(() => {
  const ans = Number(quizForm.value.answer)
  return (
      quizForm.value.question.trim() !== '' &&
      quizForm.value.explanation.trim() !== '' &&
      !isNaN(ans) && ans >= 1 && ans <= 4 &&
      quizForm.value.options.every(opt => opt.trim() !== '')
  )
})

const goToList = () => {
  router.push('/admin?tab=quiz')
}

const handleSubmit = async () => {
  const payload = {
    csquizContents: quizForm.value.question,
    csquizAnswer: Number(quizForm.value.answer),
    csquizExplanation: quizForm.value.explanation,
    isCsquizSubmitted: 'N',
    options: quizForm.value.options.map((content, idx) => ({
      optionNo: idx + 1,
      optionContents: content
    }))
  }

  try {
    await createAdminCsQuiz(payload)
    toast.success('퀴즈가 등록되었습니다.', { position: 'top-center' })
    goToList()
  } catch (e) {
    console.error('퀴즈 등록 실패', e)
    toast.error('퀴즈 등록 중 오류가 발생했습니다.', { position: 'top-center' })
  }
}
</script>

<template>
  <div class="create-wrapper">
    <h1 class="page-title">CS 퀴즈 등록</h1>
    <CsQuizForm
        v-model="quizForm"
        :isReadOnly="false"
        @invalidAnswer="toast.warning('정답 번호는 1부터 4 사이여야 합니다.', { position: 'top-center' })"
    />
    <div class="button-area">
      <button @click="goToList">CS 퀴즈 목록</button>
      <button :disabled="!isValid" @click="handleSubmit">퀴즈 등록</button>
    </div>
  </div>
</template>

<style scoped>
.create-wrapper {
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
