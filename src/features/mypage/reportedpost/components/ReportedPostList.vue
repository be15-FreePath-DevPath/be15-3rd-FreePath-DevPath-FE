<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PagingBar from '@/components/common/PagingBar.vue'
import { getMyReportedPostList } from '@/features/mypage/reportedpost/api.js'
import calendarIcon from '@/assets/images/interview/calendar-blank.png'

const router = useRouter()
const posts = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const pageSize = 10

const fetchMyReportedPostList = async (page = 1) => {
  const params = { page, size: pageSize }
  const response = await getMyReportedPostList(params)
  const data = response.data.data
  console.log('응답 데이터', response.data.data)
  posts.value = data.myPosts
  totalItems.value = data.pagination.totalItems
  totalPages.value = data.pagination.totalPage
  currentPage.value = data.pagination.currentPage
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchMyReportedPostList(page)
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr.replace(' ', 'T'))
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const weekdayNames = ['일', '월', '화', '수', '목', '금', '토']
  const weekday = weekdayNames[date.getDay()]
  return `${month}.${day} ${weekday} ${hours}:${minutes}`
}

onMounted(() => {
  fetchMyReportedPostList(1)
})
</script>
<template>
  <div class="list-wrapper">
    <div class="list-header" v-if="posts.length > 0">
      <div class="col-title">게시글 제목</div>
      <div class="col-date">작성일자</div>
      <div class="col-writer">작성자</div>
    </div>

    <div v-if="posts.length === 0" class="empty-wrapper">
      <div class="empty-icon">📝</div>
      <div class="empty-text">신고된 게시글이 없습니다.</div>
    </div>

    <div class="post-list">
      <div
          class="post-item"
          v-for="post in posts"
          :key="post.boardId"
      >
        <div class="col-title">{{ post.boardTitle }}</div>
        <div class="col-date">
          <img class="date-icon" :src="calendarIcon" alt="calendar" />
          {{ formatDate(post.boardCreatedAt) }}
        </div>
        <div class="col-writer">{{ post.nickname }}</div>
      </div>
    </div>

    <PagingBar
        :key="currentPage"
        v-if="posts.length > 0"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalItems="totalItems"
        @page-changed="handlePageChange"
    />
  </div>
</template>
<style scoped>
.list-wrapper {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

/* 리스트 헤더 */
.list-header {
  display: flex;
  align-items: center;
  height: 40px;
  color: #9FA0A2;
  font-size: 12px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 0 20px;
}
.list-header .col-title {
  text-align: center;
}
/* 게시글 항목 */
.post-item {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s;
}



/* 게시글 제목 */
.col-title {
  width: 450px;
  padding-right: 20px;
  word-break: break-word;
  line-height: 1.5;
  font-size: 14px;
}

/* 작성일자 */
.col-date {
  width: 150px;
  text-align: center;
  white-space: nowrap;
  padding-right: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 캘린더 아이콘 */
.date-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 4px;
}

/* 작성자 */
.col-writer {
  width: 150px;
  text-align: center;
  white-space: nowrap;
  font-size: 14px;
}

/* 게시글 없음 안내 */
.empty-wrapper {
  text-align: center;
  color: #777;
  padding: 120px 0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.empty-text {
  font-size: 1.2rem;
}
</style>