<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getWeeklyCsQuiz, submitWeeklyCsQuiz, getUserCsQuizResult } from '@/features/csquiz/api.js'
import CsQuizCard from '@/features/csquiz/components/CsQuizCard.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const emit = defineEmits(['updateBreadCrumb'])
const newBreadCrumbItems = ref(['CS 퀴즈', 'CS 퀴즈 응시'])
const router = useRouter()

const quizList = ref([])
const selectedOptions = ref([])

onMounted(async () => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)

  try {
    const resultRes = await getUserCsQuizResult()
    if (resultRes.data && resultRes.data.length === 10) {
      toast.info('이미 응시한 퀴즈입니다.', { position: 'top-center' })
      return router.push('/csquiz/result')
    }
  } catch (e) {
    console.warn('이전 응답 없음 → 신규 응시자로 판단')
  }

  try {
    const res = await getWeeklyCsQuiz()
    quizList.value = res.data.data.map(q => ({
      id: q.csquizId,
      question: q.csquizContents,
      options: q.options.map((opt, i) => `${i + 1}. ${opt.optionContents}`)
    }))
    selectedOptions.value = Array(quizList.value.length).fill(null)
  } catch (e) {
    console.error('퀴즈 불러오기 실패', e)
    toast.error('퀴즈 데이터를 불러오는 데 실패했습니다.', { position: 'top-center' })
  }
})

function selectOption(quizIndex, optionIndex) {
  selectedOptions.value[quizIndex] = optionIndex
}

function buildAnswerPayload() {
  return quizList.value.map((quiz, index) => ({
    csquizId: quiz.id,
    userAnswer: selectedOptions.value[index] + 1
  }))
}

async function submitAnswers() {
  const unanswered = selectedOptions.value
      .map((v, i) => (v === null ? i + 1 : null))
      .filter(v => v !== null)

  if (unanswered.length > 0) {
    toast.warning(`${unanswered.join(', ')}번 문항이 선택되지 않았습니다.`, { position: 'top-center' })
    return
  }

  const payload = buildAnswerPayload()

  try {
    await submitWeeklyCsQuiz(payload)
    toast.success('답안 제출 완료!', { position: 'top-center' })
    localStorage.setItem('csquizSubmitted', 'true')
    router.push('/csquiz/result')
  } catch (e) {
    console.error('제출 실패', e)
    toast.error('답안 제출 중 오류가 발생했습니다.', { position: 'top-center' })
  }
}
</script>


<template>
  <div class="quiz-wrapper">
    <CsQuizCard
        v-for="(quiz, index) in quizList"
        :key="quiz.id"
        :quiz="quiz"
        :index="index"
        :selectedOption="selectedOptions[index]"
        @select="selectOption(index, $event)"
    />

    <div class="submit-wrapper">
      <div class="submit-button" @click="submitAnswers">답안 제출</div>
    </div>
  </div>
</template>

<style scoped>
.quiz-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.submit-wrapper {
  width: 1000px;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.submit-button {
  background: #1c1c1c;
  color: white;
  font-weight: 600;
  font-size: 18px;
  padding: 16px 32px;
  border-radius: 16px;
  cursor: pointer;
}
</style>
