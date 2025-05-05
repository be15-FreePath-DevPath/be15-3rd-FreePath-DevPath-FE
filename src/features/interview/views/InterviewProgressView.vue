<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchNextQuestion } from '@/features/interview/api.js'

const route = useRoute()
const router = useRouter()
const interviewId = Number(route.params.id)

// query로 받은 값
const interviewTitle = ref(route.query.title || '')
const category = ref(route.query.category || '')
const strictness = ref(route.query.strictness || '')
const difficulty = ref(route.query.difficulty || '')
const firstQuestion = ref(route.query.firstQuestion || '')

// 하나로 묶은 interviewData (구조 1)
const interviewData = ref({
  interviewRoomTitle: interviewTitle.value,
  interviewCategory: category.value,
  difficultyLevel: difficulty.value,
  evaluationStrictness: strictness.value,
})

// 상태값
const currentIndex = ref(1)
const currentQuestion = ref(firstQuestion.value)
const userAnswer = ref('')
const gptEvaluation = ref('')
const isFinalQuestion = ref(false)

// 다음 질문 요청
const handleNext = async () => {
  const interviewIndex = currentIndex.value;

  // 질문 3이면 → 미리 마지막 질문으로 판단
  if (interviewIndex === 3) {
    isFinalQuestion.value = true;
  }

  const { data: nextData } = await fetchNextQuestion(
      interviewId,
      interviewIndex,
      userAnswer.value
  );

  gptEvaluation.value = nextData.gptEvaluation;
  userAnswer.value = '';

  if (nextData.isLast) {
    isFinalQuestion.value = true
  } else {
    currentIndex.value++
    currentQuestion.value = nextData.nextQuestion
  }
};

// 마지막 제출
const handleSubmit = () => {
  router.push(`/interview/${interviewId}`)
}
</script>

<template>
  <div class="interview-progress">
    <div class="room-summary">
      <div class="info-text">{{ interviewData.interviewRoomTitle }}</div>
      <div class="summary-line">
        <div>{{ interviewData.interviewCategory }}</div>
        <div>|</div>
        <div>난이도 : {{ interviewData.difficultyLevel.toUpperCase() }}</div>
        <div>|</div>
        <div>평가 : {{ interviewData.evaluationStrictness }}</div>
      </div>
    </div>

    <div class="question-box">
      <div class="question-number">[ 질문 {{ currentIndex }} ]</div>
      <div class="question-text">{{ currentQuestion }}</div>
    </div>

    <textarea class="answer-input" v-model="userAnswer" placeholder="여기에 답변을 입력하세요..."></textarea>

    <div class="button-section">
      <button v-if="!isFinalQuestion" class="next-button" @click="handleNext">다음 질문</button>
      <button v-else class="submit-button" @click="handleSubmit">제출하기</button>
    </div>

  </div>
</template>

<style scoped>
.interview-progress {
  width: 800px;
  margin: 40px auto;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.room-summary {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #555;
  font-size: 14px;
}

.summary-line {
  display: flex;
  gap: 10px;
}

.question-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.question-number {
  font-weight: bold;
  font-size: 14px;
}

.question-text {
  font-size: 16px;
}

.answer-input {
  height: 200px;
  padding: 20px;
  border: 1px solid #ccc;
  font-size: 14px;
  border-radius: 8px;
  resize: none;
}

.button-section {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}

.next-button,
.submit-button {
  width: 200px;
  padding: 14px;
  background-color: #f7f9fb;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  cursor: pointer;
}

.evaluation-box {
  background-color: #f9f9f9;
  padding: 20px;
  border-left: 4px solid #4a90e2;
  border-radius: 8px;
}

.evaluation-label {
  font-weight: bold;
  margin-bottom: 8px;
}

.evaluation-content {
  white-space: pre-wrap;
  font-size: 13px;
  color: #333;
}
</style>
