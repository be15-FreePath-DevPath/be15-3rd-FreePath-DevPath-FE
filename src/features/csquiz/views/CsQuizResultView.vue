<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { getUserCsQuizResult } from '@/features/csquiz/api.js'

const toast = useToast()
const newBreadCrumbItems = ref(['CS 퀴즈', 'CS 퀴즈 결과'])
const emit = defineEmits(['updateBreadCrumb'])
const router = useRouter()

const results = ref([])

onMounted(async () => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)

  try {
    const res = await getUserCsQuizResult()
    const data = res.data

    if (!data || data.length === 0) {
      toast.warning('아직 응시한 퀴즈가 없습니다.', { position: 'top-center' })
      return router.push('/csquiz')
    }

    results.value = data.map(item => ({
      question: item.csquizContents,
      options: item.options.map(opt => opt.optionContents),
      correctAnswer: item.csquizAnswer - 1,
      userAnswer: item.userAnswer - 1,
      explanation: item.csquizExplanation,
      isCorrect: item.isCsquizCorrect === 'Y'
    }))
  } catch (e) {
    console.error('결과 조회 실패:', e)
    toast.error('결과 데이터를 불러오지 못했습니다.', { position: 'top-center' })
  }
})

const score = computed(() => results.value.filter(r => r.isCorrect).length)
const total = computed(() => results.value.length)

const goToMain = () => router.push('/csquiz')
</script>


<template>
  <div class="result-page">
    <div class="result-summary">
      <div class="icon-title">
        <span class="check-icon">✅</span>
        <h2 class="summary-title">점수 및 해설</h2>
      </div>
      <p class="summary-score">맞은 개수 {{ score }}개 / 총 {{ total }} 문제</p>
      <p class="summary-percent">정답률: {{ Math.round((score / total) * 100) }}%</p>
    </div>

    <div v-for="(result, index) in results" :key="index" class="quiz-result-card">
      <div class="question-header">
        <span class="mark">{{ result.isCorrect ? '✔️' : '❌' }}</span>
        <span class="question-text">{{ index + 1 }}. {{ result.question }}</span>
      </div>

      <p class="correct-answer">정답: {{ result.correctAnswer + 1 }}</p>

      <ul class="option-list">
        <li
            v-for="(option, optIdx) in result.options"
            :key="optIdx"
            :class="[
            'option-item',
            {
              'is-selected': optIdx === result.userAnswer,
              'is-wrong': optIdx === result.userAnswer && !result.isCorrect
            }
          ]"
        >
          {{ optIdx + 1 }}. {{ option }}
        </li>
      </ul>

      <p class="explanation-box">해설: {{ result.explanation }}</p>
    </div>

    <div class="result-footer">
      <p class="footer-text">수고하셨습니다👏</p>
      <div class="button-wrapper">
        <button class="go-main-button" @click="goToMain">메인으로 돌아가기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-page {
  max-width: 1000px;
  margin: 60px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.result-summary {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.icon-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.check-icon {
  font-size: 42px;
}

.summary-title {
  font-size: 40px;
  font-weight: 700;
  color: #1c1c1c;
}

.summary-score,
.summary-percent {
  font-size: 24px;
  font-weight: 500;
}

.quiz-result-card {
  background: #f7f9fb;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
}

.mark {
  font-size: 20px;
}

.correct-answer {
  font-weight: 700;
  margin: 4px 0;
  text-align: right;
}

.option-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-item {
  background: transparent;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
}

.option-item.is-selected {
  background-color: #eaeaea;
}

.option-item.is-wrong {
  background-color: rgba(255, 128, 128, 0.2);
}

.explanation-box {
  background: #fff8d6;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
}

.result-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
}

.footer-text {
  font-size: 20px;
  font-weight: 300;
  text-align: center;
}

.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.go-main-button {
  background: #1c1c1c;
  color: white;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 24px;
  cursor: pointer;
}
</style>
