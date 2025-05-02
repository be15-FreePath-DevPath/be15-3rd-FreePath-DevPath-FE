<template>
  <div class="quiz-card">
    <div class="question">{{ index + 1 }}. {{ quiz.question }}</div>

    <div v-if="selectedOption !== null" class="answer-text">
      답 : {{ selectedOption + 1 }}
    </div>

    <ul class="options">
      <li
          v-for="(option, optIdx) in quiz.options"
          :key="optIdx"
          class="option"
          :class="{ selected: selectedOption === optIdx }"
          @click="$emit('select', optIdx)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  quiz: Object,
  index: Number,
  selectedOption: Number
})
defineEmits(['select'])
</script>

<style scoped>
.quiz-card {
  background: #f7f9fb;
  border-radius: 20px;
  width: 1000px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.question {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 12px;
}

.answer-text {
  text-align: right;
  margin-bottom: 12px;
  font-weight: 600;
  color: #1c1c1c;
}

.options {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option {
  background: transparent;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.option.selected {
  background: rgba(223, 223, 223, 0.5);
  font-weight: 600;
}
</style>
