<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CsQuizForm from '@/features/admin/csquiz/components/CsQuizForm.vue'

const router = useRouter()

const quizForm = ref({
  question: '',
  options: ['', '', '', ''],
  answer: '',
  explanation: ''
})

const isValid = computed(() => {
  return (
      quizForm.value.question.trim() !== '' &&
      quizForm.value.explanation.trim() !== '' &&
      quizForm.value.answer !== '' &&
      quizForm.value.options.every(opt => opt.trim() !== '')
  )
})

const goToList = () => {
  router.push('/admin')
}

const handleSubmit = () => {
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
  console.log('전송될 데이터:', payload) // 추후 axios.post
  alert('퀴즈가 등록되었습니다.')
  goToList()
}
</script>

<template>
  <div class="create-wrapper">
    <h1 class="page-title">CS 퀴즈 등록</h1>
    <CsQuizForm v-model="quizForm" :isReadOnly="false" />
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
