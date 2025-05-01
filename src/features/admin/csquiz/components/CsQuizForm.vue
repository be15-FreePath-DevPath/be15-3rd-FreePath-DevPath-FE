<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: Object,
  isReadOnly: Boolean
})
const emit = defineEmits(['update:modelValue'])

const localQuiz = ref({
  question: props.modelValue?.question || '',
  options: props.modelValue?.options || ['', '', '', ''],
  answer: props.modelValue?.answer || '',
  explanation: props.modelValue?.explanation || ''
})

watch(() => localQuiz.value, (val) => {
  emit('update:modelValue', val)
}, { deep: true })

const questionRef = ref(null)

function autoResize(el) {
  if (el) {
    el.style.height = '20px' // 기본 한 줄 높이
    if (el.scrollHeight > el.clientHeight) {
      el.style.height = `${el.scrollHeight}px`
    }
  }
}

onMounted(() => {
  nextTick(() => {
    autoResize(questionRef.value)
  })
})
</script>

<template>
  <div class="quiz-form">
    <div class="form-field">
      <label>질문</label>
      <textarea
          v-model="localQuiz.question"
          :readonly="isReadOnly"
          class="auto-textarea"
          rows="1"
          @input="e => autoResize(e.target)"
          ref="questionRef"
      />
    </div>

    <div class="options">
      <div class="form-field" v-for="(option, index) in localQuiz.options" :key="index">
        <label>선택지 {{ index + 1 }}</label>
        <textarea
            v-model="localQuiz.options[index]"
            :readonly="isReadOnly"
            class="auto-textarea"
            rows="1"
            @input="e => autoResize(e.target)"
        />
      </div>
    </div>

    <div class="form-field">
      <label>정답</label>
      <input
          v-model="localQuiz.answer"
          type="number"
          min="1"
          max="4"
          :readonly="isReadOnly"
      />
    </div>

    <div class="form-field">
      <label>해설</label>
      <textarea
          v-model="localQuiz.explanation"
          :readonly="isReadOnly"
          class="auto-textarea"
          rows="1"
          @input="e => autoResize(e.target)"
      />
    </div>
  </div>
</template>

<style scoped>
.quiz-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Pretendard', sans-serif;
  width: 1116px;
  margin: 0 auto;
  font-size: 18px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

label {
  font-weight: 500;
  font-size: 18px;
}

input,
textarea {
  background-color: #eeeeee;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 18px;
  width: 100%;
  line-height: 1;
}

.auto-textarea {
  resize: none;
  overflow: hidden;
  height: 20px;
}
</style>
