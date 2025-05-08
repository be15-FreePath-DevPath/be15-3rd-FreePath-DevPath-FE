<script setup>
import {onMounted, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchNextQuestion } from '@/features/interview/api.js'

const route = useRoute()
const router = useRouter()
const interviewId = Number(route.params.id)

const newBreadCrumbItems = ref(['모의 면접', '모의 면접 실행']);
const emit = defineEmits(['updateBreadCrumb']);

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

  try {
    const response = await fetchNextQuestion(interviewId, interviewIndex, userAnswer.value);
    const nextData = response.data.data;

    gptEvaluation.value = nextData.gptEvaluation;
    userAnswer.value = '';

    // 먼저 질문 바꾸고
    if (nextData.nextQuestion) {
      currentIndex.value++;
      currentQuestion.value = nextData.nextQuestion;
    }

    // 그 후 종료 조건 판단
    if (!nextData.nextQuestion || currentIndex.value >= 3) {
      isFinalQuestion.value = true;
    }

  } catch (err) {
    console.error('다음 질문 불러오기 실패:', err);
    alert('다음 질문을 불러오는 데 실패했습니다.');
    isFinalQuestion.value = true;
  }
};


// 마지막 제출
const handleSubmit = async () => {
  try {
    console.log('마지막 요청 전송:', {
      interviewRoomId: interviewId,
      interviewIndex: currentIndex.value,
      userAnswer: userAnswer.value
    });

    // 마지막 답변 저장
    await fetchNextQuestion(
        interviewId,
        currentIndex.value,
        userAnswer.value
    );

    router.push(`/interview/${interviewId}`);
  } catch (err) {
    console.error('면접 종료 실패:', err);
    alert('마지막 답변을 저장하는 데 실패했습니다.');
  }
};

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
})

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
      <button v-else class="submit-button" @click="handleSubmit">면접 종료</button>
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
