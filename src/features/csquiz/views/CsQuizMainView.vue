<script setup>
import bookIcon from '@/assets/images/csquiz/book.svg'
import clipboardIcon from '@/assets/images/csquiz/clipboard.svg'
import clockIcon from '@/assets/images/csquiz/clock.svg'
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

    <!-- 카드 영역 (가로 정렬) -->
    <div class="card-list">
      <div class="info-card">
        <div class="card-label">예상 소요 시간:</div>
        <div class="card-content">
          <img class="icon" :src="clockIcon" alt="Countdown Clock" />
          <div class="value">10~20분</div>
        </div>
      </div>

      <div class="info-card">
        <div class="card-label">문제 수:</div>
        <div class="card-content">
          <img class="icon" :src="bookIcon" alt="Book Icon" />
          <div class="value">10문제</div>
        </div>
      </div>
    </div>

    <!-- 응시 버튼 -->
    <div class="start-button">응시하기</div>
  </div>
</template>


<style scoped>
.cs-quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 수직 중앙 정렬 */
  min-height: 100vh;        /* 전체 뷰포트 높이 확보 */
  padding: 40px 20px;
  gap: 32px;
  font-family: 'Pretendard', sans-serif;
  text-align: center;
}


/* 헤더 */
.quiz-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.icon-title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title {
  font-size: 28px;
  font-weight: 700;
}

.icon-large {
  width: 28px;
  height: 28px;
}

.subtitle {
  font-size: 14px;
  color: #333;
}

/* 카드 리스트 - 가로 배치 */
.card-list {
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
}

/* 개별 카드 */
.info-card {
  background-color: #e6f4ff;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 140px;
}

.card-label {
  font-size: 13px;
  font-weight: 500;
  color: #666;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  width: 18px;
  height: 18px;
}

.value {
  font-size: 15px;
  font-weight: 600;
}

/* 버튼 */
.start-button {
  background-color: #1c1c1c;
  color: white;
  border-radius: 12px;
  padding: 14px 36px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.start-button:hover {
  background-color: #B2B2B2;
}


</style>
