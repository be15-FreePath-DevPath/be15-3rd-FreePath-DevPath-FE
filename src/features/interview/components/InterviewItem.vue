<script setup>
const props = defineProps({
  interview: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="interview-item">
    <div class="title-column">
      <div class="interview-title">
        <div class="text-wrapper">{{ interview.title }}</div>
        <p class="summary">{{ interview.summary }}</p>
      </div>
    </div>

    <div class="type-column">
      <div class="topic-content">
        <div class="text-wrapper"># {{ interview.topic }}</div>
      </div>
    </div>

    <div class="date-column">
      <div class="calendar-content">
        <div class="calendar-icon-text">
          <div class="calendar-icon">
            <img src="@/assets/images/interview/calendar-blank.png" alt="calendar" />
          </div>
          <div class="calendar-text">
            <div class="date">{{ interview.date }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="score-column">
      <div class="score-content">
        <div class="score-badge">
          <div class="score">{{ interview.score }}점</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interview-item {
  display: flex;
  width: 1116px;
  align-items: center;
  position: relative;
  border-bottom: 1px solid rgba(28, 28, 28, 0.05);
}

.title-column,
.type-column,
.date-column,
.score-column {
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
}

.title-column { flex: 3; }
.type-column { flex: 1; }
.date-column { flex: 1.2; }
.score-column { flex: 0.5; }

.interview-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.text-wrapper {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: rgba(28, 28, 28, 1);
}

.summary {
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.2);
}

.topic-content,
.calendar-content,
.score-content {
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid rgba(28, 28, 28, 0.05);
}

.calendar-icon-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.calendar-icon img {
  width: 16px;
  height: 16px;
}

.score-badge .score {
  font-size: 12px;
  color: #8a8cd9;
}
</style>
