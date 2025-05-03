<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PagingBar from '@/components/common/PagingBar.vue'
import { getNewsList } from '@/features/admin/ItNews/api.js'

const router = useRouter()
const route = useRoute()

const itNews = ref([])
const currentPage = ref(1)
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
})
const isLoading = ref(true)

// 날짜 포맷 변환 함수
const formatDate = (dateString, isSent) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 0을 채워서 두 자리로 만듦
  const day = String(date.getDate()).padStart(2, '0') // 0을 채워서 두 자리로 만듦
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  if (isSent) {
    return `${year}년${month}월${day}일 ${hours}:${minutes}`
  } else {
    return `${year}년${month}월${day}일`
  }
}

const isSent = (mailingDate) => {
  if (!mailingDate) return 'N'

  const mailing = new Date(mailingDate)
  mailing.setHours(0, 0, 0, 0) // ← 추가: 시간 정보 제거

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return mailing <= today ? 'Y' : 'N'
}

const fetchNews = async (page = 1) => {
  isLoading.value = true
  try {
    const { data: wrapper } = await getNewsList({ page })
    const respData = wrapper?.data || {}
    itNews.value = (respData.newsList || []).sort((a, b) => a.itNewsId - b.itNewsId)
    Object.assign(pagination, respData.pagination ?? {})
    currentPage.value = page
  } catch (e) {
    console.error('뉴스 목록 로드 실패', e)
  } finally {
    isLoading.value = false
  }
}

function handlePageChange(page) {
  fetchNews(page)
}

const goToDetail = (id) => {
  router.push(`/admin/news/${id}`)
}

watch(
    () => route.query.reload,
    (reload) => {
      if (reload) fetchNews(currentPage.value)
    },
    { immediate: true }
)

onMounted(() => fetchNews())
</script>

<template>
  <div class="news-list-wrapper">
    <table class="news-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>제목</th>
        <th>내용</th>
        <th>링크</th>
        <th>날짜</th>
        <th>발송 여부</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="news in itNews" :key="news.itNewsId" @click="goToDetail(news.itNewsId)" class="clickable-row">
        <td>{{ news.itNewsId }}</td>
        <td>{{ news.title }}</td>
        <td>{{ news.content }}</td>
        <td><a :href="news.link" target="_blank">{{ news.link }}</a></td>
        <td>{{ news.mailingDate ? formatDate(news.mailingDate, isSent(news.mailingDate) === 'Y') : '' }}</td>
        <td>{{ isSent(news.mailingDate) }}</td>
      </tr>
      </tbody>
    </table>

    <PagingBar
        :currentPage="pagination.currentPage"
        :totalPages="pagination.totalPages"
        :totalItems="pagination.totalItems"
        @page-changed="handlePageChange"
    />
  </div>
</template>

<style scoped>
.news-list-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.header-bar {
  width: 100%;
  height: 44px;
  background: #f7f9fb;
  display: flex;
  border-radius: 8px;
  padding: 8px;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}
.header-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100px;
  max-width: 240px;
  min-width: 80px;
  height: 40px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(28, 28, 28, 0.2);
}
.header-title span {
  color: rgba(28, 28, 28, 0.4);
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 18px;
}
.news-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: 'Pretendard', sans-serif;
  margin-top: 20px;
}
.news-table th,
.news-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ccc;
}
.news-table thead th {
  background-color: #f1f1f1;
  font-weight: 600;
}
.clickable-row:hover {
  background-color: #f9f9f9;
}
th{
  color: #aaaaaa;
}
</style>
