<script setup>
import { computed } from 'vue'
const props = defineProps({
  questionSet: Array,
  index: Number
})

const question = computed(() => props.questionSet.find(m => m.startsWith('[면접 질문]')) || '')
const answer = computed(() => props.questionSet.find(m => !m.startsWith('[')))
const evaluationRaw = computed(() => props.questionSet.find(m => m.startsWith('[답변 평가]')) || '')

const feedback = computed(() => {
  const match = evaluationRaw.value.match(/총평[:：](.*?)(모범답안[:：]|$)/s)
  return match?.[1]?.trim() || ''
})

const modelAnswer = computed(() => {
  const match = evaluationRaw.value.match(/모범답안[:：](.*)/s)
  return match?.[1]?.trim() || ''
})

const evaluationScore = computed(() => {
  const match = evaluationRaw.value.match(/총점[:：] *#?(\d+)/)
  return match?.[1] ? `${match[1]}점` : ''
})

const evaluationDetails = computed(() => {
  const lines = evaluationRaw.value.split('\n')
  return lines
      .filter(line => /^-\s*(정확성|깊이|예시 사용|구조|명확성)[\s#:：]/.test(line))
      .map(line => {
        const match = line.match(/^-\s*(.*?)\s*[#:：]\s*#?(\d+)\s*-\s*(.*)/)
        if (!match) return null
        return {
          criterion: match[1].trim(),
          score: match[2].trim(),
          comment: match[3].trim()
        }
      })
      .filter(Boolean)
})
</script>

<template>
  <div class="question-card">
    <div class="question-section">
      <h4 class="question-title">【질문 {{ index + 1 }}】</h4>
      <p class="question-text" v-if="question">{{ question.replace('[면접 질문]', '').trim() }}</p>
    </div>

    <div class="print-out-text" v-if="answer">
      <strong class="info-text">답변</strong>
      <p class="answer-text">{{ answer }}</p>
    </div>

    <div class="print-out-text" v-if="evaluationDetails.length > 0">
      <strong class="info-text">평가</strong>
      <p class="answer-text"><b>총점</b>: {{ evaluationScore }}</p>
      <ul class="evaluation-list">
        <li v-for="(item, i) in evaluationDetails" :key="i">
          <b>{{ item.criterion }} ({{ item.score }}점)</b>: {{ item.comment }}
        </li>
      </ul>
    </div>

    <div class="print-out-text" v-if="feedback">
      <strong class="info-text">피드백</strong>
      <p class="answer-text" v-html="feedback.replace(/\n/g, '<br>')"></p>
    </div>

    <div class="print-out-text" v-if="modelAnswer">
      <strong class="info-text">모범답안</strong>
      <p class="answer-text" v-html="modelAnswer.replace(/\n/g, '<br>')"></p>
    </div>
  </div>
</template>

<style scoped>
.question-card {
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  padding-top: 32px;
  border-top: 1px solid #ddd;
}

.question-section {
  display: flex;
  flex-direction: column;
  gap: 10px
}
.question-title {
  font-size: 14px;
  color: #000;
  margin: 0;
}
.question-text{
  margin:0;
  font-weight: 800;
  font-size: 16px;
}

.question-text {
  font-size: 14px;
  color: #000;
  margin-bottom: 4px;
}

.print-out-text {
  background-color: #f7f9fb;
  border-radius: 16px;
  box-shadow: -4px 0px 4px #e3f5ff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evaluation-list {
  font-size: 14px;
  color: #000;
  line-height: 1.5;
  padding-left: 20px;
  list-style-type: disc;
}

ul,
li {
  margin: 0;
  font-size: 12px;
}


.info-text {
  font-size: 14px;
  color: #000;
}

.answer-text {
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-line;
  color: #000;
  margin: 0;
}
</style>
