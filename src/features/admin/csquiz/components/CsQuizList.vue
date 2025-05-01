<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PagingBar from '@/components/common/PagingBar.vue'

const router = useRouter()

const quizzes = ref([
  {
    id: 1,
    question: '질문 1',
    options: ['선택지 1', '선택지 2', '선택지 3', '선택지 4'],
    explanation: '해설 1'
  },
  {
    id: 2,
    question: '질문 2',
    options: ['선택지 1', '선택지 2', '선택지 3', '선택지 4'],
    explanation: '해설 2'
  },
])

const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(2)

function handlePageChange(page) {
  currentPage.value = page
  // TODO: API 호출로 교체 예정
}

function goToDetail(id) {
  router.push(`/admin/csquiz/${id}`)
}
</script>

<template>
  <div class="quiz-list-wrapper">
    <table class="quiz-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>문제</th>
        <th>선택지 1</th>
        <th>선택지 2</th>
        <th>선택지 3</th>
        <th>선택지 4</th>
        <th>해설</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="quiz in quizzes" :key="quiz.id" @click="goToDetail(quiz.id)" class="clickable-row">
        <td>{{ quiz.id }}</td>
        <td>{{ quiz.question }}</td>
        <td>{{ quiz.options[0] ?? '' }}</td>
        <td>{{ quiz.options[1] ?? '' }}</td>
        <td>{{ quiz.options[2] ?? '' }}</td>
        <td>{{ quiz.options[3] ?? '' }}</td>
        <td>{{ quiz.explanation }}</td>
      </tr>
      </tbody>
    </table>

    <PagingBar
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalItems="totalItems"
        @page-changed="handlePageChange"
    />
  </div>
</template>

<style scoped>
.quiz-list-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.quiz-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: 'Pretendard', sans-serif;
  margin-bottom: 40px;
}

.quiz-table th,
.quiz-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ccc;
}

.quiz-table thead th {
  background-color: #f1f1f1;
  font-weight: 600;
}

.clickable-row {
  cursor: pointer;
}

.clickable-row:hover {
  background-color: #f9f9f9;
}
</style>
