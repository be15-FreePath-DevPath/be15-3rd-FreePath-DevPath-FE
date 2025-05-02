<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import CsQuizCard from '@/features/csquiz/components/CsQuizCard.vue'
import LayoutDefault from '@/components/layout/LayoutDefault.vue'

const router = useRouter()

const quizList = ref(
    Array.from({length: 10}, (_, i) => ({
      id: i + 1,
      question: `질문 ${i + 1}`,
      options: ['선택지 1', '선택지 2', '선택지 3', '선택지 4']
    }))
)

const selectedOptions = ref(Array(quizList.value.length).fill(null))

function selectOption(quizIndex, optionIndex) {
  selectedOptions.value[quizIndex] = optionIndex
}

function buildAnswerPayload() {
  return quizList.value.map((quiz, index) => ({
    csquizId: quiz.id,
    userAnswer: selectedOptions.value[index] + 1
  }))
}

function submitAnswers() {
  const unansweredIndices = selectedOptions.value
      .map((v, i) => (v === null ? i + 1 : null))
      .filter(v => v !== null)

  if (unansweredIndices.length > 0) {
    alert(`${unansweredIndices.join(', ')}번 문항이 선택되지 않았습니다.`)
    return
  }

  const answers = buildAnswerPayload()
  console.log('사용자 응답:', answers)

  localStorage.setItem('csquizSubmitted', 'true')

  const confirmed = confirm('답안이 성공적으로 제출되었습니다.\n결과 화면으로 이동하시겠습니까?')
  router.push(confirmed ? '/csquiz/result' : '/csquiz')
}
</script>

<template>
  <layout-default>
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
  </layout-default>
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
