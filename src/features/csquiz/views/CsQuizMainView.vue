<script setup>
import { useRouter } from 'vue-router'
import bookIcon from '@/assets/images/csquiz/book.svg'
import clipboardIcon from '@/assets/images/csquiz/clipboard.svg'
import clockIcon from '@/assets/images/csquiz/clock.svg'

const router = useRouter()

// ✅ localStorage를 이용한 임시 저장 확인 (추후 API로 대체 가능)
function goToQuizPage() {
  const submitted = localStorage.getItem('csquizSubmitted') === 'false'

  if (submitted) {
    alert('이미 답변이 저장되어있습니다.')
    router.push('/csquiz/result')
  } else {
    router.push('/csquiz/take')
  }
}
</script>

<template>
  <div class="cs-quiz-container">
    <!-- 상단 타이틀 -->
    <div class="quiz-header">
      <div class="icon-title-wrapper">
        <img class="icon-large" :src="clipboardIcon" alt="Clipboard Icon" />
        <div class="title">CS QUIZ</div>
      </div>
      <div class="subtitle">핵심 개념을 빠르게 점검하고 실전 감각까지!</div>
    </div>

    <!-- 카드 영역 -->
    <div class="card-list">
      <div class="info-card">
        <div class="card-label">문제 수:</div>
        <div class="card-content">
          <img class="icon" :src="bookIcon" alt="Book Icon" />
          <div class="value">10문제</div>
        </div>
      </div>

      <div class="info-card">
        <div class="card-label">예상 소요 시간:</div>
        <div class="card-content">
          <img class="icon" :src="clockIcon" alt="Countdown Clock" />
          <div class="value">10~20분</div>
        </div>
      </div>
    </div>

    <!-- 응시 버튼 -->
    <div class="start-button" @click="goToQuizPage">응시하기</div>
  </div>
</template>

<style scoped>
.cs-quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 516px;
  padding: 48px 32px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  font-family: 'Pretendard', sans-serif;
  text-align: center;
  gap: 48px;
  margin: 80px auto;
}

.quiz-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.icon-title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  font-size: 80px;
  font-weight: 800;
}

.icon-large {
  width: 89px;
  height: 84px;
}

.subtitle {
  font-size: 25px;
  font-weight: 800;
  margin-top: 20px;
}

.card-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 56px;
  margin-bottom: 30px;
  margin-top: 160px;
}

.info-card {
  background-color: #e6f4ff;
  border-radius: 16px;
  width: 230px;
  height: 121px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.card-label {
  font-size: 18px;
  font-weight: 500;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 24px;
  height: 24px;
}

.value {
  font-size: 25px;
  font-weight: 600;
}

.start-button {
  background-color: #1c1c1c;
  color: white;
  border-radius: 24px;
  font-size: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 516px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.start-button:hover {
  background-color: #B2B2B2;
  color: #1c1c1c;
}
</style>
