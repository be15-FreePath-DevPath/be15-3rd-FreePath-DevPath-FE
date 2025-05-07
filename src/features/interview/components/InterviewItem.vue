<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  interview: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const handleClick = () => {
  router.push(`/interview/${props.interview.interviewRoomId}`)
}

const formattedDate = computed(() => {
  const raw = props.interview.interviewRoomCreatedAt
  if (!raw) return '날짜 없음'
  const date = new Date(raw)
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const scoreColor = computed(() => {
  const score = props.interview.averageScore
  if (score === null || score === undefined) return 'gray'
  if (score < 40) return 'rgba(0, 0, 0, 0.4)'
  if (score <= 60) return '#8A8CD9'
  if (score <= 80) return '#59A8D4'
  return '#4AA785'
})

const summaryText = computed(() => {
  const raw = props.interview.summary
  if (!raw) return '총평 없음'
  const clean = raw.replace(/^\[총평\]/, '').trim()
  return clean.length > 15 ? clean.slice(0, 50) + '...' : clean
})
</script>

<template>
  <div class="interview-item" @click="handleClick">
    <div class="title-column">
      <div class="interview-title">
        <div class="interview-title-text">{{ interview.interviewRoomTitle }}</div>
        <p class="summary">{{ summaryText }}</p>
      </div>
    </div>

    <div class="type-column">
      <div class="topic-content">
        <div class="category"># {{ interview.interviewCategory }}</div>
      </div>
    </div>

    <div class="date-column">
      <div class="calendar-content">
        <div class="calendar-icon-text">
          <div class="calendar-icon">
            <img src="@/assets/images/interview/calendar-blank.png" alt="calendar" />
          </div>
          <div class="calendar-text">
            <div class="date">{{ formattedDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="score-column">
      <div class="score-content">
        <div class="score-badge">
          <div class="score" :style="{ color: scoreColor }">
            {{ interview.averageScore ?? '-' }}점
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interview-item {
  display: flex;
  width: var(--interview-width);
  height: 60px;
  align-items: center;
  border-bottom: 1px solid rgba(28, 28, 28, 0.05);
  box-sizing: border-box;
  gap: 0;
}
.interview-item:hover {
  background-color: #f0f2f5;
}

.title-column {
  width: var(--column-title);
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  gap: 3px;
}
.interview-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.type-column {
  width: var(--column-type);
  display: flex;
  align-items: center;
  padding: 12px 8px;
}

.date-column {
  width: var(--column-date);
  display: flex;
  align-items: center;
  padding: 12px 8px;
}

.calendar-icon-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-column {
  width: var(--column-score);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 8px;
}

/* === 텍스트 스타일 === */
.interview-title-text {
  font-family: "Inter", sans-serif;
  font-weight: 600; /* SemiBold */
  font-size: 14px;
  color: rgba(28, 28, 28, 1);
}

.summary {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.2);
  margin: 0;
}

.category,
.date {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: rgba(28, 28, 28, 1);
}

.score {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  white-space: nowrap;
}


</style>
