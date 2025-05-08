<template>
  <div class="interview-progress">
    <!-- 면접실 요약 정보 -->
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

    <!-- 현재 질문 표시 영역 -->
    <div class="question-box">
      <div class="question-number">[ 질문 {{ currentIndex + 1 }} ]</div>
      <div class="question-text">{{ currentQuestion }}</div>
    </div>

    <!-- 사용자 답변 입력창 -->
    <textarea
        class="answer-input"
        v-model="userAnswer"
        placeholder="여기에 답변을 입력하세요..."
    />

    <!-- 다음 질문 / 면접 종료 버튼 -->
    <div class="button-section">
      <!-- currentIndex 0,1 일 때만 다음 / 2일 땐 바로 제출 -->
      <button
          v-if="currentIndex < 2"
          class="next-button"
          @click="handleNext"
      >다음 질문</button>
      <button
          v-else
          class="submit-button"
          @click="handleSubmit"
      >면접 종료</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchNextQuestion } from '@/features/interview/api.js'

// 라우터 및 스토어 초기화
const route = useRoute()
const router = useRouter()
const emit = defineEmits(['updateBreadCrumb'])
const newBreadCrumbItems = ref(['모의 면접', '모의 면접 실행'])
const interviewId = Number(route.params.id)

// URL 쿼리 파라미터 읽기
const title = route.query.title || ''
const rawQuestions = route.query.questions
const firstQ = route.query.firstQuestion || ''
const category = route.query.category || ''
const difficulty = route.query.difficulty || ''
const strictness = route.query.strictness || ''

// 재실행 모드 판단
const isStaticMode = computed(() => !!rawQuestions)

// 질문 리스트 초기화
const questions = ref([])
if (isStaticMode.value && rawQuestions) {
  try {
    questions.value = JSON.parse(rawQuestions)
  } catch {
    questions.value = []
  }
} else if (firstQ) {
  questions.value = [firstQ]
}

// 현재 질문 번호 및 내용 계산
const currentIndex = ref(0)
const currentQuestion = computed(() => questions.value[currentIndex.value] || '')

// 사용자 답변 및 최종 여부
const userAnswer = ref('')

// 면접실 메타데이터 객체 생성
const interviewData = computed(() => ({
  interviewRoomTitle:   title,
  interviewCategory:    category,
  difficultyLevel:      difficulty,
  evaluationStrictness: strictness,
}))

// 다음 질문 처리 함수
const handleNext = async () => {
  if (!userAnswer.value.trim()) {
    return alert('답변을 입력해주세요.')
  }

  const idx    = currentIndex.value
  const answer = userAnswer.value

  // 단 한 번만 API 호출 → save + 다음 질문 반환
  const resp = await fetchNextQuestion(interviewId, idx + 1, answer)
  const next = resp.data.data.nextQuestion

  // 동적 모드에서만 questions에 push
  if (!isStaticMode.value && next) {
    questions.value.push(next)
  }

  // 입력 초기화
  userAnswer.value = ''

  // 인덱스 증가 or 종료 플래그
  if (idx < 2) {
    currentIndex.value = idx + 1
  }
}


// 면접 종료 처리 함수
const handleSubmit = async () => {
  // 마지막 답변 저장
  await fetchNextQuestion(interviewId, currentIndex.value + 1, userAnswer.value)
  // 면접 상세 페이지로 이동
  router.push(`/interview/${interviewId}`)
}

// 컴포넌트 마운트 시 크럼 업데이트
onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
})
</script>

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
</style>
