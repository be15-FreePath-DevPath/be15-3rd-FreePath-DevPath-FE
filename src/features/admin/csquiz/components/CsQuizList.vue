<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PagingBar from '@/components/common/PagingBar.vue'
import { getAdminCsQuizList } from '@/features/admin/csquiz/api.js'

const router = useRouter()

const quizzes = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const pageSize = 10  // 퀴즈 기준으로 10개씩 보기

const fetchQuizList = async (page = 1) => {
  const params = {
    page: page,
    size: pageSize,
  };

  const response = await getAdminCsQuizList(params);
  const data = response.data.data;

  quizzes.value = data.csQuizList.map(q => ({
    id: q.csquizId,
    question: q.csquizContents,
    options: q.options.map(o => o.optionContents),
    explanation: q.csquizExplanation,
  }));

  totalItems.value = data.pagination.totalItems;
  totalPages.value = data.pagination.totalPage;
  currentPage.value = data.pagination.currentPage;
};


const handlePageChange = (page) => {
  currentPage.value = page
  fetchQuizList(page)
}

const goToDetail = (id) => {
  router.push(`/admin/csquiz/${id}`)
}

onMounted(() => {
  fetchQuizList(1)
})
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
        :key="currentPage"
        v-if="totalPages"
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
