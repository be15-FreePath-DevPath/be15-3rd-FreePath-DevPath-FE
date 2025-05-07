<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PagingBar from '@/components/common/PagingBar.vue'
import { getNewsList } from '@/features/admin/ItNews/api.js'

const router = useRouter()
const route = useRoute()

const itNews = ref([])
const currentPage = ref(1)
const pageSize = 10 //
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
})
const isLoading = ref(true)

const formatDate = (dateString, isSent) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
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
  mailing.setHours(0, 0, 0, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return mailing <= today ? 'Y' : 'N'
}

const fetchNews = async (page = 1) => {
  isLoading.value = true
  try {
    const { data: wrapper } = await getNewsList({ page, size: pageSize })
    const respData = wrapper?.data || {}
    itNews.value = (respData.newsList || []).sort((a, b) => a.itNewsId - b.itNewsId)

    // pagination 정보 수동 계산
    pagination.currentPage = respData.pagination?.currentPage || 1
    pagination.totalItems = respData.pagination?.totalItems || 0
    pagination.totalPages = Math.ceil(pagination.totalItems / pageSize)
    currentPage.value = page
  } catch (e) {
    console.error('뉴스 목록 로드 실패', e)
  } finally {
    isLoading.value = false
  }
}

const handlePageChange = (page) => {
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
      <tr
          v-for="news in itNews"
          :key="news.itNewsId"
          @click="goToDetail(news.itNewsId)"
          class="clickable-row"
      >
        <td class="text-align">{{ news.itNewsId }}</td>
        <td class="ellipsis-cell">{{ news.title }}</td>
        <td class="ellipsis-cell">{{ news.content }}</td>
        <td class="ellipsis-cell">
          <a :href="news.link" target="_blank">{{ news.link }}</a>
        </td>
        <td>
          {{ news.mailingDate ? formatDate(news.mailingDate, isSent(news.mailingDate) === 'Y') : '' }}
        </td>
        <td class="mailingDate">{{ isSent(news.mailingDate) }}</td>
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
.news-table th {
  text-align: center;
}
.text-align {
  text-align: center;
}

.news-table thead th {
  font-weight: 600;
  color: #aaaaaa;
}

.clickable-row:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.ellipsis-cell {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ellipsis-cell a {
  display: inline-block;
  max-width: 200px;
  color: blue;
  text-decoration: underline;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mailingDate {
  text-align: center;
}
</style>
