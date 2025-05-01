<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const results = ref([
  {
    question: '객체지향 프로그래밍의 4대 특징 중 하나가 아닌 것은?',
    options: ['상속', '다형성', '병렬성', '캡슐화'],
    correctAnswer: 2,
    userAnswer: 3,
    explanation: '객체지향의 4대 특징은 상속, 캡슐화, 다형성, 추상화입니다.'
  },
  {
    question: 'Spring Framework에서 의존성 주입의 주된 목적은 무엇인가요?',
    options: [
      '객체의 재사용성을 높이기 위해',
      '모든 객체를 자동으로 생성하기 위해',
      '객체 간 결합도를 낮추고 유연하고 테스트하기 쉬운 구조를 만들기 위해',
      'JVM의 성능을 향상시키기 위해'
    ],
    correctAnswer: 2,
    userAnswer: 2,
    explanation: '의존성 주입은 객체 간 결합도를 낮추고 테스트하기 쉬운 구조를 만들기 위한 설계 원칙입니다.'
  },
  {
    question: '자바에서 기본 자료형이 아닌 것은?',
    options: ['int', 'Integer', 'double', 'char'],
    correctAnswer: 1,
    userAnswer: 1,
    explanation: 'Integer는 객체형이므로 기본 자료형이 아닙니다.'
  }
])

const score = results.value.filter(r => r.correctAnswer === r.userAnswer).length
const total = results.value.length

const goToMain = () => router.push('/csquiz')
</script>

<template>
  <div class="result-page">
    <!-- 상단 요약 -->
    <div class="result-summary">
      <div class="icon-title">
        <span class="check-icon">✅</span>
        <h2 class="summary-title">점수 및 해설</h2>
      </div>
      <p class="summary-score">맞은 개수 {{ score }}개 / 총 {{ total }} 문제</p>
      <p class="summary-percent">정답률: {{ Math.round((score / total) * 100) }}%</p>
    </div>

    <!-- 문제 카드 반복 -->
    <div
        v-for="(result, index) in results"
        :key="index"
        class="quiz-result-card"
    >
      <div class="question-header">
        <span class="mark">{{ result.userAnswer === result.correctAnswer ? '✔️' : '❌' }}</span>
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
              'is-wrong': optIdx === result.userAnswer && result.userAnswer !== result.correctAnswer
            }
          ]"
        >
          {{ optIdx + 1 }}. {{ option }}
        </li>
      </ul>

      <p class="explanation-box">해설: {{ result.explanation }}</p>
    </div>

    <!-- 수고 및 돌아가기 -->
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
