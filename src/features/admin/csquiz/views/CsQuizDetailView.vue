<script setup>
import {ref, computed, watch, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {cloneDeep, isEqual} from 'lodash'
import CsQuizForm from '@/features/admin/csquiz/components/CsQuizForm.vue'

const newBreadCrumbItems = ref(['관리자페이지', 'CS 퀴즈 목록' ,'CS 퀴즈 상세 조회']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
});

const router = useRouter()
const route = useRoute()
const quizId = route.params.csquizId

const originalQuiz = ref(null)
const currentQuiz = ref(null)
const isModified = ref(false)

// 더미 데이터 (API 연동 시 ID별 조회로 변경 예정)
const dummyQuizzes = [
  {
    id: '1',
    question: '객체지향 프로그래밍의 4대 특징 중 하나가 아닌 것은?',
    options: ['상속', '다형성', '캡슐화', '병렬성'],
    answer: '4',
    explanation: '객체지향의 4대 특징은 캡슐화, 상속, 추상화, 다형성입니다.'
  },
  {
    id: '2',
    question: 'JVM의 역할 중 올바르지 않은 것은?',
    options: ['메모리 관리', '클래스 로딩', '컴파일 수행', 'GC 관리'],
    answer: '3',
    explanation: 'JVM은 컴파일이 아닌 바이트코드 실행 역할을 담당합니다.'
  }
]

const target = dummyQuizzes.find(q => q.id === quizId)
originalQuiz.value = cloneDeep(target || dummyQuizzes[0])
currentQuiz.value = cloneDeep(originalQuiz.value)

watch(currentQuiz, (newVal) => {
  isModified.value = !isEqual(newVal, originalQuiz.value)
}, {deep: true})

const isValid = computed(() => {
  return (
      currentQuiz.value.question.trim() !== '' &&
      currentQuiz.value.explanation.trim() !== '' &&
      currentQuiz.value.answer !== '' &&
      currentQuiz.value.options.every(opt => opt.trim() !== '')
  )
})

const goToList = () => {
  router.push('/admin?tab=quiz')
}

const handleUpdate = () => {
  const payload = {
    csquizId: Number(quizId),
    csquizContents: currentQuiz.value.question,
    csquizAnswer: Number(currentQuiz.value.answer),
    csquizExplanation: currentQuiz.value.explanation,
    isCsquizSubmitted: 'N',
    options: currentQuiz.value.options.map((content, idx) => ({
      optionNo: idx + 1,
      optionContents: content
    }))
  }
  console.log('수정 전송 데이터:', payload)
  alert('수정된 내용을 저장합니다 (API 연동 예정)')
  originalQuiz.value = cloneDeep(currentQuiz.value)
  isModified.value = false
}
</script>

<template>
  <div class="detail-wrapper">
    <h1 class="page-title">CS 퀴즈 상세 조회</h1>
    <CsQuizForm v-model="currentQuiz" :isReadOnly="false"/>
    <div class="button-area">
      <button @click="goToList">CS 퀴즈 목록</button>
      <button :disabled="!isModified || !isValid" @click="handleUpdate">CS 퀴즈 수정</button>
    </div>
  </div>
</template>

<style scoped>
.detail-wrapper {
  width: 1116px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
}

.button-area {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.button-area button {
  width: 130px;
  height: 56px;
  background-color: #e9e9e9;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button-area button:disabled {
  background-color: #cccccc;
  color: #666;
  cursor: not-allowed;
}

.button-area button:hover:enabled {
  background-color: #1c1c1c;
  color: white;
}
</style>
